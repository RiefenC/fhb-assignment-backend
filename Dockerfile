# ---- Stage 1: Abhaengigkeiten installieren ----
FROM node:26-slim AS build
WORKDIR /app

# Zuerst nur die Paket-Dateien kopieren (besseres Caching)
COPY package*.json ./

# Nur Produktiv-Abhaengigkeiten installieren (kein jest, supertest, nodemon)
RUN npm ci --omit=dev

# Restlichen Quellcode kopieren
COPY . .

# ---- Stage 2: Schlankes, gehaertetes Laufzeit-Image ----
FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /app

# Fertige App aus der Build-Stage uebernehmen
COPY --from=build /app /app

# Dokumentiert den genutzten Port
EXPOSE 3001

# Distroless hat 'node' bereits als Startbefehl -> nur das Skript angeben
CMD ["index.js"]
