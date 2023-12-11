FROM node:20-alpine3.18

WORKDIR /frontend_react4osfac

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start", "--", "--host"]