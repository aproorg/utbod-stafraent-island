output "instance_id" {
  value = aws_instance.bastion.id
}

output "security_group_id" {
  value = aws_security_group.bastion.id
}
