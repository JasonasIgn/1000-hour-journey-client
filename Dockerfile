FROM node:19.0.1-alpine AS builder
ENV NODE_ENV production
ARG REACT_APP_API_BASE
ENV REACT_APP_API_BASE $REACT_APP_API_BASE
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY . .
RUN yarn build

FROM nginx:1.23.2-alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
