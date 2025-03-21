function classToggle(id, name) {
	document.getElementById(id).classList.toggle(name);
}
function ts(nombreParametro, valorParametro) {
	const urlActual = window.location.href;
	const urlBase = urlActual.split('?')[0];
	const queryString = urlActual.split('?')[1] || '';
	const params = new URLSearchParams(queryString);
	params.set(nombreParametro, valorParametro);
	const nuevaUrl = `${urlBase}?${params.toString()}`;
	window.location.href = nuevaUrl;
}

function selectScreen(screen) {
	document.body.style = "";
	const main = document.getElementById("m");
	m.style = "";

	const screenSelector = document.getElementById("screen-selector");
	const liveLog = document.getElementById("live-log");
	const posts = document.getElementById("blog-posts");
	const articles = document.getElementById("articles");
	
	screenSelector.querySelectorAll('*').forEach((child, i) => {
		child.classList.remove(...child.classList); 
		child.setAttribute("onclick", `selectScreen(${i + 1})`)
	});
	screenSelector.children[screen - 1].classList.toggle("current-screen")

	if (screen === 1) {
		if (articles.classList.contains("grid")) {
			articles.classList.toggle("grid")
		}
		if (posts.classList.contains("flx")) {
			posts.classList.toggle("flx")
		}

		if (liveLog.classList.contains("flex")) {
			screenSelector.children[screen - 1].setAttribute("onclick", `selectScreen(${screen})`)
		} else {
			screenSelector.children[screen - 1].setAttribute("onclick", "")
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		}

		liveLog.classList.toggle("flex")
		loadLiveLog()
	} else if (screen === 2) {
		m.style = "justify-items: center;";

		if (liveLog.classList.contains("flex")) {
			liveLog.classList.toggle("flex")
		}
		if (articles.classList.contains("grid")) {
			articles.classList.toggle("grid")
		}

		if (posts.classList.contains("flx")) {
			screenSelector.children[screen - 1].setAttribute("onclick", `selectScreen(${screen})`)
		} else {
			screenSelector.children[screen - 1].setAttribute("onclick", "")
		}

		posts.classList.toggle("flx")
		loadPosts()
	} else if (screen === 3) {
		if (liveLog.classList.contains("flex")) {
			liveLog.classList.toggle("flex")
		}
		if (posts.classList.contains("flx")) {
			posts.classList.toggle("flx")
		}

		if (articles.classList.contains("grid")) {
			screenSelector.children[screen - 1].setAttribute("onclick", `selectScreen(${screen})`)
		} else {
			screenSelector.children[screen - 1].setAttribute("onclick", "")
		}

		articles.classList.toggle("grid");
		loadArticles();
	}
}

function loadArticles() { // {"image" : ".jpg", "title" : "", "href" : "250109_"},
	const articles = document.getElementById("articles");
	articles.textContent = "";

	fetch("content/articles.json")
	.then(response => response.json())
	.then(data => {
		data.forEach((item, i) => {
			setTimeout(() => {
		var article = document.createElement("a");
		article.href = `articles/${item.href}.html`;
		article.innerHTML = `<img src="${item.image}"><span>${item.title}</span>`
				
		articles.appendChild(article);
			}, 10 * i)
		})
	})
}

function loadLiveLog() { // {"type" : "message", "t" : "2501090259", "content" : "Hola!"},
	let meses;
	if (lang === "en") {
		meses = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	} else {
		meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	}

	const liveLog = document.getElementById("live-log");
	liveLog.textContent = "";

	let vn = 0;

	fetch(`content/${lang}_live.json`)
	.then(response => response.json())
	.then(data => {
		data.forEach((item, i) => {
			setTimeout(() => {
		var log = document.createElement("div");
		
		var y = (item.t.charAt(0) + item.t.charAt(1))
		var m = (item.t.charAt(2) + item.t.charAt(3))
		var d = (item.t.charAt(4) + item.t.charAt(5))
		var h = (item.t.charAt(6) + item.t.charAt(7))
		var n = (item.t.charAt(8) + item.t.charAt(9))

		let timestamp;
		let day_date;

		switch (lang) {
			case "es":
				timestamp = `<small class="${lang}" title="Este mensaje fué publicado el ${d} de ${meses[Number(m)]} de 20${y} a las ${h}:${n}">${y+m+d} ${h}:${n}</small>`;
				day_date = `${d} de ${meses[Number(m)]} de 20${y}`
				break;
			case "en":
				timestamp = `<small class="${lang}" title="This message was published on ${d} ${meses[Number(m)]}, 20${y} at ${h}:${n}">${y+m+d} ${h}:${n}</small>`;
				day_date = `${d} ${meses[Number(m)]}, 20${y}`
				break;
			case "kr":
				timestamp = `<small class="${lang}" title="이 메시지는 20${y}년 ${m}월 ${d}일 ${h}시 ${n}분에 게시되었습니다">${y+m+d} ${h}:${n}</small>`;
				day_date = `20${y}년 ${m}월 ${d}일`
				break;
			case "jp":
				timestamp = `<small class="${lang}" title="このメッセージは20${y}年${m}月${d}日 ${h}時${n}分に公開されました">${y+m+d} ${h}:${n}</small>`;
				day_date = `20${y}年${m}月${d}日`
				break;
			case "cn":
				timestamp = `<small class="${lang}" title="此消息发布于20${y}年${m}月${d}日 ${h}:${n}">${y+m+d} ${h}:${n}</small>`;
				day_date = `20${y}年${m}月${d}日`
				break;
		}

		switch (item.type) {
			case ("timestamp"):
				log.classList = "live-timestamp"
				log.innerHTML = `${day_date}`
				break;
			case ("message"):
				log.classList = "live-message log-bottom"
				log.innerHTML = `<span class="${lang}">${item.content}</span>${timestamp}`
				break;
			case ("action"):
				log.classList = "live-action log-bottom"
				log.innerHTML = `<span class="${lang}">${item.content}</span>${timestamp}`
				break;
			case ("image"):
				log.classList = "live-photo log-top"
				log.innerHTML = `<img loading="lazy" src="${item.content}">${timestamp}`
				break;
			case ("audio"):
				log.classList = "live-audio log-top"
				log.innerHTML = `<audio src="${item.content}" controls></audio>${timestamp}`
				break;
			case ("video"):
				vn++
				log.classList = "live-video log-top"
				log.innerHTML = `<video src="${item.content}" controls></video>${timestamp}`
				break;
			case ("iframe"):
				vn++
				log.classList = "live-iframe log-top"
				log.innerHTML = `${item.content}${timestamp}`
				break;
			default:
				break;
		};

		liveLog.appendChild(log);
			}, 10 * i)
		})
	})
}

function loadPosts() {
	const posts = document.getElementById("blog-posts");
	posts.innerHTML = "";

	fetch("content/posts.json")
	.then(response => response.json())
	.then(content => {
		content.forEach((entry, i) => {
			setTimeout(() => {
// -------------------------------------------------------------------------
			fetch(`posts/${lang}/${entry.id}.json`)
			.then(response => response.json())
			.then(data => {
		var link = document.createElement("a");
		link.href = `entry.html?id=${data.id}`

		link.style.border = `3px solid ${data.color}`

		link.innerHTML = `<span style="color:${data.color};">${data.title}</span>
						<div><span style="color:${data.color};">${data.date}</span><span style="color:${data.color};">${data.langs}</span></div>
					<p style="color:${data.color};">${data.summary}</p>`

		posts.appendChild(link);
			})
// -------------------------------------------------------------------------
			}, 50 * i)
		})
	})
}

function loadEntry(id) {
	fetch(`posts/${lang}/${id}.json`)
	.then(response => response.json())
	.then(data => {
		document.getElementById("title").textContent = data.title;
		document.getElementById("postTitle").textContent = data.title;
		document.getElementById("date").textContent = data.date;
		document.getElementById("content").innerHTML = data.content;
	})
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