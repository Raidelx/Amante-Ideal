# Levanta la base de datos PostgreSQL para el proyecto.
Set-Location $PSScriptRoot\..
docker compose up -d postgres
