# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app/backend

# Copy backend files
COPY backend/package*.json ./
RUN npm install

COPY backend ./

# Expose port (Render assigns dynamic port, so we use env)
EXPOSE 10000

CMD [ "node", "app.js" ]
