# Reinicia la base y elimina datos persistidos (usar solo si quieres empezar de cero).
Set-Location $PSScriptRoot\..
docker compose down -v
