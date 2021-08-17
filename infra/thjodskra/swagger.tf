module "cdn" {
  source            = "cloudposse/cloudfront-s3-cdn/aws"
  version           = "0.74.0"
  namespace         = "thjodskra"
  stage             = "prod"
  name              = "swagger"
  aliases           = ["swagger.thjodskra.island.andes.cloud"]
  dns_alias_enabled = true
  parent_zone_name  = "island.andes.cloud"

  acm_certificate_arn = module.acm-us.certificate_arn

  depends_on = [module.acm-us]
}
