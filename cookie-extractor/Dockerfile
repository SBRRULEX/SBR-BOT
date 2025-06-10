# Dockerfile for cookie-extractor

FROM node:18

WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "getcookies_secure.js"]
