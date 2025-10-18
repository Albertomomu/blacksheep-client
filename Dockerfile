# ---- Etapa 1: Build ----
FROM node:18 AS builder
WORKDIR /app

# Copiamos los archivos de la app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Etapa 2: Servir con Nginx ----
FROM nginx:alpine
# Copiamos los archivos generados por Vite al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 (el estándar HTTP)
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]
