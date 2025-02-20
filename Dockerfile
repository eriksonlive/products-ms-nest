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
    
    # 🔹 Asegura que Prisma tenga acceso al esquema
    COPY prisma ./prisma
    
    # Ejecuta Prisma generate para generar el cliente de Prisma
    RUN npx prisma generate
    
    # Ejecuta el proceso de build (asegúrate de que en package.json tienes definido "build")
    RUN npm run build
    
    # -----------------------------
    # Etapa 2: Imagen de producción
    # -----------------------------
    FROM node:22-bullseye-slim
    WORKDIR /app
    
    # Copia el package.json (y package-lock.json) para instalar solo dependencias de producción
    COPY package*.json ./
    RUN npm install --production
    
    # Copia la carpeta "dist" generada en la etapa de build a la imagen final
    COPY --from=builder /app/dist ./dist
    
    # 🔹 Copia el cliente de Prisma generado en la etapa de construcción
    COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
    
    # 🔹 Copia la carpeta prisma para que esté disponible en producción
    COPY --from=builder /app/prisma ./prisma
    
    # Expone el puerto en el que corre la aplicación
    EXPOSE 3001
    
    # Comando para iniciar la aplicación
    CMD ["node", "dist/main.js"]
    