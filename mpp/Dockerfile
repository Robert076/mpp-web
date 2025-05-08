FROM node:18

WORKDIR /src

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]
