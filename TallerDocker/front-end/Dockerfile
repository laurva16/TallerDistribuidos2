# Imagen base de Node para construir la app
FROM node:18 AS build

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias y código
COPY package*.json ./
RUN npm install

COPY . .

# Construir la app para producción
RUN npm run build

# Usar Nginx para servir el frontend
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copia una configuración básica de Nginx si quieres (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
