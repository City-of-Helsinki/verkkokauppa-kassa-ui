FROM registry.access.redhat.com/ubi8/nodejs-14 as base

# Install yarn
RUN npm install -g yarn

# Copy project files into the docker image
COPY . .

# Chown to correct user
USER 0
RUN chown -R 1001:0 ${APP_ROOT} && chmod -R 775 ${APP_ROOT} && \
    rpm-file-permissions
USER 1001

RUN yarn
EXPOSE 3000
CMD yarn start
