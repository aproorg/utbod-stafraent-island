module "ecs_cluster" {
  source = "../../../modules/ecs-cluster"

  name   = "island-${local.env}"
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

resource "aws_security_group" "shared" {
  name        = "services-shared-sg-vmst-${local.env}"
  description = "Shared security group for all services"
  vpc_id      = local.vpc_id
}

