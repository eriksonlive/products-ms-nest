# -----------------------------
# Etapa 1: Build de la aplicación
# -----------------------------
    FROM node:22-bullseye-slim AS builder
    WORKDIR /app
    
    # Copia archivos de dependencias
    COPY package*.json ./
    
    # Instala todas las dependencias (incluyendo las de desarrollo)
    RUN npm install
    
    # Copia el resto del código fuente
    COPY . .
    
    # Ejecuta el proceso de build (asegúrate de que en package.json tienes definido "build")
    RUN npm run build
    
    # Ejecuta Prisma generate, si es necesario (esto generará el cliente de Prisma)
    RUN npx prisma generate
    
    # -----------------------------
    # Etapa 2: Imagen de producción
    # -----------------------------
    FROM node:22-bullseye-slim
    WORKDIR /app
    
    # Copia el package.json (y package-lock.json) para instalar solo dependencias de producción
    COPY package*.json ./
    RUN npm install --production
    
    # Copia la carpeta "dist" generada en la etapa de build a la imagen final.
    # Nota: Asegúrate de que el comando "npm run build" genera la carpeta "dist" en /app.
    COPY --from=builder /app/dist ./dist
    
    # Expone el puerto en el que corre la aplicación (ajusta según tu configuración, aquí se usa 3001)
    EXPOSE 3001
    
    # Comando para iniciar la aplicación; asegúrate de que en package.json el script "start" ejecute, por ejemplo, "node dist/main.js"
    CMD ["npm", "start"]