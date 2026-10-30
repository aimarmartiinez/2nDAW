# Utilitzem Node.js 20 (Requerit per les darreres versions de Vite)
FROM node:20-alpine

# Carpeta de treball
WORKDIR /app

# Copiem els fitxers de configuració (el lock és opcional)
COPY package*.json ./
RUN npm install

# Copiem la resta del codi
COPY . .

# Exposem el port de Vite
EXPOSE 5173

# Comanda per defecte (amb --host per permetre connexions externes al contenidor)
CMD ["npm", "run", "dev", "--", "--host"]
