FROM debian:13
RUN apt update && apt install --no-install-recommends --yes nodejs npm
RUN npm i -g bun
RUN mkdir /app
WORKDIR /app
