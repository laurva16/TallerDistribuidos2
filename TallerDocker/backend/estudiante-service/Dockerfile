# Imagen base
FROM node:18

# Crear y establecer directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
RUN npm install

COPY . .

# Exponer el puerto que usa tu microservicio
EXPOSE 3001

# Comando para correr la app
CMD ["node", "app.js"]
