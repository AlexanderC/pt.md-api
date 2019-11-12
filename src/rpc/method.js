const path = require('path');
const dbg = require('../helper/debug');
const { mask } = require('../helper/string');

module.exports = (fname, functor) => {
  const debug = dbg(fname);

  return (...args) => {
    debug(
      'Call RPC method',
      path.basename(fname, '.js'),
      `(username=${ mask(args[0].user.username) },password=${ mask(args[0].user.password) })`,
      `params=${ JSON.stringify(args[0].body.params) }`,
    );

    return functor(...args);
  };
};
