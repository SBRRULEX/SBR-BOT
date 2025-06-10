# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy cookie-extractor folder
COPY ./cookie-extractor ./cookie-extractor

# Set working directory to cookie-extractor
WORKDIR /app/cookie-extractor

# Install dependencies
RUN npm install

# Expose a port just in case Render needs it (not actually used by script)
EXPOSE 3000

# Default command
CMD ["node", "getcookies_secure.js"]
