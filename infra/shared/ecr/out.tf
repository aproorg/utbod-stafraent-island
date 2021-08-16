output "vmst_repository_arn" {
  value = aws_ecr_repository.vmst.arn
}
output "vmst_repository_url" {
  value = aws_ecr_repository.vmst.repository_url
}

output "thjodskra_repository_arn" {
  value = aws_ecr_repository.thjodskra.arn
}

output "thjodskra_repository_url" {
  value = aws_ecr_repository.thjodskra.repository_url
}

output "island_is_repository_arn" {
  value = aws_ecr_repository.island_is.arn
}

output "island_is_repository_url" {
  value = aws_ecr_repository.island_is.repository_url
}