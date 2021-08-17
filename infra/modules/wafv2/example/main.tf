data "aws_caller_identity" "current" {}
locals {
  env        = "dev"
  aws_region = "eu-west-1"
  account_id = data.aws_caller_identity.current.account_id
  common_tags = tomap({
    "Owner"         = "DevOps",
    "Business Unit" = "IT",
    "Customer"      = "General",
    "terraform"     = "true",
    "state"         = "xroad"
  })
}

terraform {
  backend "local" {
  }
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.42.0"
    }
  }
  required_version = ">= 0.15"
}

provider "aws" {
  region = "eu-west-1"
}

provider "aws" {
  alias  = "us"
  region = "us-east-1"
}

module "wafv2" {
  source                         = "../"
  name                           = "someweb"
  common_tags                    = local.common_tags
  block_paths                    = ["/admin"]
  allowCDRs                      = ["213.181.112.179/32"]
  rate_limit                     = 0
  global                         = true
  dryrun                         = false
  log_destinations               = []
  bot_control                    = true
  bot_exclude_rule               = ["SignalNonBrowserUserAgent", "CategoryHttpLibrary"]
  aws_manage_common_exclude_rule = ["SizeRestrictions_BODY"]
  providers = {
    aws = aws.us
  }
}
