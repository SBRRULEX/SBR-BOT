FROM node:20

WORKDIR /app

COPY . .

# Install backend dependencies
RUN cd backend && npm install

# Install cookie-extractor dependencies
RUN cd /app/cookie-extractor && npm install

WORKDIR /app/backend

EXPOSE 3000

CMD ["node", "app.js"]
