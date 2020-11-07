const { uid } = require('uid')
const sluggish = require('sluggish')
const tinydate = require('tinydate')
const Turndown = require('turndown')

const td = new Turndown({
	headingStyle: 'atx',
	hr: '---',
	bulletListMarker: '-',
	codeBlockStyle: 'fenced',
	emDelimiter: '__'
})

const formatDate = tinydate('{YYYY}-{MM}-{DD}')

const generateFilename = title => formatDate(new Date())
	+ '-'
	+ sluggish(title)
	+ '-'
	+ uid(6)
	+ '.md'

const clean = thing => thing
	.toString()
	.replace(/\n/g, ' ')
	.replace(/[\s]+/g, ' ')
	.trim()

const generateFrontmatter = map => Object
	.keys(map)
	.filter(key => map[key] && map[key].toString().trim())
	.map(key => `${key}: ${clean(map[key])}`)
	.join('\n')

module.exports = ({
	reader: {
		title,
		byline: author,
		content,
		excerpt,
		siteName: site
	},
	url
}) => ({
	filename: generateFilename(title),
	markdown: [
		'---',
		generateFrontmatter({ title, author, url, site, excerpt }),
		'---'
	].join('\n') + '\n\n' + td.turndown(content).trim()
})
