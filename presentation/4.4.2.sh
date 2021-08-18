#!/usr/bin/env bash
set -euo pipefail
env=${1:-prod}

created_application=$(curl -s -X 'POST' \
  'https://'"$env"'.vmst.island.andes.cloud/api/v1/applications' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Ólafur Darri",
  "address": "Miðbæjargata 4",
  "postalCode": 101,
  "city": "Reykjavik",
  "nationalId": "0101307789",
  "children": [
    {
      "name": "Svakalegur Ólafsson",
      "nationalId": "0101304929"
    }
  ],
  "preferredJobs": [
    {
      "job": "Leikari"
    },
    {
      "job": "Smiður"
    }
  ]
}')

application_id=$(echo $created_application | jq '.id' -r)
echo "Created application with id: $application_id (PRESS ENTER TO CONTINUE)"

read -r

echo
echo "Getting application"
echo

curl -s -X 'GET' \
  'https://'"$env"'.vmst.island.andes.cloud/api/v1/applications/'$application_id \
  -H 'accept: application/json' | jq

read -r

echo
echo "Updating application (adding job)"
echo

curl -s -X 'PUT' \
  'https://'"$env"'.vmst.island.andes.cloud/api/v1/applications/'$application_id \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Ólafur Darri",
  "address": "Miðbæjargata 4",
  "postalCode": 101,
  "city": "Reykjavik",
  "nationalId": "0101307789",
  "children": [
    {
      "name": "Svakalegur Ólafsson",
      "nationalId": "0101304929"
    }
  ],
  "preferredJobs": [
    {
      "job": "Leikari"
    },
    {
      "job": "Smiður"
    },
    {
      "job": "Allsherjargoði"
    }
  ]
}' > /dev/null

curl -s -X 'GET' \
  'https://'"$env"'.vmst.island.andes.cloud/api/v1/applications/'$application_id \
  -H 'accept: application/json' | jq

read -r

echo
echo "Deleting application"
echo

curl -s -X 'DELETE' \
  'https://'"$env"'.vmst.island.andes.cloud/api/v1/applications/'$application_id \
  -H 'accept: */*'
curl -s -X 'GET' \
  'https://'"$env"'.vmst.island.andes.cloud/api/v1/applications/'$application_id \
  -H 'accept: application/json' | jq

echo
