FROM node:18-alpine3.16

WORKDIR /app

ENV INDOCKER=true
ENV PORT=3000
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]