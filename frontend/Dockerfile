FROM node:22.12.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start", "--", "--port", "3000", "--host", "0.0.0.0"]
