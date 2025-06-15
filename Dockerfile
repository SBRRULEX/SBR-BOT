# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install
COPY package.json .
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "app.js"]
