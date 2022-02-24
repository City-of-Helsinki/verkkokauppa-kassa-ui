FROM registry.access.redhat.com/ubi8/nodejs-14 as base

# Install yarn
RUN npm install -g yarn
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
# Copy project files into the docker image
COPY --chown=1001:0 . .

RUN CYPRESS_INSTALL_BINARY=0 yarn install
RUN yarn build-cra

FROM registry.access.redhat.com/ubi8/nginx-118 as production

COPY --from=base /${APP_ROOT}/src/dist .
COPY ./config/nginx.conf "${NGINX_CONF_PATH}"

CMD /usr/libexec/s2i/run
