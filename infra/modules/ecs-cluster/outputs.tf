output "id" {
  description = "ECS cluster id"
  value       = aws_ecs_cluster.cluster.id
}

output "name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.cluster.name
}

output "service_discovery_id" {
  description = "Service Discovery id"
  value       = aws_service_discovery_private_dns_namespace.services.id
}
