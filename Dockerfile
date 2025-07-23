    FROM node:18-alpine

    WORKDIR /app

    COPY package*.json ./

    RUN npm install --production

    COPY . .

    EXPOSE 4000

    # Start the server
    CMD ["node", "server.js"]


    #docker buildx build --platform linux/amd64 --no-cache -t cr-backend:v2  .
    #docker save -o cr-backend.tar cr-backend:v2
    #scp cr-backend.tar target_machine
    #docker load -i cr-backend.tar
    #docker-compose stop cr_backend
    #docker-compose up --build -d cr_backend

    #docker-compose stop cr_backend && docker-compose rm -f cr_backend && docker-compose up --build -d cr_backend