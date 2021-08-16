data "aws_caller_identity" "current" {}

resource "aws_iam_user" "deployer" {
  name = "deployer"
  path = "/system/"
}

resource "aws_iam_access_key" "deployer" {
  user = aws_iam_user.deployer.name
}

data "aws_iam_policy_document" "deployer" {
  statement {
    actions = ["ecs:UpdateService", "ecs:DescribeServices"]
    resources = [
      "*"
    ]
  }

  statement {
    actions = [
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:CompleteLayerUpload",
      "ecr:GetDownloadUrlForLayer",
      "ecr:InitiateLayerUpload",
      "ecr:PutImage",
      "ecr:UploadLayerPart",
    ]
    resources = ["*"]
  }

  statement {
    actions   = ["ecr:GetAuthorizationToken"]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "deploy" {
  name        = "deploy-ecs-policy"
  description = "Allow deploying ecs services"
  policy      = data.aws_iam_policy_document.deployer.json
}

resource "aws_iam_user_policy_attachment" "deploy" {
  user       = aws_iam_user.deployer.name
  policy_arn = aws_iam_policy.deploy.arn
}
