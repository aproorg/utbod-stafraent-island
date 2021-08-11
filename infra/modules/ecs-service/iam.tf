data "aws_iam_policy_document" "allow_get_secrets_document" {
  statement {
    sid    = "getSecrets"
    effect = "Allow"

    actions = [
      "ssm:GetParameter",
      "ssm:GetParameters",
    ]

    resources = [
      "arn:aws:ssm:*:${data.aws_caller_identity.current.account_id}:parameter/ecs/${coalesce(var.ssm_namespace, replace(var.service_name, "-", "/"))}/*",
    ]
  }
}

resource "aws_iam_policy" "allow_get_secrets" {
  name        = "${var.service_name}-allow-secrets"
  description = "Allows ${var.service_name} to get secrets"

  policy = data.aws_iam_policy_document.allow_get_secrets_document.json
}

resource "aws_iam_role_policy_attachment" "attach_get_secrets" {
  role       = aws_iam_role.ecs_tasks_execution_role.name
  policy_arn = aws_iam_policy.allow_get_secrets.arn
}

data "aws_iam_policy_document" "ecs_tasks_execution_role_document" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_tasks_execution_role" {
  name               = "ecs-task-execution-role-${var.service_name}"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_execution_role_document.json
}

resource "aws_iam_role_policy_attachment" "ecs_tasks_execution_role" {
  role       = aws_iam_role.ecs_tasks_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "allow_ssm_messages" {
  statement {
    sid    = "allowSSM"
    effect = "Allow"

    actions = [
      "ssmmessages:CreateControlChannel",
      "ssmmessages:CreateDataChannel",
      "ssmmessages:OpenControlChannel",
      "ssmmessages:OpenDataChannel",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_policy" "allow_ssm_messages" {
  name        = "${var.service_name}-allow-ssmmessages"
  description = "Allows ${var.service_name} open ssm channels"

  policy = data.aws_iam_policy_document.allow_ssm_messages.json
}

resource "aws_iam_role" "task_role" {
  name               = "${var.service_name}-task-role"
  description        = "Task role for ${var.service_name}"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_execution_role_document.json
}

resource "aws_iam_role_policy_attachment" "attach_ssm" {
  role       = aws_iam_role.task_role.name
  policy_arn = aws_iam_policy.allow_ssm_messages.arn
}
