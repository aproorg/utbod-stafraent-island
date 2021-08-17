module "acm" {
  source = "../modules/acm"

  zone_id     = data.aws_route53_zone.island_andes_cloud.zone_id
  domain_name = local.api_domain_name
}

module "acm-us" {
  source = "../modules/acm"

  zone_id     = data.aws_route53_zone.island_andes_cloud.zone_id
  domain_name = local.api_domain_name

  providers = {
    aws = aws.us
  }
}
