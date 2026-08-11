#!/bin/sh

tag='quip-mindshare'

inContainer() {
    podman run --rm -v ./:/app -p 8888:8888 -i -t $tag "$@"
}

inContainerWithoutPorts() {
    podman run --rm -v ./:/app -i $tag "$@"
}

case $1 in
    test) shift 1 ; inContainerWithoutPorts bun run test "$@" ;;
    build) podman build -t $tag -f Containerfile . ;;
    npm) shift 1 ; inContainer npm "$@" ;;
    bun) shift 1 ; inContainer bun "$@" ;;
esac
