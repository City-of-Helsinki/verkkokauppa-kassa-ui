FROM registry.access.redhat.com/ubi8/nodejs-14 as base

# Install yarn
RUN npm install -g yarn
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
# Copy project files into the docker image
COPY --chown=1001:0 . .

RUN yarn cache clean
RUN yarn install --network-timeout 1000000
RUN yarn build-cra

FROM registry.access.redhat.com/ubi8/nginx-118 as production

COPY --from=base /${APP_ROOT}/src/dist .
COPY ./config/nginx.conf "${NGINX_CONF_PATH}"

CMD nginx -g "daemon off;"