const { readFileSync } = require('fs')
const { join } = require('path')
const polka = require('polka')

const generateBookmarklet = ({ port, secret }) => {
	return readFileSync(join(__dirname, 'bookmarklet.js'), 'utf8')
		.replace('$$SECRET$$', secret)
		.replace('$$PORT$$', port)
		.replace(/[\t\n]/g, '')
}

const cors = (req, res, next) => {
	res.setHeader('access-control-allow-origin', '*')
	res.setHeader('access-control-allow-headers', 'authorization')
	next()
}

const auth = secret => (req, res, next) => {
	if ([ 'POST', 'PUT' ].includes(req.method) && req.headers.authorization !== `Basic ${secret}`) {
		res.writeHead(401, {
			'content-type': 'application/json',
		})
		res.end(JSON.stringify({ errors: [ { title: 'Your request could not be authorized.' } ] }))
	} else {
		next()
	}
}

const nothing = (req, res) => { res.end() }

module.exports = ({ secret, port, transform }) => {
	polka()
		.use(cors)
		.use(auth(secret))
		.options('/', nothing)
		.post('/', (req, res) => {
			// const {
			// 	markdown,
			// 	url,
			// 	reader: {
			// 		title,
			// 		byline,
			// 		dir,
			// 		content,
			// 		length,
			// 		excerpt,
			// 		siteName
			// 	}
			// } = JSON.parse(data)
			console.log('POST', req.body)
			res.setHeader('content-type', 'application/json')
			res.end(JSON.stringify('id00001'))
		})
		.get('/:id', (req, res) => {
			res.end(`ID: ${req.params.id}`)
		})
		.listen(port, error => {
			if (error) throw error
			console.log(`Server running at http://127.0.0.1:${port}/`)
			console.log('If you have not done so already, create a bookmark in your browser with this text:\n')
			console.log('javascript:' + generateBookmarklet({ port, secret }))
			console.log('\n')
		})
}
