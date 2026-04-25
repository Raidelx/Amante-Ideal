# Construye el jar y levanta tours-service en modo produccion.
# Si faltan Maven/Java locales, usa contenedores Docker.
Set-Location $PSScriptRoot\..

$projectPath = (Get-Location).Path
$hasMaven = $null -ne (Get-Command mvn -ErrorAction SilentlyContinue)
$hasJava = $null -ne (Get-Command java -ErrorAction SilentlyContinue)

if ($hasMaven -and $hasJava) {
		mvn clean package
		$env:MICRONAUT_SERVER_PORT = "8091"
		$env:MICRONAUT_DATASOURCES_DEFAULT_URL = "jdbc:postgresql://localhost:5432/toursdb"
		$env:MICRONAUT_DATASOURCES_DEFAULT_DRIVERCLASSNAME = "org.postgresql.Driver"
		$env:MICRONAUT_DATASOURCES_DEFAULT_USERNAME = "tours_user"
		$env:MICRONAUT_DATASOURCES_DEFAULT_PASSWORD = "tours_pass"
		java -jar target\tours-service-1.0.0.jar
} else {
		Write-Host "Maven o Java no encontrados. Construyendo/ejecutando con Docker..."
		docker run --rm `
			-v "${projectPath}:/workspace" `
			-w /workspace `
			maven:3.9.9-eclipse-temurin-17 `
			mvn clean package

		$containersUsing8091 = docker ps -q --filter "publish=8091"
		if ($containersUsing8091) {
			Write-Host "Liberando contenedores previos en puerto 8091..."
			docker rm -f $containersUsing8091 | Out-Null
		}

		docker run --rm -p 8091:8091 `
			-e MICRONAUT_SERVER_PORT="8091" `
			-e DB_URL="jdbc:postgresql://host.docker.internal:5432/toursdb" `
			-e DB_USER="tours_user" `
			-e DB_PASSWORD="tours_pass" `
			-e MICRONAUT_DATASOURCES_DEFAULT_URL="jdbc:postgresql://host.docker.internal:5432/toursdb" `
			-e MICRONAUT_DATASOURCES_DEFAULT_DRIVERCLASSNAME="org.postgresql.Driver" `
			-e MICRONAUT_DATASOURCES_DEFAULT_USERNAME="tours_user" `
			-e MICRONAUT_DATASOURCES_DEFAULT_PASSWORD="tours_pass" `
			-v "${projectPath}:/workspace" `
			-w /workspace `
			eclipse-temurin:17-jre `
			java -jar target/tours-service-1.0.0.jar
}
