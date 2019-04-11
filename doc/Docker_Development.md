# Docker Development

(placeholder doc)

## Theory of Operation

The Docker container gives a standalone runtime development environment, regardless of host OS. (Caveat: I've only tested this on under macOS.) Anything that would need to be installed globally — namely Node and npm — live inside the container, so as not to pollute your host OS. The webapp and its local dependencies live outside the container, bridged in to the Node runtimes. The Angular network port is also bridged across.

- The container is running a pared down version of the latest Ubuntu LTS.
- Node and NPM live inside the container. They're pinned to the appropriate versions.
- The webapp lives outside the container, mounted into it.
- All node modules are installed locally in the webapp, and therefore persist/cache in the `node_modules` folder outside the container. They're not blown away when the ephemeral container stops.

## Check Out the Code

- Obtain the project by cloning the github repo.
- If you were previously doing things in your local copy of the repository, ensure you don't have local cached node_modules from a previous run: `rm -rf node_modules; mkdir node_modules`

## Build the Development Environment

```
docker build -t pp-pigpen-dev .
```

This gives you a minimal Ubuntu, build tools, nodejs, and npm.

## Use the Development Environment

Interactive, with a Bash prompt:

```
docker run --rm --network=host -p 4200:4200 -v `pwd`:/pp-pigpen -it pp-pigpen-dev /bin/bash
```

This mounts the current directory (your local clone of `pp-pigpen`) to the folder `/pp-pigpen` inside the container. Any modifications you make in the host OS will be seen within the running container. Any modifications you make inside the running container will modify the files in the host OS.

At this point, you should run `npm install` to install all of the required packages. These will install in your clone of `pp-pigpen/node_modules`. Take note that if the architecture of your host operating system is different from what's running in Docker (Mac, Windows), then these modules may not work for you if used outside of the Docker container.

Next run `ng serve --host 0.0.0.0` to start the Angular server.

