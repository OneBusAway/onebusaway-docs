# Use ruby alpine as base image
FROM ruby:3.3.0-alpine

# Install build dependencies
RUN apk add --no-cache build-base nodejs yarn curl

# Set the working directory in the container to /app
WORKDIR /app

# copy the gemfile
COPY Gemfile Gemfile.lock ./

# Install Gems
RUN bundle install

# copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install packages with yarn
RUN yarn install

# Copy code to the container
COPY . .

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run bin/bridgetown when the container launches
CMD ["bin/bridgetown", "start"]