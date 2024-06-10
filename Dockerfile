#node repo
FROM node:alpine 
#working directory
WORKDIR /src
#Copy package.json and package-lok.json to working dir
COPY package*.json .
#Install dependencies
RUN npm ci
#Copy all code to src (Note: We have put Dockerfile and node modules in .dockerignore)
COPY . .
#Port to run app
EXPOSE 3000
#We have pointed to "server-start" script in package.json
#We can directly give "CMD [ "npm", "server.js" ]" to run server file directly
CMD [ "npm", "run", "server-start" ]