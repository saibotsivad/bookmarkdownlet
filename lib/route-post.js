const { join } = require('path')
const { writeFileSync } = require('fs')

const DEFAULT_TRANSFORM = './transform.js'

module.exports = ({ output, transform }) => {
	const transformer = require(transform || DEFAULT_TRANSFORM)

	return async (req, res) => {
		const { markdown, filename } = transformer(req.body)

		const filepath = join(output, filename)

		console.log('writing file', filepath)

		writeFileSync(filepath, markdown, 'utf8')

		res.setHeader('content-type', 'application/json')
		res.end(JSON.stringify(filepath))
	}
}
