#!/usr/bin/env bash
set -euxo pipefail

ls -lL /usr/bin/env

cd src/thjodskra
dotnet restore
dotnet build
dotnet lambda package