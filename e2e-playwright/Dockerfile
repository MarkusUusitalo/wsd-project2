FROM mcr.microsoft.com/playwright:v1.40.1-focal

COPY . /e2e-playwright

WORKDIR /e2e-playwright

RUN npm install

CMD [ "run", "--allow-env", "--allow-net", "--allow-read", "--watch", "--unstable", "app.js" ]