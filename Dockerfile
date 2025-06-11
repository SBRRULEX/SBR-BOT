# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend ./backend
COPY frontend ./frontend

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Build frontend if needed (if it's not static HTML only)
# WORKDIR /app/frontend
# RUN npm install && npm run build

# Move back to main app folder to run backend
WORKDIR /app/backend

# Expose port
EXPOSE 3000

# Start backend
CMD ["npm", "start"]
