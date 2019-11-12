const method = require('../method');
const client = require('../client');

module.exports = method(__filename, async (req) => {
	const pt = await client(req);
	const [ id ] = req.body.params;

	return pt.paymentPage(id);
});
