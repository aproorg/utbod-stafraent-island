locals {
  env        = "prod"
  aws_region = "eu-west-1"
  common_tags = tomap({
    "Owner"         = "DevOps",
    "Business Unit" = "IT",
    "Customer"      = "General",
    "terraform"     = "true",
    "state"         = "postgres-schemas"
  })
}

terraform {
  backend "s3" {
    encrypt = true
    bucket  = "prod-utbod-stafraent-island-terraform-state"
    region  = "eu-west-1"
    key     = "postgres-schemas/terraform.tfstate"
  }
}

terraform {
  required_providers {
    postgresql = {
      source  = "cyrilgdn/postgresql"
      version = "1.13.0"
    }
  }
  required_version = ">= 0.15.5"
}

provider "aws" {
  region = local.aws_region
  default_tags {
    tags = local.common_tags
  }
}

data "terraform_remote_state" "rds_aurora" {
  backend = "s3"

  config = {
    region = local.aws_region
    bucket = "${local.env}-utbod-stafraent-island-terraform-state"
    key    = "rds_aurora/terraform.tfstate"
  }
}

data "aws_ssm_parameter" "master_password" {
  name = data.terraform_remote_state.rds_aurora.outputs.master_password_ssm_parameter_name
}

provider "postgresql" {
  username  = "root"
  host      = "localhost"
  database  = "postgres"
  port      = 5432
  superuser = false
  password  = data.aws_ssm_parameter.master_password.value
}
