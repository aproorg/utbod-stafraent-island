module "applications" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "v3.0.0"
  name    = "Applications-islandis-prod"
  cidr    = "10.44.0.0/22"

  azs             = ["eu-west-2a", "eu-west-2b", "eu-west-2c"]
  private_subnets = ["10.44.0.0/24", "10.44.1.0/24", "10.44.2.0/24"]
  public_subnets  = ["10.44.3.64/26", "10.44.3.128/26", "10.44.3.192/26"]

  enable_dns_hostnames = true
  enable_nat_gateway   = true
  enable_vpn_gateway   = false
  single_nat_gateway   = true

  private_subnet_tags = tomap({
    "applications" = "true"
  })
  public_subnet_tags = tomap({
    "applications" = "true"
  })
}

