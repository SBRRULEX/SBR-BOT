FROM node:18-alpine

WORKDIR /app

COPY backend ./backend
COPY frontend ./frontend
COPY backend/package.json ./backend/package.json
COPY backend/package-lock.json ./backend/package-lock.json

WORKDIR /app/backend
RUN npm install

WORKDIR /app

COPY app.js .

EXPOSE 3000
CMD ["node", "app.js"]
