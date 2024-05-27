FROM node:20-alpine
RUN npm install -g pnpm
WORKDIR /usr/server/app

COPY ./package.json ./
RUN pnpm install
COPY ./ .
RUN pnpm build # will build remix app
ENV NODE_ENV=production

CMD ["pnpm" ,"start"]