#!/bin/sh

tag='quip-mindshare'

inContainer() {
    podman run -v ./:/app -p 8888:8888 -i -t $tag "$@"
}

case $1 in
    build) podman build -t $tag -f Containerfile . ;;
    npm) shift 1 ; inContainer npm "$@" ;;
    bun) shift 1 ; inContainer bun "$@" ;;
esac
