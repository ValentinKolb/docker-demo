# Use Ubuntu as base image
FROM ubuntu:latest

# Set labels
LABEL authors="valentinkolb"

# RUN command during build time
RUN echo "Container is being built..."

# set the working directory for the following commands
WORKDIR /app

# COPY command during build time
COPY . .

# set environment variable during build time
ENV FOO=BAR

# print environment variable during build time
RUN echo $FOO

# set the programm to be executed when the container is started
# this can be overwritten when starting the container with the --entrypoint flag (docker run --entrypoint <programm> <image>)
ENTRYPOINT ["echo"]

# set the default argument for the entrypoint
# this can be overwritten when starting the container by simply adding the argument after the image name when starting the container (docker run <image> <argument>)
CMD ["hallo welt"]