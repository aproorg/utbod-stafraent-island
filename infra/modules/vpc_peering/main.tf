resource "aws_vpc_peering_connection" "default" {
  vpc_id      = var.vpc_requester_id
  peer_vpc_id = var.vpc_accepter_id
  auto_accept = true

  accepter {
    allow_remote_vpc_dns_resolution = true
  }

  requester {
    allow_remote_vpc_dns_resolution = true
  }

  tags = var.tags

  timeouts {
    create = "3m"
    update = "3m"
    delete = "5m"
  }
}

# Create routes from requestor to acceptor
resource "aws_route" "requester" {
  count                     = length(var.vpc_requester_route_tables)
  route_table_id            = var.vpc_requester_route_tables[count.index]
  destination_cidr_block    = var.vpc_accepter_cidr
  vpc_peering_connection_id = join("", aws_vpc_peering_connection.default.*.id)
  depends_on                = [aws_vpc_peering_connection.default]
}

# Create routes from acceptor to requestor
resource "aws_route" "accepter" {
  count                     = length(var.vpc_accepter_route_tables)
  route_table_id            = var.vpc_accepter_route_tables[count.index]
  destination_cidr_block    = var.vpc_requester_cidr
  vpc_peering_connection_id = join("", aws_vpc_peering_connection.default.*.id)
  depends_on                = [aws_vpc_peering_connection.default]
}
