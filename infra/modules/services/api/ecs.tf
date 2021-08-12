data "aws_caller_identity" "current" {}

resource "aws_ecr_repository" "repository" {
  name                 = "api"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

module "api" {
  source = "../../ecs-service"
  common = var.common

  desired_count          = var.desired_count
  service_name           = "api"
  service_container_port = 3333
  liveness               = "/api"
  ingress = [
    { host = var.host, path = "/api/*", priority = 3 },
  ]
  container_definitions = {
    account_id   = data.aws_caller_identity.current.account_id
    region       = var.region
    service_name = "api"
    containers = [
      {
        name      = "main"
        essential = true
        ports     = [3333]
        image     = "${aws_ecr_repository.repository.repository_url}:${var.image_tag}"

        environment = merge(var.environment, {
          PORT    = "3333"
          DB_USER = "api"
          DB_NAME = "api"
          DB_HOST = var.db_host
        })
        secrets = {
          DB_PASS = "/ecs/api/DB_PASSWORD"
        }
      },
      {
        name       = "migration"
        entrypoint = ["npx"]
        command    = ["sequelize-cli", "db:migrate"]
        image      = "${aws_ecr_repository.repository.repository_url}:${var.image_tag}"

        environment = merge(var.environment, {
          DB_USER = "api"
          DB_NAME = "api"
          DB_HOST = var.db_host
        })
        secrets = {
          DB_PASS = "/ecs/api/DB_PASSWORD"
        }
      }
    ]
  }
}
