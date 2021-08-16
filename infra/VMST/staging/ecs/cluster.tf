module "ecs_cluster" {
  source = "../../../modules/ecs-cluster"

  name   = "island-vmst-${local.env}"
  env    = local.env
  vpc_id = data.terraform_remote_state.networking.outputs.applications_vpc_id

  default_capacity_provider_strategy = [
    {
      capacity_provider = "FARGATE"
      weight            = 100
    }
  ]
}

module "alb" {
  source = "../../../modules/alb"

  vpc_id    = local.vpc_id
  zone_id   = data.aws_route53_zone.island_andes_cloud.zone_id
  zone_name = "${local.env}.vmst.${data.aws_route53_zone.island_andes_cloud.name}"

  subnets = data.terraform_remote_state.networking.outputs.applications_public_subnets

  env = local.env
}

module "wafv2" {
  source = "git@github.com:andesorg/terraform-modules.git//wafv2?ref=v0.1.1"

  name                           = "VMST-${local.env}"
  global                         = false
  dryrun                         = false
  log_destinations               = []
  bot_exclude_rule               = []
  aws_manage_common_exclude_rule = []

  providers = {
    aws = aws
  }
}

resource "aws_wafv2_web_acl_association" "waf_alb" {
  resource_arn = module.alb.applications_alb_arb
  web_acl_arn  = module.wafv2.web_acl_arn
}

resource "aws_security_group" "shared" {
  name        = "services-shared-sg-vmst-${local.env}"
  description = "Shared security group for all services"
  vpc_id      = local.vpc_id
}

