# Usa una imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que corre tu app
EXPOSE 3003

# Define la variable de entorno por defecto (puede ser sobreescrita en tiempo de ejecución)
ENV PORT=3003

# Comando para iniciar la app
CMD ["node", "app.js"]
