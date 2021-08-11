variable "domain_name" {
  type        = string
  description = "Domain name to create certificate for"
}

variable "zone_id" {
  type        = string
  description = "Zone ID responsible for the domain"
}
