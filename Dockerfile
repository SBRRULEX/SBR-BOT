# Base image
FROM node:18

# Set working directory inside container
WORKDIR /app/backend

# Copy backend package.json and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy rest of backend files
COPY backend ./

# Expose port
EXPOSE 3000

# Start the backend
CMD ["node", "index.js"]
