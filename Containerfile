FROM node:22-trixie-slim
RUN npm i -g bun
RUN mkdir /app
WORKDIR /app
