(function () {
	const infoContainer = document.getElementById('info-container');
	const profileIcon = document.getElementById('profile-icon');
	const motel = document.getElementById('info-container-motel');

	profileIcon.addEventListener('click', () => {
		if (infoContainer.classList.contains('hide')) {
			infoContainer.classList.remove('hide');
			motel.classList.remove('hide');
		} else {
			infoContainer.classList.add('hide');
			motel.classList.add('hide');
		}
	});

	motel.addEventListener('click', () => {
		infoContainer.classList.add('hide');
		motel.classList.add('hide');
	});
})();
