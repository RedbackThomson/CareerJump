FROM node:8.11-alpine

WORKDIR /usr/app

RUN apk add --update --no-cache \
    curl \
    python \
    make \ 
    g++ \
    openssl \
    ca-certificates \
  && rm -rf /var/cache/apk/*

RUN update-ca-certificates

COPY package.json .
RUN npm install --quiet

RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/raphaelahrens/wait-for-it/afd3a1f8014df5d222b64ad74012cd2b781a24d2/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

RUN sed -i '58s/timeout /timeout -t /' /usr/local/bin/wait-for-it.sh
RUN sed -i '60s/timeout /timeout -t /' /usr/local/bin/wait-for-it.sh

COPY . .