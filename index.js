#!/usr/bin/env node

const { description, version } = require('./package.json')
const { randomBytes } = require('crypto')
const sade = require('sade')
const server = require('./server.js')

const DEFAULT_PORT = 53074

const generateSecret = () => randomBytes(32)
	.toString('base64')
	.replace(/[+=/]/g, '')

sade('bookmarkdownlet', true)
	.version(version)
	.describe(description)
	.option('--output, -o', 'The path to write the extracted Markdown files.')
	.option('--port, -p', `The port to use when clicking the browser bookmarklet. [Default: ${DEFAULT_PORT}]`)
	.option('--secret, -s', 'Secret code required to authenticate your bookmarklet. [Default: printed at startup]')
	.option('--transform, -t', 'Optional path to a JavaScript file used to modify final output.')
	.action(async ({ output, port, secret, transform }) => {
		port = port || DEFAULT_PORT
		secret = secret || generateSecret()
		server({ port, secret, transform })
	})
	.parse(process.argv)
