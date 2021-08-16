#!/bin/bash

INSTANCE_ID=$(
    aws ec2 describe-instances \
        --filters "Name=tag:Name,Values=Bastion Host dev" \
        --query "Reservations[0].Instances[0].InstanceId" \
        --region eu-west-1 \
        --output text
)

echo "Starting port forwarding session with instance $INSTANCE_ID for profile $AWS_PROFILE"

aws ssm start-session \
    --target "$INSTANCE_ID" \
    --document-name AWS-StartPortForwardingSession \
    --parameters '{"portNumber":["5432"],"localPortNumber":["5432"]}' \
    --region eu-west-1
