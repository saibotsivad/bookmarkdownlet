const { json } = require('@polka/parse')
const generateBookmarklet = require('./generate-bookmarklet.js')
const middlewareAuth = require('./middleware-auth.js')
const middlewareCors = require('./middleware-cors.js')
const polka = require('polka')
const routePost = require('./route-post.js')

module.exports = ({ output, secret, port, transform }) => {
	polka()
		.use(middlewareCors)
		.use(middlewareAuth(secret))
		.use(json())
		.options('/', (req, res) => { res.end() })
		.post('/', routePost({ output, transform }))
		.listen(port, error => {
			if (error) throw error
			console.log(`Server running at http://127.0.0.1:${port}/`)
			console.log('If you have not done so already, create a bookmark in your browser with this text:\n')
			console.log('javascript:' + generateBookmarklet({ port, secret }))
			console.log('\n')
		})
}
