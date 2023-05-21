# build stage
FROM node:20-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production build stage
FROM node:20-slim as production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/assets ./assets
EXPOSE 8080
VOLUME /static
CMD ["npm", "start"]