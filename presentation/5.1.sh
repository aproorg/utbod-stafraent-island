#!/usr/bin/env bash
set -euxo pipefail

echo
echo "Press enter to create application using GraphQL service"
echo

created_application=$(curl -s 'https://dev.islandis.island.andes.cloud/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://dev.islandis.island.andes.cloud' --data-binary '{"query":"mutation {\n  submitApplication(\n    application: {\n      nationalId: \"0101302989\"\n      children: [{nationalId: \"1502143190\"}]\n      preferredJobs: [{ name: \"developer\" }, { name: \"manager\" }]\n      startDate: \"2021-10-01\"\n    }\n  ) {\n    id\n  }\n}\n"}' --compressed)

application_id=$(echo $created_application | jq '.data.submitApplication.id' -r)
echo "Created application with id: $application_id (PRESS ENTER TO CONTINUE)"

read

echo
echo "Getting application created in VMST using VMST GET method"
echo

curl -s -X 'GET' \
  'https://dev.vmst.island.andes.cloud/api/v1/applications/'$application_id \
  -H 'accept: application/json'

