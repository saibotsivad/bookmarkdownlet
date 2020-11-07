const { readFileSync } = require('fs')
const { join } = require('path')

const bookmarklet = readFileSync(join(__dirname, 'bookmarklet.js'), 'utf8')

module.exports = ({ port, secret }) => bookmarklet
	.replace('$$SECRET$$', secret)
	.replace('$$PORT$$', port)
	.replace(/[\t\n]/g, '')
