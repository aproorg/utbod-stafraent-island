module "db" {
  source  = "terraform-aws-modules/rds-aurora/aws"
  version = "~> 5.2.0"

  name              = var.name
  engine            = "aurora-postgresql"
  engine_version    = "12.4"
  storage_encrypted = true

  vpc_id  = var.vpc_id
  subnets = var.subnets

  replica_count = 1

  allowed_security_groups = var.allowed_security_groups

  monitoring_interval = 60

  apply_immediately            = true
  skip_final_snapshot          = var.skip_final_snapshot
  copy_tags_to_snapshot        = true
  performance_insights_enabled = true
  instance_type                = var.instance_type
  preferred_maintenance_window = "mon:05:00-mon:06:00"

  db_parameter_group_name         = aws_db_parameter_group.db_param_group.id
  db_cluster_parameter_group_name = aws_rds_cluster_parameter_group.cluster_param_group.id

  enabled_cloudwatch_logs_exports = ["postgresql"]
}

resource "aws_db_parameter_group" "db_param_group" {
  name        = "${var.name}-aurora-db-postgres-parameter-group"
  family      = "aurora-postgresql12"
  description = "${var.name}-aurora-db-postgres-parameter-group"
}

resource "aws_rds_cluster_parameter_group" "cluster_param_group" {
  name        = "${var.name}-aurora-postgres-cluster-parameter-group"
  family      = "aurora-postgresql12"
  description = "${var.name}-aurora-postgres-cluster-parameter-group"
}

resource "aws_ssm_parameter" "master_password" {
  name        = "/rds/${var.name}/masterpassword"
  description = "RDS master password"
  type        = "SecureString"
  value       = module.db.rds_cluster_master_password
}

data "aws_route53_zone" "internal" {
  name         = "applications.internal"
  private_zone = true
}

resource "aws_route53_record" "alias_route53_record" {
  zone_id = data.aws_route53_zone.internal.zone_id
  name    = "db.applications.internal"
  type    = "CNAME"
  ttl     = "30"

  records = [module.db.rds_cluster_endpoint]
}
