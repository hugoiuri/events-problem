FROM node:10.15.3-alpine as builder
WORKDIR /opt/events-problem
COPY . /opt/events-problem
RUN npm i --production

FROM node:10.15.3-alpine  
RUN apk --no-cache add ca-certificates
WORKDIR /opt/events-problem
COPY --from=builder /opt/events-problem .
ENTRYPOINT ["node", "./src/index.js"]