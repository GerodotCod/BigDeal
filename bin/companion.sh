#!/usr/bin/env bash

if [ -f .env ]; then
  nodemon --watch packages/@BigDeal/companion/src --exec node -r dotenv/config ./packages/@BigDeal/companion/src/standalone/start-server.js
else
  env \
    COMPANION_DATADIR="./output" \
    COMPANION_DOMAIN="localhost:8080" \
    COMPANION_PROTOCOL="http" \
    COMPANION_PORT=8080 \
    COMPANION_CLIENT_ORIGINS="" \
    COMPANION_SECRET="dev" \
    COMPANION_PREAUTH_SECRET="dev" \
    COMPANION_ALLOW_LOCAL_URLS="true" \
    nodemon --watch packages/@BigDeal/companion/src --exec node ./packages/@BigDeal/companion/src/standalone/start-server.js
fi

