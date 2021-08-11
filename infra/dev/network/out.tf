output "applications_vpc_id" {
  description = "Applications vpc id"
  value       = module.applications.vpc_id
}

output "applications_private_subnets" {
  description = "Applications private subnets"
  value       = module.applications.private_subnets
}

output "applications_public_subnets" {
  description = "Applications public subnets"
  value       = module.applications.public_subnets
}

output "database_subnets" {
  description = "Database subnets of data VPC"
  value       = module.data.database_subnets
}

output "data_vpc_id" {
  description = "Data VPC id"
  value       = module.data.vpc_id
}

output "service_discovery_id" {
  description = "Service Discovery id"
  value       = aws_service_discovery_private_dns_namespace.services.id
}
