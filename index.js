#!/usr/bin/env node

const { description, version } = require('./package.json')
const sade = require('sade')

sade('bookmarkdownlet', true)
	.version(version)
	.describe(description)
	.option('--output, -o', 'The path to write the extracted Markdown files.')
	.option('--port, -p', 'The port to use when clicking the browser bookmarklet. [Default: 53074]')
	.option('--transform, -t', 'Optional path to a JavaScript file used to modify final output.')
	.action(async ({ output, port, transform }) => {
		console.log('--------', output, port, transform)
	})
	.parse(process.argv)
