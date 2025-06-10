FROM node:18

# Working directory set to /app
WORKDIR /app

# Copy backend files and install dependencies
COPY backend ./backend
WORKDIR /app/backend
RUN npm install

# Copy cookie-extractor files and install dependencies
WORKDIR /app
COPY cookie-extractor ./cookie-extractor
WORKDIR /app/cookie-extractor
RUN npm install

# Go back to backend and start main app
WORKDIR /app/backend

# Expose port (backend runs here, usually on 3001)
EXPOSE 3001

# Start backend app
CMD ["node", "app.js"]
