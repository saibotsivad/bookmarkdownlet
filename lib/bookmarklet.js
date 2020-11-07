import('https://unpkg.com/@tehshrike/readability@0.2.0')
	.then(async ({ default: Readability }) => {
		const port = '$$PORT$$';
		const { textContent, ...reader } = new Readability(document.cloneNode(true))
			.parse();
		const result = await fetch(`http://127.0.0.1:${port}`, {
			method: 'POST',
			body: JSON.stringify({
				reader,
				url: document.URL
			}),
			headers: {
				authorization: 'Basic $$SECRET$$',
				'content-type': 'application/json'
			}
		});
		window.location = `http://127.0.0.1:${port}/${await result.json()}`
	})
