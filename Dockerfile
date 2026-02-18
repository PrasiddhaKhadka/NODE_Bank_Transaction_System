# -------------------------
# Base Image
# -------------------------
#  We are using the official Node.js image based on Alpine Linux for a lightweight and efficient environment.
# The multi-stage build allows us to separate the dependency installation from the final image, ensuring that only the necessary files are included in the final image, which helps to reduce its size and improve security.
FROM node:20-alpine AS base

# Set the working directory in the container to /app. This is where our application code will reside.
WORKDIR /app

# -------------------------
# Install dependencies 
# -------------------------
# We are using a multi-stage build to optimize the final image size.

FROM base AS dependencies

COPY package*.json ./
# Install only production dependencies to reduce image size 📍 no any dev dependency
RUN npm ci --only=production 


# -------------------------
# Development Stage
# -------------------------
FROM base AS development


ENV NODE_ENV=development
COPY package*.json ./
RUN npm install


# -------------------------
# Production Stage
# -------------------------
FROM base AS production

ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Remove unnecessary dev files to further reduce the image size
RUN npm prune --production


# Expose the port that the application will run on
EXPOSE 8000
# Start the application using npm dev
CMD ["npm","run","dev"]