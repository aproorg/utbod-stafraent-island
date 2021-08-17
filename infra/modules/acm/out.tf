output "certificate_arn" {
  value = aws_acm_certificate_validation.validation.certificate_arn
}

output "domain_name" {
  value = aws_acm_certificate.certificate.domain_name
}
