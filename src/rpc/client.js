const Pt = require('pt.md');

module.exports = async (req) => {
  const { username, password } = req.user || {};
  const pt = Pt.create();

  await pt.authenticate(username, password);

  return pt;
};
