# Utilizar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de definición de paquetes
COPY package*.json ./

# Instalar todas las dependencias necesarias en el contenedor
RUN npm install

# Copiar el resto de los archivos de tu aplicación al contenedor
COPY . .

# Cambiar el nombre de .env.docker a .env
RUN mv .env.docker .env

# Exponer el puerto que tu aplicación utiliza
EXPOSE 3000

# Definir el comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]