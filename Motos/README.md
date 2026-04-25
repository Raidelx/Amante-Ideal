# New MotoParts

API serverless local para publicar y consultar partes de motos usando Lambda, REST y DynamoDB local.

## Requisitos

- Node.js 20+
- Docker Desktop

## Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Levantar DynamoDB local:
   ```bash
   npm run db:start
   ```

3. Crear la tabla y cargar datos mínimos:
   ```bash
   npm run db:setup
   ```

4. Ejecutar la API local:
   ```bash
   npm run db:setup
   ```

## Endpoints

### POST /partes

Registra una parte.

Body JSON:

```json
{
  "nombre": "Pastilla de freno",
  "tipo": "frenos",
  "precio": 25.5
}
```

### GET /partes?tipo=frenos

Lista las partes por tipo.

### DELETE /partes?tipo=frenos&id=<id>

Elimina una parte por tipo e id.

Ejemplo PowerShell:

```powershell
Invoke-RestMethod -Method Delete -Uri "http://localhost:3000/partes?tipo=frenos&id=seed-1"
```

Ejemplo curl:

```bash
curl -X DELETE "http://localhost:3000/partes?tipo=frenos&id=seed-1"
```

## Scripts

- `npm run dev`: levanta serverless offline
- `npm run db:start`: inicia DynamoDB local
- `npm run db:setup`: crea la tabla y agrega datos de ejemplo
- `npm run deploy:simulado`: genera el paquete local de despliegue para prod

## Cliente HTTP

Usar Postman, Insomnia o curl contra `http://localhost:3000`.
