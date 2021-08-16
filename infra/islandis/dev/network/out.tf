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