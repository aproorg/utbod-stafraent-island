#!/usr/bin/env bash
set -euxo pipefail

aws dynamodb put-item \
    --table-name Citizens  \
    --item \
        '{"SSN": {"S": "2509882579"}, "Name": {"S": "Sindri Guðmundsson"}, "Address": {"S": "Búlandi 29"}, "Phone": {"S": "8682226"}, "Email": {"S": "sindri@andes.is"}, "Spouse": {"S": "2409882919"}, "Children": { "SS" : ["1406173180", "0901202710"] } }'
aws dynamodb put-item \
    --table-name Citizens  \
    --item \
        '{"SSN": {"S": "2409882919"}, "Name": {"S": "Gerður Þóra Björnsdóttir"}, "Address": {"S": "Búlandi 29"}, "Spouse": {"S": "2509882579"}, "Children": { "SS" : ["1406173180", "0901202710"] } }'
aws dynamodb put-item \
    --table-name Citizens  \
    --item \
        '{"SSN": {"S": "1406173180"}, "Name": {"S": "Heiður Sindradóttir"}, "Address": {"S": "Búlandi 29"}}'
aws dynamodb put-item \
    --table-name Citizens  \
    --item \
        '{"SSN": {"S": "0901202710"}, "Name": {"S": "Björn Tryggvi Sindrason"}, "Address": {"S": "Búlandi 29"}}'




aws dynamodb put-item \
    --table-name Citizens  \
    --item \
        '{"SSN": {"S": "0101147789"}, "Name": {"S": "Gervibarn 7 ára"}, "Address": {"S": "Lindargata 3"} }'

aws dynamodb put-item \
    --table-name Citizens  \
    --item \
        '{"SSN": {"S": "0101307789"}, "Name": {"S": "Gervimaður útlönd"}, "Address": {"S": "Lindargata 3"}, "Phone": {"S": "4265500"}, "Email": {"S": "gj@island.is"} }'

aws dynamodb put-item \
    --table-name Citizens  \
    --item \
        '{"SSN": {"S": "0101302989"}, "Name": {"S": "Gervimaður Ameríka"}, "Address": {"S": "Nónsstígur 5"}, "Phone": {"S": "4265501"}, "Email": {"S": "vg@island.is"}, "Spouse": {"S": "0101307789"}, "Children": { "SS": ["0101147789"] } }'

aws dynamodb put-item \
    --table-name Citizens  \
    --item \
        '{"SSN": {"S": "0101307789"}, "Name": {"S": "Gervimaður útlönd"}, "Address": {"S": "Lindargata 3"}, "Phone": {"S": "4265500"}, "Email": {"S": "gj@island.is"}, "Spouse": {"S": "0101302989"}, "Children": { "SS": ["0101147789"] } }'