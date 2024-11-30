(function () {
	const navBtns = document.getElementById('nav-container').querySelectorAll('.nav-item');
	const sections = document.querySelectorAll('section');
	let curActiveBtn = 0;

	navBtns.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			if (curActiveBtn == index) return;

			navBtns[curActiveBtn].classList.remove('active');
			sections[curActiveBtn].classList.add('hide');
			curActiveBtn = index;
			navBtns[curActiveBtn].classList.add('active');
			sections[curActiveBtn].classList.remove('hide');
		});
	});
})();
