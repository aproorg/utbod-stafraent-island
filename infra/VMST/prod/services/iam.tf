# data "aws_caller_identity" "current" {}

# resource "aws_iam_user" "deployer" {
#   name = "deployer-${local.env}"
#   path = "/system/"
# }

# resource "aws_iam_access_key" "deployer" {
#   user = aws_iam_user.deployer.name
# }

# data "aws_iam_policy_document" "deployer" {
#   statement {
#     actions = ["ecs:UpdateService", "ecs:DescribeServices"]
#     resources = [
#       "arn:aws:ecs:${local.aws_region}:${data.aws_caller_identity.current.account_id}:service/${data.terraform_remote_state.ecs.outputs.cluster_name}/*"
#     ]
#   }

#   statement {
#     actions = [
#       "ecr:BatchGetImage",
#       "ecr:BatchCheckLayerAvailability",
#       "ecr:CompleteLayerUpload",
#       "ecr:GetDownloadUrlForLayer",
#       "ecr:InitiateLayerUpload",
#       "ecr:PutImage",
#       "ecr:UploadLayerPart",
#     ]
#     resources = [module.api.repository_arn]
#   }

#   statement {
#     actions   = ["ecr:GetAuthorizationToken"]
#     resources = ["*"]
#   }
# }

# resource "aws_iam_policy" "deploy" {
#   name        = "deploy-ecs-policy-${local.env}"
#   description = "Allow deploying ecs services"
#   policy      = data.aws_iam_policy_document.deployer.json
# }

# resource "aws_iam_user_policy_attachment" "deploy" {
#   user       = aws_iam_user.deployer.name
#   policy_arn = aws_iam_policy.deploy.arn
# }
