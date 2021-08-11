variable "vpc_requester_id" {
  description = "VPC id of the VPC requesting peering connection"
  type        = string
}

variable "vpc_accepter_id" {
  description = "VPC id of the VPC accepting peering connection"
  type        = string
}

variable "vpc_requester_cidr" {
  description = "CIDR block of the requesting VPC"
  type        = string
}

variable "vpc_accepter_cidr" {
  description = "CIDR block of the accepting VPC"
  type        = string
}

variable "vpc_requester_route_tables" {
  description = "The route tables to be modified on the requester VPC"
  type        = list(any)
}

variable "vpc_accepter_route_tables" {
  description = "The route tables to be modified on the accepter VPC"
  type        = list(any)
}

variable "tags" {
  description = "Tags to be applied to the peering connection"
  type        = map(any)
}
