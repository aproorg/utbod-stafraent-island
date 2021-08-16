data "aws_ami" "amazon_linux_2" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }

  owners = ["amazon"]
}

resource "aws_security_group" "bastion" {
  name   = "bastion-sg-${var.env}"
  vpc_id = var.vpc_id

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_instance" "bastion" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = "t3.small"

  iam_instance_profile   = aws_iam_instance_profile.bastion.id
  vpc_security_group_ids = [aws_security_group.bastion.id]
  subnet_id              = var.subnet_id

  user_data = <<EOF
    #!/bin/bash
    sudo yum update -y && sudo yum install -y socat
    socat TCP-LISTEN:5432,reuseaddr,fork TCP4:${var.db_domain}:5432 &
  EOF

  tags = {
    Name = "Bastion Host ${var.env}"
  }

  lifecycle {
    ignore_changes = [ami]
  }
}
