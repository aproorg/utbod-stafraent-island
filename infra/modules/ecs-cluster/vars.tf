variable "name" {
  type = string
}

variable "default_capacity_provider_strategy" {
  type = list(object({
    capacity_provider = string
    weight            = number
  }))
}

variable "vpc_id" {
  type = string
}

variable "env" {
  type = string
}
