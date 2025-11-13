.PHONY: help install dev build up down logs clean

help: ## Mostra esta mensagem de ajuda
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Instala as dependências
	pnpm install

dev: ## Roda em modo desenvolvimento (sem Docker)
	pnpm dev

build: ## Build de produção
	pnpm build

up: ## Sobe os containers Docker
	docker compose up

up-build: ## Sobe os containers Docker com rebuild
	docker compose up --build

down: ## Para os containers Docker
	docker compose down

logs: ## Mostra logs dos containers
	docker compose logs -f

clean: ## Limpa node_modules e builds
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/dist
	rm -rf packages/*/dist
	rm -rf .turbo

shell: ## Acessa o shell do container
	docker-compose exec turborepo-dev sh
