const method = require('../method');
const client = require('../client');

module.exports = method(__filename, async (req) => {
	const pt = await client(req);
	const [ from, to, page, size ] = req.body.params;

	return pt.list(
		from || new Date(Date.now() - 86400000 * 7), // from date
		to || new Date(), // to date
		page || 1, // page number
		size || 100 // Items per page
	);
});
