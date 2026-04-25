# Instala dependencias y ejecuta frontend en modo desarrollo.
# Si la ruta contiene '#', usa una copia temporal real para evitar errores de Vite.
$frontendPath = (Resolve-Path "$PSScriptRoot\..").Path
$safePath = Join-Path $env:TEMP "nuevo_frontend_safe"

if ($frontendPath -match "#") {
	if (Test-Path $safePath) {
		Remove-Item -Recurse -Force $safePath
	}
	New-Item -ItemType Directory -Path $safePath | Out-Null

	# Copia el proyecto excepto artefactos pesados para correr Vite sin path conflictivo.
	robocopy $frontendPath $safePath /E /XD node_modules dist .git > $null

	Write-Host "Ruta con '#'. Ejecutando frontend desde copia segura: $safePath"
	Set-Location $safePath
} else {
	Set-Location $frontendPath
}

npm install
npm run dev
