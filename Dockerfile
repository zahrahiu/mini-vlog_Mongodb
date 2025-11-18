# Base image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
