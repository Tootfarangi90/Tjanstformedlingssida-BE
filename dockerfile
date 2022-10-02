FROM node:16.14.0
ENV NODE_ENV=development
WORKDIR /app
COPY ["package.json","package-lock.json*","./"]
RUN npm install 
COPY . . 
CMD [ "dev" ]