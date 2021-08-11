output "cluster_id" {
  description = "ECS cluster id"
  value       = module.ecs_cluster.id
}

output "alb_https_listener" {
  description = "ALB https listener"
  value       = module.alb.alb_https_listener
}

output "applications_alb_security_group" {
  description = "ALB security group"
  value       = module.alb.applications_alb_security_group
}

output "applications_shared_security_group" {
  description = "Shared security group for all services"
  value       = aws_security_group.shared.id
}
