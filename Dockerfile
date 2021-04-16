FROM node:15.14.0 AS base

ENV LANG C.UTF-8

WORKDIR /usr/app

###############################################################################

FROM base AS dependencies

COPY package*.json ./

RUN npm set progress=false && npm config set depth 0 && npm ci

###############################################################################

FROM base AS release

COPY --from=dependencies /usr/app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
