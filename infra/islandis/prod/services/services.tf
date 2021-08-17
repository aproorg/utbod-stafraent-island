locals {
  image_tag = "9a4e9152a60a3f16abd0072e70a711d257842b71"
  common_private = {
    vpc_id                = local.vpc_id
    shared_security_group = data.terraform_remote_state.ecs.outputs.applications_shared_security_group
    alb_security_group    = data.terraform_remote_state.ecs.outputs.applications_alb_security_group
    cluster_id            = data.terraform_remote_state.ecs.outputs.cluster_id
    alb_listener          = data.terraform_remote_state.ecs.outputs.alb_https_listener
    subnets               = data.terraform_remote_state.networking.outputs.applications_private_subnets
    service_discovery_id  = data.terraform_remote_state.ecs.outputs.service_discovery_id
  }
}


module "api" {
  source       = "../../../modules/services/api"
  region       = local.aws_region
  common       = local.common_private
  service_name = "islandis-${local.env}"
  environment = {
    VMST_API_BASE = "https://vmst.island.andes.cloud"
  }
  desired_count  = 1
  host           = "${local.env}.islandis.${data.aws_route53_zone.island_andes_cloud.name}"
  image_tag      = local.image_tag
  env            = local.env
  repository_url = data.terraform_remote_state.ecr.outputs.island_is_repository_url
}
