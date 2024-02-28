FROM node:14-alpine As development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.24.0-alpine AS production
COPY --from=development /usr/src/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=development /usr/src/app/dist/ /usr/share/nginx/html

EXPOSE 80