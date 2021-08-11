data "aws_caller_identity" "current" {}

terraform {
  experiments = [module_variable_optional_attrs]
}
