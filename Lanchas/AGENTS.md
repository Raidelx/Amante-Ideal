# AGENTS

## Agente principal usado

- Nombre: GitHub Copilot
- Modelo: GPT-5.3-Codex
- Entorno: VS Code

## Alcance del agente en este repositorio

- Crear estructura del monorepo.
- Implementar `tours-service` con arquitectura por capas.
- Implementar frontend React + Tailwind que consume `POST /tours` y `GET /tours`.
- Generar scripts de ejecucion local para desarrollo y produccion.
- Documentar la implementacion para revision academica.

## Restricciones aplicadas

- Separacion por capas en backend (`controller`, `business`, `repository`, `model`).
- Base de datos principal local en Docker (PostgreSQL) y perfil alternativo H2.
- Configuracion minima para correr en local.
