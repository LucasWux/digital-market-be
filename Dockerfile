# Use the official Node.js 20 image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and yarn.lock to install dependencies first (for better cache)
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

RUN yarn typechain:gen

# Build the NestJS application
RUN yarn build

# Expose the port (if needed, in case you plan to run it later)
EXPOSE ${APP_PORT}

# Command to run only echo 1
CMD ["yarn", "start"]
