# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy backend files
COPY backend ./backend

# Set working dir to backend
WORKDIR /app/backend

# Install dependencies
RUN npm install

# Expose port (very important for Render)
EXPOSE 3000

# Start server
CMD ["npm", "start"]
