terraform {
  required_providers {
    aws = {
      source                = "hashicorp/aws"
      version               = ">= 3.37.0"
      configuration_aliases = [aws]
    }
  }
}

resource "aws_wafv2_web_acl" "acl" {
  name        = var.name
  description = "Waf acl for ${var.name}"
  scope       = var.global ? "CLOUDFRONT" : "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name     = "core-rules"
    priority = 2

    override_action {
      dynamic "count" {
        for_each = var.dryrun ? [1] : []
        content {}
      }
      dynamic "none" {
        for_each = var.dryrun ? [] : [1]
        content {}
      }
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
        dynamic "excluded_rule" {
          for_each = var.aws_manage_common_exclude_rule
          content {
            name = excluded_rule.value
          }
        }

      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "acl-core-rules-${var.name}"
      sampled_requests_enabled   = true
    }
  }

  tags = var.common_tags

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "acl-core-rules-${var.name}"
    sampled_requests_enabled   = true
  }

  rule {
    name     = "aws-rep-ip-restriction-${var.name}"
    priority = 0

    override_action {
      dynamic "count" {
        for_each = var.dryrun ? [1] : []
        content {}
      }
      dynamic "none" {
        for_each = var.dryrun ? [] : [1]
        content {}
      }
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "aws-rep-ip-restriction-${var.name}"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "aws-bad-inputs-${var.name}"
    priority = 3

    override_action {
      dynamic "count" {
        for_each = var.dryrun ? [1] : []
        content {}
      }
      dynamic "none" {
        for_each = var.dryrun ? [] : [1]
        content {}
      }
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "aws-bad-inputs-${var.name}"
      sampled_requests_enabled   = true
    }
  }

  dynamic "rule" {
    for_each = var.rate_limit > 0 ? [1] : []
    content {
      name     = "rate-${var.name}"
      priority = 4

      dynamic "action" {
        for_each = var.dryrun ? [1] : []
        content {
          count {}
        }
      }
      dynamic "action" {
        for_each = var.dryrun ? [] : [1]
        content {
          block {}
        }
      }

      statement {
        rate_based_statement {
          limit              = var.rate_limit
          aggregate_key_type = "IP"
        }
      }

      visibility_config {
        cloudwatch_metrics_enabled = true
        metric_name                = "rate-${var.name}"
        sampled_requests_enabled   = true
      }
    }
  }

  dynamic "rule" {
    for_each = length(var.block_paths) > 0 && length(var.allowCDRs) > 0 ? range(length(var.block_paths)) : []
    content {
      name     = "grant-path${replace(var.block_paths[rule.value], "/", "-")}-${var.name}"
      priority = 6 + rule.value

      action {
        allow {}
      }
      statement {
        and_statement {
          statement {
            byte_match_statement {
              text_transformation {
                priority = 0
                type     = "NONE"
              }
              search_string         = var.block_paths[rule.value]
              positional_constraint = "STARTS_WITH"

              field_to_match {
                uri_path {}
              }
            }
          }
          statement {
            ip_set_reference_statement {
              arn = aws_wafv2_ip_set.ip_path_block[0].arn
            }
          }
        }
      }

      visibility_config {
        cloudwatch_metrics_enabled = true
        metric_name                = "block-path-${replace(var.block_paths[rule.value], "/", "-")}-${var.name}"
        sampled_requests_enabled   = true
      }
    }
  }

  dynamic "rule" {
    for_each = length(var.block_paths) > 0 && length(var.allowCDRs) > 0 ? range(length(var.block_paths)) : []
    content {
      name     = "block-path${replace(var.block_paths[rule.value], "/", "-")}-${var.name}"
      priority = 6 + length(var.block_paths) + rule.value

      dynamic "action" {
        for_each = var.dryrun ? [1] : []
        content {
          count {}
        }
      }
      dynamic "action" {
        for_each = var.dryrun ? [] : [1]
        content {
          block {}
        }
      }
      statement {
        byte_match_statement {
          text_transformation {
            priority = 0
            type     = "NONE"
          }
          search_string         = var.block_paths[rule.value]
          positional_constraint = "STARTS_WITH"

          field_to_match {
            uri_path {}
          }
        }
      }

      visibility_config {
        cloudwatch_metrics_enabled = true
        metric_name                = "block-path-${replace(var.block_paths[rule.value], "/", "-")}-${var.name}"
        sampled_requests_enabled   = true
      }
    }
  }

  dynamic "rule" {
    for_each = var.bot_control ? [true] : []
    content {
      name     = "AWS-AWSManagedRulesBotControlRuleSet"
      priority = 7 + length(var.block_paths)

      dynamic "override_action" {
        for_each = var.dryrun ? [1] : []
        content {
          count {}
        }
      }
      dynamic "override_action" {
        for_each = var.dryrun ? [] : [1]
        content {
          none {}
        }
      }
      statement {
        managed_rule_group_statement {
          name        = "AWSManagedRulesBotControlRuleSet"
          vendor_name = "AWS"
          dynamic "excluded_rule" {
            for_each = var.bot_exclude_rule
            content {
              name = excluded_rule.value
            }
          }
        }
      }

      visibility_config {
        cloudwatch_metrics_enabled = true
        metric_name                = "AWS-AWSManagedRulesBotControlRuleSet"
        sampled_requests_enabled   = true
      }
    }
  }

}

resource "aws_wafv2_ip_set" "ip_path_block" {
  count              = length(var.block_paths) > 0 && length(var.allowCDRs) > 0 ? 1 : 0
  name               = "path-ip-filter-${var.name}"
  description        = "Ip filtering to block path parameter"
  scope              = var.global ? "CLOUDFRONT" : "REGIONAL"
  ip_address_version = "IPV4"
  addresses          = var.allowCDRs
  tags               = var.common_tags
}

resource "aws_wafv2_web_acl_logging_configuration" "log_destinations" {
  count                   = length(var.log_destinations) == 0 ? 0 : 1
  log_destination_configs = var.log_destinations
  resource_arn            = aws_wafv2_web_acl.acl.arn
}
