#!/bin/bash

get_instance() {
  local instance_id
  instance_id="$1"

  aws ec2 describe-instances \
      --filters "Name=tag:Name,Values=Bastion Host $env" \
      --query "Reservations[0].Instances[0].InstanceId" \
      --region eu-west-1 \
      --output text
}

start() {
  local env
  local verbose
  env="$1"
  verbose=$2

  instance_id=$(get_instance "$env")
  echo "Starting port forwarding session with instance $instance_id for profile $AWS_PROFILE"

  aws $(if [ "$verbose" == true ]; then echo "--debug"; fi) ssm start-session \
      --target "$instance_id" \
      --document-name AWS-StartPortForwardingSession \
      --parameters '{"portNumber":["5432"],"localPortNumber":["5432"]}' \
      --region eu-west-1
}

usage() {
        echo "Usage: $(basename $0) -e [dev|staging|prod] -v" 2>&1
        echo "   -e   set aws environment." 2>&1
        echo "   -v   verbose." 2>&1
        exit 1
}

if [[ ${#} -eq 0 ]]; then
   usage
fi

VERBOSE=false
while getopts ':e:v' arg; do
  case "${arg}" in
    e)
      ENV="${OPTARG}"
      ;;
    v)
      VERBOSE=true
      ;;
    ?)
      echo "Invalid option: -${OPTARG}."
      echo
      usage
      ;;
  esac
done

start "$ENV" $VERBOSE
