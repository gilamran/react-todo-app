# Build React App
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve with Express
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY index.js ./
COPY package*.json ./
RUN npm install --only=production
EXPOSE 80
CMD ["node", "index.js"]
