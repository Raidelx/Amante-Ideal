# Baja la base de datos PostgreSQL (sin borrar volumen).
Set-Location $PSScriptRoot\..
docker compose stop postgres
