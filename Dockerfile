FROM maven:3.9.4-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml ./
COPY backend/pom.xml backend/
COPY frontend/pom.xml frontend/

RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mvn -f backend/pom.xml dependency:go-offline -B

COPY backend /app/backend
COPY frontend /app/frontend

RUN mvn -f backend/pom.xml clean package -DskipTests

FROM openjdk:21-slim AS runtime

RUN useradd -ms /bin/bash appuser

WORKDIR /app
COPY --from=build /app/backend/target/quarkus-app/ /app/

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8080
CMD ["java", "-jar", "/app/quarkus-run.jar"]