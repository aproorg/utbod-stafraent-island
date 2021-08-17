variable "name" {
  type        = string
  description = "Name to add to resources created"
}

variable "common_tags" {
  type        = map(string)
  description = "Tags for all resources"
  default     = {}
}

variable "rate_limit" {
  type        = number
  description = "Set global rate limit number"
  default     = 0
}

variable "block_paths" {
  type        = list(string)
  description = "List of paths to block"
  default     = []
}

variable "allowCDRs" {
  type        = list(string)
  description = "List of ips to block access to blocked paths"
  default     = []
}

variable "dryrun" {
  type        = bool
  description = "Use count instead of block"
}

variable "global" {
  type        = bool
  description = "If this should be global waf"
}

variable "log_destinations" {
  type        = list(string)
  description = "Arn of firehose to send logs"
}

variable "bot_exclude_rule" {
  type        = list(string)
  description = "Excluding rules in bot protection"
  default     = []
}

variable "aws_manage_common_exclude_rule" {
  type        = list(string)
  description = "Excluding rules in bot protection"
  default     = []
}

variable "bot_control" {
  type        = bool
  description = "Set true to enable bot control"
  default     = true
}
