# Script opcional para levantar DB y abrir 2 terminales con backend + frontend.
Set-Location $PSScriptRoot
docker compose up -d postgres
$backendPath = Join-Path $PSScriptRoot 'tours-service'
$frontendPath = Join-Path $PSScriptRoot 'frontend'
Start-Process powershell -ArgumentList '-NoExit', '-Command', "Set-Location '$backendPath'; ./scripts/dev.ps1"
Start-Process powershell -ArgumentList '-NoExit', '-Command', "Set-Location '$frontendPath'; ./scripts/dev.ps1"
