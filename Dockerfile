# Etapa 1: Construção da aplicação
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências de desenvolvimento
RUN npm install

# Copiar o restante do código
COPY . .

# Compilar o projeto
RUN npm run build

# Remover as dependências de desenvolvimento
RUN npm prune --production

# Etapa 2: Executar a aplicação
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar as dependências de produção e o código compilado da etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
