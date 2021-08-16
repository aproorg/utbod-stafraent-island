module "applications" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "v3.0.0"
  name    = "Applications-islandis"
  cidr    = "10.42.0.0/22"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.42.0.0/24", "10.42.1.0/24", "10.42.2.0/24"]
  public_subnets  = ["10.42.3.64/26", "10.42.3.128/26", "10.42.3.192/26"]

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

