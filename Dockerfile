FROM node

WORKDIR ./app

COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .

RUN ng build --prod

FROM nginx:alpine
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
