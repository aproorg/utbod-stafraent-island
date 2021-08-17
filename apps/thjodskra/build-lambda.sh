#!/usr/bin/env bash

set -euxo pipefail

cd src/thjodskra
dotnet restore
dotnet build
dotnet lambda package