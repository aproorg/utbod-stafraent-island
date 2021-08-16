module "postgres_schema" {
  source        = "../../../modules/postgres-schema"
  database_name = "api"
  database_user = "api"
  secret_path   = "vmst-staging"
}
