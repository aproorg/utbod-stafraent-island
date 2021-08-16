output "alb_https_listener" {
  description = "ALB https listener"
  value       = aws_alb_listener.https.arn
}

output "applications_alb_security_group" {
  description = "ALB security group"
  value       = aws_security_group.alb.id
}

output "applications_alb_arb" {
  description = "ALB ARN"
  value       = aws_lb.alb.arn
}