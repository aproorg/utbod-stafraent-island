locals {
  env        = "shared"
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
    bucket  = "shared-utbod-stafraent-island-terraform-state"
    region  = "eu-west-1"
    key     = "ecr/terraform.tfstate"
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
