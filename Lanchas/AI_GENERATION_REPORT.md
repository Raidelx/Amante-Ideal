# AI Generation Report

Este proyecto fue generado con asistencia de una AI especializada en coding para fines educativos.

## Componentes generados

- `tours-service` (Micronaut REST + PostgreSQL/H2).
- `frontend` (React + Tailwind).
- `docker-compose.yml` para base de datos PostgreSQL.
- Scripts `dev` y `prod` para cada componente.
- Documentacion en `README.md`.

## Decisiones tecnicas principales

1. Micronaut como framework backend para microservicio REST.
2. Arquitectura por capas para separar responsabilidades.
3. PostgreSQL en Docker para acceso externo con DBeaver y topologia de 3 componentes.
4. H2 como alternativa rapida sin Docker.
5. React + Tailwind para un frontend rapido de operar en local.

## Endpoints implementados

- `POST /tours`: crea un tour con `nombre`, `ubicacion`, `precio`.
- `GET /tours`: lista tours disponibles.

## Topologia final

- Cliente Web (React) -> `tours-service` (Micronaut REST) -> PostgreSQL local en Docker.

## Observacion para revision

Para evidenciar autoria colaborativa en pareja, realizar commits por integrante en GitHub con mensajes claros por modulo.
