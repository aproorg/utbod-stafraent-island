resource "aws_s3_bucket" "lb_logs" {
  bucket = "${var.env}-utbod-stafraent-island-logs-alb"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  force_destroy = true
}
data "aws_caller_identity" "current" {}
data "aws_iam_policy_document" "lb_logs" {
  statement {
    principals {
      type        = "AWS"
      identifiers = [var.elb_root_account]
    }
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.lb_logs.arn}/*"]
  }

  statement {
    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.lb_logs.arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }
  }

  statement {
    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }
    actions   = ["s3:GetBucketAcl"]
    resources = [aws_s3_bucket.lb_logs.arn]
  }
}

resource "aws_s3_bucket_policy" "lb_logs" {
  bucket = aws_s3_bucket.lb_logs.id
  policy = data.aws_iam_policy_document.lb_logs.json
}

