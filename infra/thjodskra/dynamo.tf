resource "aws_dynamodb_table" "citizens" {
  name         = "Citizens"
  billing_mode = "PAY_PER_REQUEST"
  # read_capacity  = 20
  # write_capacity = 20
  hash_key = "SSN"

  attribute {
    name = "SSN"
    type = "S"
  }

  tags = {
    Name        = "Citizens"
    Environment = "production"
  }
}
