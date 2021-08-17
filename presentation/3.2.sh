#!/usr/bin/env bash
killall session-manager-plugin
set -euo pipefail

env=${1:-prod}

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

$SCRIPT_DIR/../infra/tunnel.sh -e $env &

while ! nc -z localhost 5432; do
  sleep 0.1
done

db_pass=$(aws ssm get-parameter --name=/ecs/vmst-$env/DB_PASSWORD --with-decryption --query=Parameter.Value --output=text)

docker run -e PGPASSWORD=$db_pass --rm --network host postgres:11.7 psql -h localhost -d vmst -U vmst -c "select * from applications"
