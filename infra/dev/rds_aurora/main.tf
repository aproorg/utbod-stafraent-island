locals {
  env        = "dev"
  aws_region = "eu-west-1"
  common_tags = tomap({
    "Owner"         = "DevOps",
    "Business Unit" = "IT",
    "Customer"      = "General",
    "terraform"     = "true",
    "state"         = "rds_aurora"
  })
}

terraform {
  backend "s3" {
    encrypt = true
    bucket  = "dev-utbod-stafraent-island-terraform-state"
    region  = "eu-west-1"
    key     = "rds_aurora/terraform.tfstate"
  }
}

terraform {
  required_version = ">= 0.15.5"
}

provider "aws" {
  region = local.aws_region
  default_tags {
    tags = local.common_tags
  }
}

data "terraform_remote_state" "networking" {
  backend = "s3"

  config = {
    region = local.aws_region
    bucket = "${local.env}-utbod-stafraent-island-terraform-state"
    key    = "networking/terraform.tfstate"
  }
}

data "terraform_remote_state" "ecs" {
  backend = "s3"

  config = {
    region = local.aws_region
    bucket = "${local.env}-utbod-stafraent-island-terraform-state"
    key    = "ecs/terraform.tfstate"
  }
}

data "terraform_remote_state" "bastion" {
  backend = "s3"

  config = {
    region = local.aws_region
    bucket = "${local.env}-utbod-stafraent-island-terraform-state"
    key    = "bastion/terraform.tfstate"
  }
}
