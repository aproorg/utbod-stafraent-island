output "id" {
  description = "ECS cluster id"
  value       = aws_ecs_cluster.cluster.id
}

output "name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.cluster.name
}

