variable "service_name" {
  type        = string
  description = "Name of the service. Container definitions should be in ecs-services folder."
}

variable "desired_count" {
  type        = number
  description = "Desired count of service"
  default     = 2
}

variable "service_container_name" {
  type        = string
  description = "Name of the main service container"
  default     = "main"
}

variable "service_container_port" {
  type        = number
  description = "Port this service listens on"
  default     = null
}

variable "ingress" {
  type = list(object({
    host     = string
    path     = string
    priority = number
  }))
  description = "A list of ingress rules"
  default     = []
}

variable "container_definitions" {
  type = object({
    account_id   = string
    region       = string
    service_name = string
    containers = list(object({
      name        = string
      secrets     = optional(any)
      environment = optional(any)
      entrypoint  = optional(list(string))
      essential   = optional(bool)
      command     = optional(list(string))
      ports       = optional(list(number))
      image       = string
      dependsOn = optional(list(object({
        name      = string
        condition = string
      })))
    }))
  })
}

variable "common" {
  type = object({
    vpc_id                = string
    shared_security_group = string
    alb_security_group    = string
    alb_listener          = string
    cluster_id            = string
    subnets               = list(string)
    service_discovery_id  = string
  })
}

variable "cpu" {
  type    = number
  default = 256
}

variable "memory" {
  type    = number
  default = 512
}

variable "ssm_namespace" {
  type        = string
  default     = ""
  description = "The allowed namespace from ecs - /ecs/ssm_namespace/* - the default is service name"
}
