Promise.all([
	import('https://unpkg.com/turndown@6.0.0?module'),
	import('https://unpkg.com/@tehshrike/readability@0.2.0'),
]).then(async ([{ default: Turndown }, { default: Readability }]) => {
	const port = '$$PORT$$';
	const { content, textContent, ...reader } = new Readability(document.cloneNode(true))
		.parse();
	const td = new Turndown({
		headingStyle: 'atx',
		hr: '---',
		bulletListMarker: '-',
		codeBlockStyle: 'fenced',
		emDelimiter: '__'
	});
	const result = await fetch(`http://127.0.0.1:${port}`, {
		method: 'POST',
		body: JSON.stringify({
			markdown: td.turndown(content),
			reader,
			url: document.URL
		}),
		headers: {
			authorization: 'Basic $$SECRET$$'
		}
	});
	window.location = `http://127.0.0.1:${port}/${await result.json()}`
})