#!/usr/bin/env bash
ls -lL /usr/bin/env
set -euxo pipefail

cd src/thjodskra
dotnet restore
dotnet build
dotnet lambda package