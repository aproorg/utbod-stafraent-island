module "rds_aurora" {
  source    = "../../../modules/rds_aurora"
  name      = "island-${local.env}"
  zone_name = data.terraform_remote_state.networking.outputs.private_zone_name

  subnets = data.terraform_remote_state.networking.outputs.database_subnets
  vpc_id  = data.terraform_remote_state.networking.outputs.data_vpc_id

  allowed_security_groups = [
    data.terraform_remote_state.ecs.outputs.applications_shared_security_group,
    data.terraform_remote_state.bastion.outputs.security_group_id,
  ]
}
