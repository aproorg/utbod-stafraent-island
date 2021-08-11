variable "database_name" {
  type        = string
  description = "The name of the database"
}

variable "database_user" {
  type        = string
  description = "The name of the user who will be owner of the DB"
}

variable "secret_path" {
  type        = string
  description = "The (partial) path to the SSM parameter store secret with the DB password"
}
