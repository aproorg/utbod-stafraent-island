variable "name" {
  type        = string
  description = "The name associated with all of the rds resources"
}

variable "vpc_id" {
  type        = string
  description = "ID of the destination VPC"
}

variable "subnets" {
  type        = list(string)
  description = "List of subnets ID's"
}

variable "allowed_security_groups" {
  type        = list(string)
  description = "List of security groups that are allowed to connect"
}

variable "skip_final_snapshot" {
  default = true
  type    = bool
}

variable "instance_type" {
  type    = string
  default = "db.t3.medium"
}

variable "zone_name" {
  type = string
}
