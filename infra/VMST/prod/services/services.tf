locals {
  image_tag = "latest"
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
  common       = local.common_private
  service_name = "vmst-${local.env}"

  desired_count  = 1
  host           = data.aws_route53_zone.island_andes_cloud.name
  image_tag      = local.image_tag
  env            = local.env
  repository_url = data.terraform_remote_state.ecr.outputs.vmst_repository_url
  db_host        = "db.${data.terraform_remote_state.networking.outputs.private_zone_name}"
  environment = {
    DB_USER = "vmst"
    DB_NAME = "vmst"
    DB_HOST = "db.${data.terraform_remote_state.networking.outputs.private_zone_name}"
  }
  secrets = {
          DB_PASS = "/ecs/vmst-${local.env}/DB_PASSWORD"
        }
}
