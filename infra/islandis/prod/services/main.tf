locals {
  env        = "prod"
  aws_region = "eu-west-2"
  common_tags = tomap({
    "Owner"         = "DevOps",
    "Business Unit" = "IT",
    "Customer"      = "General",
    "terraform"     = "true",
    "state"         = "services"
  })
  ecr_repositories = ["vmst"]
  vpc_id           = data.terraform_remote_state.networking.outputs.applications_vpc_id
}

terraform {
  backend "s3" {
    encrypt = true
    bucket  = "prod-utbod-stafraent-island-terraform-state"
    region  = "eu-west-1"
    key     = "islandis/services/terraform.tfstate"
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


data "terraform_remote_state" "ecs" {
  backend = "s3"

  config = {
    region = "eu-west-1"
    bucket = "${local.env}-utbod-stafraent-island-terraform-state"
    key    = "islandis/ecs/terraform.tfstate"
  }
}

data "terraform_remote_state" "networking" {
  backend = "s3"

  config = {
    region = "eu-west-1"
    bucket = "${local.env}-utbod-stafraent-island-terraform-state"
    key    = "islandis/networking/terraform.tfstate"
  }
}

data "terraform_remote_state" "ecr" {
  backend = "s3"

  config = {
    region = "eu-west-1"
    bucket = "shared-utbod-stafraent-island-terraform-state"
    key    = "ecr/terraform.tfstate"
  }
}


data "aws_route53_zone" "island_andes_cloud" {
  name = "island.andes.cloud"
}
