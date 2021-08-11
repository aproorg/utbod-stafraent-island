resource "aws_cloudwatch_log_group" "log_group" {
  for_each = toset([for c in var.container_definitions.containers : c.name])
  name     = "/ecs/${var.service_name}/${each.key}"
}
