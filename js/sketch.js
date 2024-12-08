function importJSONData (url) {
	return new Promise(async (req, rej) => {
		try {
			const response = await fetch(url);

			if (!response.ok) throw new Error('Failed to fetch url: ' + url);

			const data = await response.json();
			req(data);
		} catch (error) {
			console.error(error);
			rej();
		}
	});
}
