# Dockerfile
FROM node:20-alpine

# Instalar pnpm
RUN npm install -g pnpm turbo

# Configurar diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json pnpm-workspace.yaml turbo.json ./

# Copiar todos os packages e apps
COPY apps ./apps
COPY packages ./packages

# Instalar dependências
RUN pnpm install

# Expor portas para os apps
EXPOSE 3000 3001 3002

# Comando padrão
CMD ["pnpm", "dev"]
