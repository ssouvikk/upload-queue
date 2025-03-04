# Dockerfile.app
FROM node:20.11.1

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code (will be overridden by volume mapping in development)
COPY . .

EXPOSE 3000

# Run development server directly
CMD ["npm", "run", "dev"]
