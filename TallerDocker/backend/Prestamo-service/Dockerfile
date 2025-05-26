# Usa una imagen base oficial de Node.js
FROM node:18

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto que usa el servicio
EXPOSE 3003

# Comando para iniciar el servicio
CMD ["node", "Prestamo.js"]
