resource "aws_cloudwatch_log_group" "logs" {
  name = "thjodskra-logs"
}

module "api_gateway" {
  source = "terraform-aws-modules/apigateway-v2/aws"


  name          = "Thjodskra dotnet api"
  description   = "DotNet api for thjodskra"
  protocol_type = "HTTP"

  cors_configuration = {
    allow_headers = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods = ["*"]
    allow_origins = ["*"]
  }

  domain_name                 = "thjodskra.island.andes.cloud"
  domain_name_certificate_arn = module.acm.certificate_arn

  default_stage_access_log_destination_arn = aws_cloudwatch_log_group.logs.arn
  default_stage_access_log_format          = "$context.identity.sourceIp - - [$context.requestTime] \"$context.httpMethod $context.routeKey $context.protocol\" $context.status $context.responseLength $context.requestId $context.integrationErrorMessage"

  default_route_settings = {
    detailed_metrics_enabled = true
    throttling_burst_limit   = 100
    throttling_rate_limit    = 100
  }

  integrations = {
    "GET /citizen/{SSN}" = {
      lambda_arn             = module.lambda_function.lambda_function_arn
      payload_format_version = "2.0"
    }
  }

  tags = {
    Name = "dev-api-new"
  }
}



resource "aws_route53_record" "api" {
  zone_id = data.aws_route53_zone.island_andes_cloud.zone_id
  name    = local.api_domain_name
  type    = "A"

  alias {
    name                   = module.api_gateway.apigatewayv2_domain_name_configuration[0].target_domain_name
    zone_id                = module.api_gateway.apigatewayv2_domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}
