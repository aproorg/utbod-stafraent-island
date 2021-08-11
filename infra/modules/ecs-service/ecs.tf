data "aws_ecs_task_definition" "remote_task_definition" {
  task_definition = var.service_name
  depends_on      = [aws_ecs_task_definition.task_definition]
}

resource "aws_ecs_task_definition" "task_definition" {
  family                = var.service_name
  container_definitions = templatefile("${path.module}/templates/task-definition.json.tpl", var.container_definitions)

  execution_role_arn = aws_iam_role.ecs_tasks_execution_role.arn

  cpu                      = var.cpu
  memory                   = var.memory
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  task_role_arn            = join("", aws_iam_role.task_role.*.arn)

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group" "security-group" {
  name        = "ecs-${var.service_name}-sg"
  description = "Security group for the ${aws_ecs_task_definition.task_definition.family} service"
  vpc_id      = var.common.vpc_id

  ingress {
    description = "Allow port ${var.service_container_port}"
    from_port   = var.service_container_port
    to_port     = var.service_container_port
    protocol    = "tcp"
    security_groups = (
      length(var.ingress) > 0 ?
      [var.common.alb_security_group, var.common.shared_security_group] :
      [var.common.shared_security_group]
    )
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_alb_target_group" "target_group" {
  count                = length(var.ingress) > 0 ? 1 : 0
  name                 = "ecs-${var.service_name}-tg"
  port                 = var.service_container_port
  protocol             = "HTTP"
  vpc_id               = var.common.vpc_id
  target_type          = "ip"
  deregistration_delay = 60

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = "/"
    unhealthy_threshold = "2"
  }
}

resource "aws_lb_listener_rule" "listener_rule" {
  for_each     = { for i in var.ingress : "${i.host}${i.path}" => i }
  listener_arn = var.common.alb_listener
  priority     = each.value.priority

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.target_group[0].arn
  }

  condition {
    host_header {
      values = [each.value.host]
    }
  }
  condition {
    path_pattern {
      values = [each.value.path]
    }
  }
}

resource "aws_service_discovery_service" "service" {
  name = var.service_name

  dns_config {
    namespace_id = var.common.service_discovery_id

    dns_records {
      ttl  = 10
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 1
  }
}

resource "aws_ecs_service" "service" {
  name          = aws_ecs_task_definition.task_definition.family
  cluster       = var.common.cluster_id
  desired_count = var.desired_count

  task_definition = "${aws_ecs_task_definition.task_definition.family}:${max(
    aws_ecs_task_definition.task_definition.revision,
    data.aws_ecs_task_definition.remote_task_definition.revision,
  )}"

  enable_execute_command = true

  network_configuration {
    subnets         = var.common.subnets
    security_groups = concat(aws_security_group.security-group[*].id, [var.common.shared_security_group])
  }

  capacity_provider_strategy {
    capacity_provider = "FARGATE"
    weight            = 100
  }

  service_registries {
    registry_arn = aws_service_discovery_service.service.arn
  }

  dynamic "load_balancer" {
    for_each = aws_alb_target_group.target_group
    iterator = each
    content {
      target_group_arn = each.value["arn"]
      container_name   = var.service_container_name
      container_port   = var.service_container_port
    }
  }

  lifecycle {
    ignore_changes = [desired_count]
  }
}
