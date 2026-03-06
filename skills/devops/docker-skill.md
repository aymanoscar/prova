# Docker & Container Skill

Help with Docker containers, Compose files, Dockerfiles, and container orchestration.

## When to activate
- User mentions Docker, containers, docker-compose, Dockerfile
- User wants to containerize an application
- User has Docker errors or networking issues

## Capabilities

### Dockerfile best practices
- Multi-stage builds to minimize image size
- Non-root user for security
- Layer caching optimization (.dockerignore)
- Health checks
- Proper ENTRYPOINT vs CMD usage

### Docker Compose
- Service dependencies (depends_on + healthcheck)
- Volume management (named vs bind mounts)
- Network configuration
- Environment variables (never hardcode secrets)
- Override files (docker-compose.override.yml)

### Debugging containers
- `docker logs <container>` — view logs
- `docker exec -it <container> sh` — shell access
- `docker inspect <container>` — full config
- `docker stats` — resource usage
- `docker network inspect` — network debugging

## Security checklist
- [ ] Non-root user in container
- [ ] Read-only filesystem where possible
- [ ] No secrets in ENV or image layers
- [ ] Minimal base image (alpine, distroless)
- [ ] Pinned image versions (not :latest)
- [ ] Resource limits set (memory, CPU)
