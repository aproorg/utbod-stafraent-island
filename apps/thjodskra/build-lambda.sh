#!/usr/bin/bash

set -euxo pipefail

# ls -lL /usr/bin/env

# which env
# which bash

cd src/thjodskra
dotnet restore
dotnet build
dotnet lambda package