module "lambda_function" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "~> 2.0"

  function_name = "thjodskra-api-lambda"
  description   = "Thjodskra API"
  handler       = "thjodskra::thjodskra.Function::FunctionHandler"
  runtime       = "dotnetcore3.1"

  timeout = 60

  publish = true

  create_package         = false
  local_existing_package = "../../apps/thjodskra/src/thjodskra/bin/Release/netcoreapp3.1/thjodskra.zip"

  environment_variables = {
    CitizenTable = aws_dynamodb_table.citizens.name,
  }

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service    = "apigateway"
      source_arn = "${module.api_gateway.apigatewayv2_api_execution_arn}/*/*"
    }
  }
}

resource "aws_iam_policy" "lambda_dynamo" {
  name        = "lambda_dynamo_read_access"
  path        = "/"
  description = "IAM policy for dynamodb from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:BatchGetItem",
        "dynamodb:Describe*",
        "dynamodb:List*",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:PartiQLSelect"
      ],
      "Resource": ["${aws_dynamodb_table.citizens.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_dynamo" {
  role       = module.lambda_function.lambda_role_name
  policy_arn = aws_iam_policy.lambda_dynamo.arn
}
