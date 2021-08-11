resource "postgresql_database" "db" {
  name  = var.database_name
  owner = postgresql_role.owner.name
}

resource "random_password" "db_password" {
  length  = 16
  special = false
}

resource "postgresql_role" "owner" {
  name     = var.database_user
  login    = true
  password = random_password.db_password.result
  lifecycle {
    ignore_changes = [password]
  }
}

resource "aws_ssm_parameter" "db_password" {
  name  = "/ecs/${var.secret_path}/DB_PASSWORD"
  type  = "SecureString"
  value = random_password.db_password.result
  lifecycle {
    ignore_changes = [value]
  }
}
