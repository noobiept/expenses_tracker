FROM node:14-alpine
WORKDIR /home
COPY . .
RUN npm install --production
CMD ["npm", "run", "docker:start"]
