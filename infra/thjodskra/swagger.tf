module "cloudfront_s3_website_with_domain" {
  source      = "chgangaraju/cloudfront-s3-website/aws"
  version     = "1.2.2"
  hosted_zone = "island.andes.cloud"
  domain_name = "swagger.thjodskra.island.andes.cloud"
  # acm_certificate_domain = "thjodskra.island.andes.cloud"
  acm_certificate_domain = module.acm-us.domain_name
}
