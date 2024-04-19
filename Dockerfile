FROM node

# Labels
LABEL maintainer="Valentin Kolb <valentin.kolb@uni-ulm.de>"
LABEL version="1.0.0"
LABEL description="This is a sample Docker image."

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Set the NODE_ENV to development
ENV NODE_ENV development

# Install all dependencies
RUN npm install

# Copy compiled source code
COPY out ./out

# Set the NODE_ENV to production
ENV NODE_ENV production

# Start the server
CMD ["node", "./out/app.js"]