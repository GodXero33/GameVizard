// Header Carousel
(function () {
	const headerCarouselContainer = document.getElementById('header-carousel').querySelector('.carousel');
	const headerCarouselItems = [];
	let currentViewHeaderCarousel = 0;

	function updateHeaderCarousel (prevHeaderCarousel) {
		headerCarouselItems[prevHeaderCarousel].element.classList.add('hide');
		headerCarouselItems[currentViewHeaderCarousel].element.classList.remove('hide');
	}

	function nextHeaderCarousel () {
		let prevHeaderCarousel = currentViewHeaderCarousel;
		currentViewHeaderCarousel++;

		if (currentViewHeaderCarousel == headerCarouselItems.length) currentViewHeaderCarousel = 0;

		updateHeaderCarousel(prevHeaderCarousel);
	}

	function prevHeaderCarousel () {
		let prevHeaderCarousel = currentViewHeaderCarousel;
		currentViewHeaderCarousel--;

		if (currentViewHeaderCarousel == -1) currentViewHeaderCarousel = headerCarouselItems.length - 1;

		updateHeaderCarousel(prevHeaderCarousel);
	}

	function startHeaderCarouselAnimation () {
		setInterval(nextHeaderCarousel, 5000);
	}

	function buildHeaderCarousel (data) {
		data.forEach((entry, index) => {
			const item = document.createElement('div');
			const title = document.createElement('h1');

			item.classList.add('carousel-item');
			item.style.backgroundImage = `url(${entry.img})`;

			title.textContent = entry.text;

			item.appendChild(title);
			headerCarouselContainer.appendChild(item);
			headerCarouselItems.push({ element: item, link: entry.link });

			if (index != 0) item.classList.add('hide');
		});

		startHeaderCarouselAnimation();
	}

	async function loadHeaderCarouselData () {
		try {
			const data = await importJSONData('res/data/user/header-carousel.json');
			buildHeaderCarousel(data);
		} catch (error) {
			console.error(error);
		}
	}

	loadHeaderCarouselData();

	document.getElementById('header-carousel').querySelector('.cover').addEventListener('click', () => {
		window.open(headerCarouselItems[currentViewHeaderCarousel].link);
	});

	document.getElementById('header-carousel').querySelectorAll('.navigator').forEach((btn, index) => {
		btn.addEventListener('click', () => {
			if (index == 0) {
				prevHeaderCarousel();
			} else {
				nextHeaderCarousel();
			}
		});
	});
})();


// Gameplay Frequent Canvas
(function (exports) {
	const ctx = document.getElementById('gameplay-frequent-canvas');
	const chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: [],
			datasets: [{
				label: 'activeness (hours / week)',
				data: [],
				fill: false,
				borderColor: '#ac11db',
				tension: 0.1
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	});

	async function loadActivenessData () {
		try {
			const data = await importJSONData('res/data/user/activeness-data.json');
		
			data.forEach(entry => {
				chart.data.labels.push(entry.game);

				chart.data.datasets.forEach((dataset) => {
					dataset.data.push(entry.active);
				});

				chart.update();
			});
		} catch (error) {
			console.error(error);
		}
	}

	function init () {
		loadActivenessData();
	}

	exports.init = init;
})(GameplayFrequentCanvas = {});



// User Recomend Games
(function () {
	async function loadNewGames () {
		const container = document.getElementById('user-recomend-games-container');
		
		try {
			const data = await importJSONData('res/data/user/new-games.json');

			data.forEach(entry => {
				const card = document.createElement('div');
				const h1 = document.createElement('h1');
				const p1 = document.createElement('p');
				const p2 = document.createElement('p');
				const cover = document.createElement('div');

				card.classList.add('card');
				h1.textContent = entry.name;
				p1.textContent = entry.category;
				p2.textContent = entry.publisher;
				cover.style.backgroundImage = `url(${entry.img})`;

				card.appendChild(h1);
				card.appendChild(p1);
				card.appendChild(p2);
				card.appendChild(cover);
				container.appendChild(card);

				card.addEventListener('click', () => {
					window.open(entry.url);
				});
			});
		} catch (error) {
			console.error(error);
		}
	}

	loadNewGames();
})();


// User Rewords
(function () {
	const ctx = document.getElementById('user-revords-canvas');
	const chart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: [],
			datasets: [{
				label: 'rewords',
				data: [],
				fill: false,
				backgroundColor: [],
				tension: 0.1
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true
		}
	});
	let curGameIndex = 0;
	const btns = [];
	const rewords = [];

	function updateChart () {
		chart.data.labels.length = 0;
		
		chart.data.datasets.forEach((dataset) => {
			dataset.data.length = 0;
			dataset.backgroundColor.length = 0;
		});

		const color = '#' + Math.floor(Math.random() * (256 ** 3)).toString(16);

		rewords[curGameIndex].forEach(entry => {
			chart.data.labels.push(entry.label);

			chart.data.datasets.forEach((dataset) => {
				dataset.backgroundColor.push(color);
				dataset.data.push(entry.count);
			});

			chart.update();
		});
	}

	function buildRewordsData (data) {
		const container = document.getElementById('user-rewords-select');

		data.forEach((entry, index) => {
			const btn = document.createElement('div');
			btn.textContent = entry.game;

			if (index == 0) btn.classList.add('active');

			container.appendChild(btn);
			btns.push(btn);
			rewords.push(entry.rewords);

			btn.addEventListener('click', () => {
				if (index == curGameIndex) return;

				btns[curGameIndex].classList.remove('active');
				curGameIndex = index;
				btns[curGameIndex].classList.add('active');
				updateChart();
			});
		});

		updateChart();
	}

	async function loadUserReowrdsData () {
		try {
			const data = await importJSONData('res/data/user/user-rewords.json');
			buildRewordsData(data);
		} catch (error) {
			console.error(error);
		}
	}

	loadUserReowrdsData();
})();
