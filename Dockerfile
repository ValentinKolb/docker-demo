# First stage: builder
FROM node AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Set the NODE_ENV to development
ENV NODE_ENV development

# Install all dependencies
RUN npm install

# Copy the source code
COPY src ./src
COPY tsconfig.json ./

# Compile the TypeScript code
RUN npm run build

# Second stage: runner
FROM node AS runner

# Labels
LABEL maintainer="Valentin Kolb <valentin.kolb@uni-ulm.de>"
LABEL version="1.0.0"
LABEL description="This is a sample Docker image."

# Set the working directory
WORKDIR /app

# Copy only the compiled code from the builder container
COPY --from=builder /app/out ./out

# Copy the third-party dependencies from the builder container (no need to install them again)
COPY --from=builder /app/node_modules ./node_modules

# Set the NODE_ENV to production
ENV NODE_ENV production

# Start the server
CMD ["node", "./out/app.js"]