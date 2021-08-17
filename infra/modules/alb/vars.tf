variable "env" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "zone_id" {
  description = "The id of the route53 zone"
  type        = string
}

variable "zone_name" {
  description = "The name of the route53 zone"
  type        = string
}

variable "subnets" {
  description = "The list of subnets that the alb should direct traffic to"
  type        = list(string)
}

variable "elb_root_account" {
  type    = string
  default = "arn:aws:iam::156460612806:root"
}
