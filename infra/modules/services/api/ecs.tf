data "aws_caller_identity" "current" {}

module "api" {
  source = "../../ecs-service"
  common = var.common

  desired_count          = var.desired_count
  service_name           = var.service_name
  service_container_port = 3333
  liveness               = "/api/liveness"
  ingress = [
    { host = var.host, path = "/*", priority = 3 },
  ]
  container_definitions = {
    account_id   = data.aws_caller_identity.current.account_id
    region       = var.region
    service_name = var.service_name
    containers = [
      {
        name      = "main"
        essential = true
        ports     = [3333]
        image     = "${var.repository_url}:${var.image_tag}"

        environment = merge({
          PORT    = "3333"
          DB_USER = "api"
          DB_NAME = "api"
          DB_HOST = var.db_host
        }, var.environment)
        secrets = var.secrets
      },
      {
        name       = "migration"
        entrypoint = ["npx"]
        command    = ["sequelize-cli", "db:migrate"]
        image      = "${var.repository_url}:${var.image_tag}"

        environment = merge({
          DB_USER = "api"
          DB_NAME = "api"
          DB_HOST = var.db_host
        }, var.environment)
        secrets = var.secrets
      }
    ]
  }
}
