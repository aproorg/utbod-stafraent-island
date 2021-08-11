module "financial_aid_postgres_schema" {
  source        = "../../modules/postgres-schema"
  database_name = "api"
  database_user = "api"
  secret_path   = "api"
}
