FROM node:18
WORKDIR /app
COPY . /app
RUN npm install
# RUN npm run prepare
EXPOSE 3000
CMD ["node",".output/server/index.mjs"]
# CMD ["npm", "run","dev"]