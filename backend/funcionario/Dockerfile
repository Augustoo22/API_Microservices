# Use uma imagem base com Maven e JDK para o build
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Diretório de trabalho no contêiner
WORKDIR /app

# Copiar o código fonte do projeto para o contêiner
COPY . .

# Executar o Maven para compilar o projeto e gerar o JAR
RUN mvn clean package -DskipTests

# Construir uma imagem leve para execução
FROM eclipse-temurin:17-jdk-alpine

# Diretório de trabalho no contêiner
WORKDIR /app

# Copiar o JAR gerado para a imagem final
COPY --from=build /app/target/funcionario-0.0.1-SNAPSHOT.jar app.jar

# Expor a porta em que o Spring Boot será executado
EXPOSE 5050

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]