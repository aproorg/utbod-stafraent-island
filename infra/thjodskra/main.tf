locals {
  env        = "dev"
  aws_region = "eu-west-1"
  common_tags = tomap({
    "Owner"         = "DevOps",
    "Business Unit" = "IT",
    "Customer"      = "General",
    "terraform"     = "true",
    "state"         = "thjodskra"
  })
  api_domain_name = "thjodskra.island.andes.cloud"
}

terraform {
  backend "s3" {
    encrypt = true
    bucket  = "dev-utbod-stafraent-island-terraform-state"
    region  = "eu-west-1"
    key     = "thjodskra/terraform.tfstate"
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

data "aws_route53_zone" "island_andes_cloud" {
  name = "island.andes.cloud"
}
