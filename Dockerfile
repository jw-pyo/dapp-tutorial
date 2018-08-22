FROM node:8
WORKDIR /app
COPY . /app
RUN npm install
CMD npm run dev
EXPOSE 8080/tcp 
