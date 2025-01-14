# Use uma imagem oficial do Node.js como base
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para dentro do container
COPY . .

# Expondo a porta que o Next.js vai usar
EXPOSE 3000

# Define o comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
