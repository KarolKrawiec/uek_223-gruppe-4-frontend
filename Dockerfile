FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json .
COPY .env.production .
COPY ./public ./public
COPY ./src ./src

RUN yarn install --production
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY .env.production .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]