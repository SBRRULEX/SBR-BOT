# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy the full project
COPY . .

# Expose port
EXPOSE 3000

# Start the backend server
CMD ["node", "backend/app.js"]
