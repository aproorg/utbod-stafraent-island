variable "common" {
  # Will be enforced by child module
  type = any
}

variable "desired_count" {
  type    = number
  default = 2
}

variable "region" {
  type    = string
  default = "eu-west-1"
}

variable "db_host" {
  type    = string
  default = "db.applications.internal"
}

variable "image_tag" {
  type = string
}

variable "environment" {
  type = any
  default = {}
}

variable "host" {
  type = string
}

