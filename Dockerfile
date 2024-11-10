# Etapa 1: Build de la aplicación con Node 20.13.1
FROM node:20.13.1 AS build
# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app
# Copiar package.json e instalar las dependencias
COPY package*.json ./
RUN npm install
# Copiar el resto del código de la aplicación
COPY . .
# Construir la aplicación para producción
RUN npm run build
# Etapa final: Crear el contenedor solo para servir archivos estáticos
FROM node:20.13.1-alpine
# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app
# Copiar los archivos estáticos generados en la etapa de construcción
COPY --from=build /usr/src/app/dist /usr/src/app/dist
# Instalar un servidor HTTP simple para servir los archivos estáticos
RUN npm install -g serve
# Exponer el puerto por el que se servirá la app
EXPOSE 80
# Comando para iniciar el servidor
CMD ["serve", "-s", "dist"]

