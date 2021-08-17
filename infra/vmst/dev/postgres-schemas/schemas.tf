module "financial_aid_postgres_schema" {
  source        = "../../../modules/postgres-schema"
  database_name = "vmst"
  database_user = "vmst"
  secret_path   = "vmst-dev"
}
