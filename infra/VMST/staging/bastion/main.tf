locals {
  env        = "staging"
  aws_region = "eu-west-1"
  common_tags = tomap({
    "Owner"         = "DevOps",
    "Business Unit" = "IT",
    "Customer"      = "General",
    "terraform"     = "true",
    "state"         = "bastion"
  })
}

terraform {
  backend "s3" {
    encrypt = true
    bucket  = "staging-utbod-stafraent-island-terraform-state"
    region  = "eu-west-1"
    key     = "bastion/terraform.tfstate"
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

module "bastion" {
  source = "../../../modules/bastion"

  db_domain = "db.${data.terraform_remote_state.networking.outputs.private_zone_name}"
  env       = local.env
  vpc_id    = data.terraform_remote_state.networking.outputs.applications_vpc_id
  subnet_id = data.terraform_remote_state.networking.outputs.applications_private_subnets[0]
}
