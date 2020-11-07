const authedMethods = [
	'POST',
	'PUT'
]

module.exports = secret => {
	const isAuthed = req => req.headers.authorization === `Basic ${secret}`

	return (req, res, next) => {
		if (authedMethods.includes(req.method) && !isAuthed(req)) {
			res.writeHead(401, {
				'content-type': 'application/json'
			})
			res.end(JSON.stringify({
				errors: [
					{ title: 'Your request could not be authorized.' }
				]
			}))
		} else {
			next()
		}
	}
}
