FROM node:14.21.3 AS angular-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

FROM nginx:latest
COPY --from=angular-build /app/dist/planning-project /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
