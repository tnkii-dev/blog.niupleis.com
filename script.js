function show(t) { document.getElementsByClassName(t)[0].classList.toggle('show') }

function loadContent(lang) {
	setupLang(lang);
	
	blog = document.getElementsByTagName('main')[0];
	blog.innerHTML = "";

	fetch(`log/${lang}.json`)
	.then(response => {
		return response.json()
	})
	.then(data => {
		data.forEach((log, i) => {
			const div = document.createElement('div');
			div.className = log.type;

			if (log.f) div.classList.toggle("primer");

			switch (log.type) {
			case 'timestamp':
				div.innerHTML = getDate(lang, log.t);
				isFirst = true;
				break;
			case 'message':
				div.innerHTML = `<p>${log.content}</p><i><span>${getTime(log.t)}</span></i>`;
				break;
			case 'action':
				div.innerHTML = `<p>${log.content}</p><i><span>${getTime(log.t)}</span></i>`;
				break;
			case 'image':
				div.innerHTML = `<img src="${log.content}"><i><span>${getTime(log.t)}</span></i>`;
				break;
			case 'audio':
				div.innerHTML = `<audio controls src="${log.content}"></audio><i><span>${getTime(log.t)}</span></i>`;
				break;
			case 'video':
				div.innerHTML = `<video controls src="${log.content}"></video><i><span>${getTime(log.t)}</span></i>`;
				break;
			case 'iframe':
				div.innerHTML = `${log.content}<i><span>${getTime(log.t)}</span></i>`;
				break;
			case 'deleted':
				div.innerHTML = `<p>DELETED</p>`;
				break;
			default:
				div.innerHTML = `<p>${log.content}</p><i><span>${getTime(log.t)}</span></i>`;
				break;
			}

		//setTimeout(() => {
			blog.appendChild(div);
		//}, 10 * i)
		})
	})
}

let meses;
function setupLang(lang) {
	if (lang === "en") {
		meses = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	} else if (lang === "es") {
		meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	}
}

function getTime(time) {
	var h = (time.charAt(6) + time.charAt(7))
	var n = (time.charAt(8) + time.charAt(9))

	return `${h}:${n}`
}

function getDate(lang, time) {
	var y = (time.charAt(0) + time.charAt(1))
	var m = (time.charAt(2) + time.charAt(3))
	var d = (time.charAt(4) + time.charAt(5))
	
	switch (lang) {
	case "es":
		return `${d} de ${meses[Number(m)]} de 20${y}`;
	case "en":
		return `${d} ${meses[Number(m)]}, 20${y}`;
	case "ko":
		return `20${y}년 ${m}월 ${d}일`;
	case "ja":
		return `20${y}年${m}月${d}日`;
	case "zh":
		return `20${y}年${m}月${d}日`;
	}
}

document.addEventListener("DOMContentLoaded", function () {
	let videos = document.querySelectorAll("video[data-src]");

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				let video = entry.target;
				video.src = video.dataset.src;
				observer.unobserve(video);
			}
		});
	});

	videos.forEach(video => observer.observe(video));
	
	let iframes = document.querySelectorAll("iframe[data-src]");

	let observer_i = new IntersectionObserver((entries, observer_i) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				let iframe = entry.target;
				iframe.src = iframe.dataset.src;
				observer_i.unobserve(iframe);
			}
		});
	});

	iframes.forEach(iframe => observer_i.observe(iframe));
});