#!/usr/bin/env bash
set -euo pipefail

echo
echo "Press enter to generate GraphQL error"
echo
read -r

env=${1:-prod}

curl -s 'https://'"$env"'.islandis.island.andes.cloud/graphql' \
  -H 'Accept-Encoding: gzip, deflate, br' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Connection: keep-alive' \
  -H 'DNT: 1' \
  -H 'Origin: https://'"$env"'.islandis.island.andes.cloud' \
  --data-binary '{"query":"mutation {\n  submitApplication(\n    application: {\n      nationalId: \"0000000000\"\n      children: [{nationalId: \"1502143190\"}]\n      preferredJobs: [{ name: \"developer\" }, { name: \"manager\" }]\n      startDate: \"2021-10-01\"\n    }\n  ) {\n    id\n  }\n}\n"}' \
  --compressed
