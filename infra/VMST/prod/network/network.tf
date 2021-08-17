module "applications" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "v3.0.0"
  name    = "Applications-VMST-prod"
  cidr    = "10.50.0.0/22"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.50.0.0/24", "10.50.1.0/24", "10.50.2.0/24"]
  public_subnets  = ["10.50.3.64/26", "10.50.3.128/26", "10.50.3.192/26"]

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

module "data" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "v3.0.0"
  name    = "Data-VMST-prod"
  cidr    = "10.51.0.0/22"

  azs              = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  database_subnets = ["10.51.0.0/24", "10.51.1.0/24", "10.51.2.0/24"]

  enable_dns_hostnames = true
  enable_nat_gateway   = false
  enable_vpn_gateway   = false
  single_nat_gateway   = false

  private_subnet_tags = tomap({
    "data" = "true"
  })
  public_subnet_tags = tomap({
    "data" = "true"
  })
}

module "peering_data_applications" {
  source                     = "../../../modules/vpc_peering"
  vpc_requester_id           = module.applications.vpc_id
  vpc_accepter_id            = module.data.vpc_id
  vpc_requester_cidr         = module.applications.vpc_cidr_block
  vpc_accepter_cidr          = module.data.vpc_cidr_block
  vpc_requester_route_tables = module.applications.private_route_table_ids
  vpc_accepter_route_tables  = module.data.database_route_table_ids

  tags = tomap({
    "data"         = "true",
    "applications" = "true"
  })
}

resource "aws_route53_zone" "private" {
  name = "applications.prod.vmst.internal"

  vpc {
    vpc_id = module.applications.vpc_id
  }
}

