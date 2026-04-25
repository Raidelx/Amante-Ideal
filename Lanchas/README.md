# Ejercicio #6 - Tours con Micronaut + React

Implementacion enfocada solo en el microservicio de `tours` y un frontend que lo consume.

## 1. Estructura del monorepo

```text
Nuevo/
  tours-service/  -> Micronaut REST (POST /tours, GET /tours)
  frontend/       -> React + Tailwind consumiendo tours-service
  scripts/        -> Scripts para levantar/apagar base de datos
  docker-compose.yml -> PostgreSQL local
```

## 2. Requisitos previos

- Java 17+
- Maven 3.9+ (opcional si usas Docker para backend)
- Node.js 18+
- npm
- Docker Desktop (para PostgreSQL)

Nota: Si no tienes Maven instalado, el script `tours-service/scripts/dev.ps1` construye y ejecuta el backend con las imagenes oficiales de Docker automaticamente.
Nota: Si la ruta del proyecto contiene `#` (por ejemplo `Ejercicio#6`), los scripts del frontend usan automaticamente una copia temporal segura para evitar errores de Vite.

## 3. Arquitectura aplicada

- Backend: Micronaut + REST.
- Frontend: React + Tailwind.
- Base de datos principal: PostgreSQL en contenedor Docker.
- Base de datos alternativa: H2 (perfil `h2`) para pruebas rapidas sin Docker.
- Capas en el microservicio:
  - `model`
  - `repository`
  - `business`
  - `controller`

## 4. Puertos

- `tours-service`: `http://localhost:8091`
- `frontend`: `http://localhost:5173`
- `postgres`: `localhost:5432`

Credenciales DB por defecto:

- `database`: `toursdb`
- `user`: `tours_user`
- `password`: `tours_pass`

## 5. Ejecutar por separado

### 5.1 Base de datos PostgreSQL

```powershell
./scripts/db-up.ps1
```

Apagar DB:

```powershell
./scripts/db-down.ps1
```

Reset completo de DB (borra datos):

```powershell
./scripts/db-reset.ps1
```

### 5.2 tours-service (Micronaut)

```powershell
cd tours-service
./scripts/dev.ps1
```

Si aparece `mvn is not recognized`, este script usara automaticamente `maven:3.9.9-eclipse-temurin-17` en Docker.

Si aparece `Bind for 0.0.0.0:8091 failed: port is already allocated`, limpia contenedores que ocupan el puerto y vuelve a intentar:

```powershell
docker rm -f $(docker ps -aq --filter "publish=8091")
```

Modo produccion:

```powershell
cd tours-service
./scripts/prod.ps1
```

Opcional sin Docker (perfil H2):

```powershell
cd tours-service
$env:MICRONAUT_ENVIRONMENTS="h2"
./scripts/dev.ps1
```

Endpoints:

- `POST /tours`
- `GET /tours`

Ejemplo de creacion:

```http
POST http://localhost:8091/tours
Content-Type: application/json

{
  "nombre": "Tour del amanecer",
  "ubicacion": "Canal Verde",
  "precio": 35.50
}
```

### 5.3 frontend (React + Tailwind)

```powershell
cd frontend
./scripts/dev.ps1
```

Modo produccion:

```powershell
cd frontend
./scripts/prod.ps1
```

## 6. Script opcional para iniciar todo

Desde la raiz del monorepo:

```powershell
./start-all-dev.ps1
```

Este script primero levanta PostgreSQL y luego abre backend + frontend.

## 7. Explicacion para principiantes

- `controller`: recibe peticiones HTTP.
- `business`: aplica reglas del caso.
- `repository`: guarda y consulta en BD.
- `model`: representa el objeto `Tour`.

Flujo para crear tour:

1. El frontend envia `POST /tours`.
2. `TourController` valida y recibe el JSON.
3. `TourService` arma la entidad y aplica logica.
4. `TourRepository` guarda en PostgreSQL.
5. Se devuelve el tour creado.

Flujo para listar tours:

1. El frontend llama `GET /tours`.
2. `TourController` delega en `TourService`.
3. `TourService` consulta `TourRepository`.
4. Se devuelve la lista.

## 8. Conexion desde DBeaver

Crear nueva conexion PostgreSQL con estos valores:

- `Host`: `localhost`
- `Port`: `5432`
- `Database`: `toursdb`
- `Username`: `tours_user`
- `Password`: `tours_pass`

Tabla esperada luego de crear tours: `tours`.

## 9. Entregables para revision

- Subir este monorepo a GitHub y hacer commits separados por integrante.
- Mantener este `README.md` y los archivos de configuracion visibles para demostrar como se genero el proyecto.
- Incluir `AGENTS.md` y `AI_GENERATION_REPORT.md` como evidencia del proceso asistido por AI.
- Prepararse para explicar:
  - tecnologia (Micronaut, React, Tailwind),
  - paradigma por capas,
  - topologia (frontend cliente + microservicio REST + BD local).
