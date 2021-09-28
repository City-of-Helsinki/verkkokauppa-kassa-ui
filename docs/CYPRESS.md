we have disabled cypress to install binary when using docker
so you need to run cypress locally with normal yarn install call or change
`RUN CYPRESS_INSTALL_BINARY=0 yarn install` to `RUN yarn install`
https://docs.cypress.io/guides/getting-started/installing-cypress#Skipping-installation
