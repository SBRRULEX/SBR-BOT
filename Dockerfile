# Use official Node image
FROM node:20

# Create app directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
