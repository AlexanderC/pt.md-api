const dotenv = require('dotenv');
const express = require('express');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const jsonrpc = require('jsonrpc2-express');
const authorizer = require('./authorizer');
const RPC = require('./rpc');
const debug = require('./helper/debug')(__filename);
const { mask } = require('./helper/string');

dotenv.config();
const app = express();

let routerRpc = express.Router();
debug('Loading RPC methods', Object.keys(RPC));
jsonrpc('/', routerRpc, {
  methods: RPC,
  bodyParser: {
    limit: process.env.BODY_SIZE_LIMIT,
  },
});

app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: [ process.env.TOKEN_PATH ] }));
app.use((error, req, res, next) => {
  debug('Error', error);

  if (error.name === 'UnauthorizedError') {
    res.status(401).send(JSON.stringify({ error: 'UNAUTHORIZED' }));
  } else {
    res.status(500).send(JSON.stringify({ error: 'SERVER_ERROR' }));
  }
});

debug('Mounting RPC on', process.env.MOUNT_POINT);
app.use(process.env.MOUNT_POINT, routerRpc);

debug('Mounting JWT on', process.env.TOKEN_PATH, 'with secret', `${ mask(process.env.JWT_SECRET) }`);
app.post(process.env.TOKEN_PATH, bodyParser.json({ limit: process.env.BODY_SIZE_LIMIT }), authorizer);

debug(
  'Starting RPC server on port',
  process.env.PORT,
  `{ bodyParser.limit=${ process.env.BODY_SIZE_LIMIT } }`
);
app.listen(process.env.PORT, () => {
  console.info(`Server listening on port ${ process.env.PORT }`);
});
