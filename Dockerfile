# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy backend code
COPY backend ./backend

# Copy cookie-extractor code
COPY cookie-extractor ./cookie-extractor

# Set working directory to backend
WORKDIR /app/backend

# Install backend dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start backend
CMD ["node", "app.js"]
