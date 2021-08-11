data "aws_iam_policy_document" "bastion_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "bastion" {
  name               = "bastion"
  assume_role_policy = data.aws_iam_policy_document.bastion_assume_role.json
}

resource "aws_iam_instance_profile" "bastion" {
  name = "bastion_profile"
  role = aws_iam_role.bastion.name
}

resource "aws_iam_role_policy_attachment" "ssm_core_attach" {
  role       = aws_iam_role.bastion.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}
