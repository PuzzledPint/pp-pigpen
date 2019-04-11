FROM ubuntu:18.04
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install git build-essential wget

# Prep the repo for NodeJS 11 (latest) rather than 10 (LTS)
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs npm

# Bump up from npm 3 to 5.
RUN npm install -g npm@5

###
### Install our initial set of packages by temporarily pulling in the current state of the project.
###

## Guarantee the environment is dev, not prod.
#RUN npm config set -g production false
## Temporarily copy over a snapshot of the code.
#COPY * /usr/local/pp-pigpen-snapshot/
## Remove local node module cache.
#RUN rm -rf /usr/local/pp-pigpen-snapshot/node_modules
## Install all modules globally. “Globally” is a misnomer here, in that they install in-place, then get
## symlinks in /usr/local/lib to here, for some weird reason.
#RUN cd /usr/local/pp-pigpen-snapshot ; npm install -g
## Force-install dev, because that doesn't seem to install correctly, despite being not-prod?
#RUN cd /usr/local/pp-pigpen-snapshot ; npm install -g --only=dev

# Install Angular CLI.
RUN npm install -g @angular/cli
RUN npm link @angular/cli

# Define mount point for project from host. We'll map the live code folder to this at runtime.
VOLUME /pp-pigpen
# Define home directory.
WORKDIR /pp-pigpen
# Define web server port
EXPOSE 4200
