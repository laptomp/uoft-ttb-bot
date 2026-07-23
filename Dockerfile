FROM node:24 AS build

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci --include=dev

COPY src ./src

RUN npm run build

FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/build ./build
COPY assets ./assets

CMD ["node", "build/index.js"]