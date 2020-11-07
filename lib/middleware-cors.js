module.exports = (req, res, next) => {
	res.setHeader('access-control-allow-origin', '*')
	res.setHeader('access-control-allow-headers', 'authorization, content-type')
	next()
}
