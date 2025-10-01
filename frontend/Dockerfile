FROM node:22.12.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["npm", "start", "--", "--port", "4200", "--host", "0.0.0.0"]
