function toggleMenu() {
  navegar = document.getElementById('Navegar');
  icon = document.getElementById('menuIcon');
  navegar.classList.toggle('move');
  icon.classList.toggle('menuActive');
}

function toggleBio() {
  bio = document.getElementById('bioDisplay');
  bio.classList.toggle('move');
}

function toggleLang() {
  lang = document.getElementById('Lang');
  icon = document.getElementById('langIcon');
  lang.classList.toggle('move');
  icon.classList.toggle('langActive');
}

function setFilter(filtro) {
  var url = new URL(window.location.href);
  url.searchParams.set('filter', filtro);
  window.history.replaceState({}, '', url);

  loadContent()
}

function setCookie(nombre, valor, expiracionEnDias, source) {
  fechaExpiracion = new Date();
  fechaExpiracion.setDate(fechaExpiracion.getDate() + expiracionEnDias);

  cookie = nombre + '=' + valor + '; expires=' + fechaExpiracion.toUTCString() + '; path=/';
  document.cookie = cookie;
  console.log('cookie creada:' + valor)
  if (nombre == "lang") {
    var url = new URL(window.location.href);
    url.searchParams.set('lang', valor);
    window.history.replaceState({}, '', url);
  }
  if (source == 'root') {
  translate()
  loadContent()
  }
}

function checkCookie(cookieName) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + '=')) {
      return true;
    }
  }
  return false;
}

function setCookie(nombre, valor, expiracionEnDias) {
  var url = new URL(window.location.href);
  var params = url.searchParams;
  var cookie = params.get('noCookie');

  fechaExpiracion = new Date();
  fechaExpiracion.setDate(fechaExpiracion.getDate() + expiracionEnDias);

  cookie = nombre + '=' + valor + '; expires=' + fechaExpiracion.toUTCString() + '; path=/';
  document.cookie = cookie;
  console.log('cookie creada: ' + nombre + " " + valor)

  if (nombre == "lang") {
    url.searchParams.set('lang', valor);
    window.history.replaceState({}, '', url);
    translate();
  }
  if (cookie == "true") {
    delCookie('lang')
    delCookie('cookiesEnabled')
  }
}

function getCookie(nombre) {
  nombreCookie = nombre + '=';
  cookies = document.cookie.split(';');

  for (i = 0; i < cookies.length; i++) {
    cookie = cookies[i].trim();
    if (cookie.indexOf(nombreCookie) === 0) {
      return cookie.substring(nombreCookie.length, cookie.length);
    }
  }

  return null;
}

function delCookie(nombre) {
  document.cookie = nombre + '=' + '.' + '; expires=Thu, 1 Jan 1970 00:00:01 GMT; path=/';
  console.log("deleted Cookie: " + nombre)
}

function rejectCookie() {
  delCookie('lang')
  delCookie('cookiesEnabled')
  var menu = document.getElementById("cookies");
  menu.classList.toggle("hideCookie")

  var url = new URL(window.location.href);
  url.searchParams.set('noCookie', "true");
  window.history.replaceState({}, '', url);
}

function hideCookie() {
  var menu = document.getElementById("cookies");
  menu.classList.toggle("hideCookie")

  var url = new URL(window.location.href);
  url.searchParams.delete('noCookie')
  var lang = url.searchParams.get('lang')
  window.history.replaceState({}, '', url);

  setCookie('lang', lang, 15)
  setCookie('cookiesEnabled', 'true', 15)
}

function cookieInfo() {
  var ck1 = document.getElementById("ck1")
  var ck2 = document.getElementById("ck2")
  var ck3 = document.getElementById("ck3")
  var ck4 = document.getElementById("ck4")
  ck1.classList.toggle('cock');
  ck2.classList.toggle('cock');
  ck3.classList.toggle('cock');
  ck4.classList.toggle('cock');
}

function loadEntry(source) {
  let lang

  let cookieLang = getCookie('lang')

  var url = new URL(window.location.href);
  var params = url.searchParams;
  var urlLang = params.get('lang');

  if (cookieLang && !urlLang) {
    lang = cookieLang;
  }
  else if (urlLang) {
    lang = urlLang;
    setCookie(lang, urlLang, 7)
  }
  else if (cookieLang) {
    lang = cookieLang;
  }
  else {
    lang = 'es'
  }

  var url = new URL(window.location.href);
  var params = url.searchParams;
  var id = params.get('id');

  var displayTitle = document.getElementById('displayTitle')
  var visibleTitle = document.getElementById('visibleTitle')
  var date = document.getElementById('date')
  var summary = document.getElementById('summary')
  var content = document.getElementById('contenido')

  var entryPath = lang + '/' + id + '.json'

  var menu = document.getElementById('langMenu')

  fetch(entryPath)
    .then(response => {// Parsea la respuesta como JSON
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No hay traducciones disponibles");
      }
    })
    .then(data => {
      displayTitle.textContent = data.title;
      visibleTitle.textContent = data.title;
      visibleTitle.style.color = data.color;
      date.textContent = data.date;
      date.style.color = data.color + '50';
      summary.textContent = data.summary;
      summary.style.color = data.color + 'd7';
      content.innerHTML = data.content;
      menu.style.border = '2px solid' + data.color;
    })
    .catch(error =>{
      if (source == "translate") {
        displayTitle.textContent = "Error al traducir";
        visibleTitle.textContent = error;
        date.textContent = "";
        summary.textContent = "";
        content.innerHTML = "<p>No translations available at this time</p><p>現在、翻訳は利用できません</p><p>현재 번역이 제공되지 않습니다</p>";
        menu.style.display = 'none';
      } else {
        displayTitle.textContent = "Error al cargar";
        visibleTitle.textContent = "Blog no encontrado";
        date.textContent = "";
        summary.textContent = "";
        content.innerHTML = "<p>Post not found</p><p>投稿が見つかりません</p><p>게시물이 없습니다</p>";
        menu.style.display = 'none';
      }
    })
  if (lang == "es" || lang == "en") {
    document.body.style.fontFamily = 'Ysabeau';
  }else if (lang == "jp") {
    document.body.style.fontFamily = 'Sawarabi Gothic';
  } else if (lang == "kr") {
    document.body.style.fontFamily = 'Hahmlet';
  }
};

function filter(type) {
  loadContent(type);
}

function translate() {
  let lang

  let cookieLang = getCookie('lang')

  var url = new URL(window.location.href);
  var params = url.searchParams;
  var urlLang = params.get('lang');

  if (cookieLang && !urlLang) {
    lang = cookieLang;
  }
  else if (urlLang) {
    lang = urlLang;
    setCookie(lang, urlLang, 7)
  }
  else if (cookieLang) {
    lang = cookieLang;
  }
  else {
    lang = 'es'
  }

  langPath = 'lang/' + lang + '.json'

  var displayName = document.getElementById("displayName");
  var text_delCookies = document.getElementById("text_delCookies");
  var bio = document.getElementById("bio");
  var text_bio = document.getElementById("text_bio");
  var text_wellcome = document.getElementById("text_wellcome");
  var all = document.getElementById("all");
  var news = document.getElementById("news");
  var waifu = document.getElementById("waifu");
  var art = document.getElementById("art");
  var dev = document.getElementById("dev");
  var gaming = document.getElementById("gaming");
  
  var allS = document.getElementById("allS");
  var newsS = document.getElementById("newsS");
  var waifuS = document.getElementById("waifuS");
  var artS = document.getElementById("artS");
  var devS = document.getElementById("devS");
  var gamingS = document.getElementById("gamingS");

  var text_cookieInfo = document.getElementById("text_cookieInfo");
  var text_rejectCookie = document.getElementById("text_rejectCookie");
  var text_acceptCookie = document.getElementById("text_acceptCookie");
  var text_cookiesInfo = document.getElementById("text_cookiesInfo");
  var text_infoCookies = document.getElementById("text_infoCookies");
  var text_cookiesInfoNt = document.getElementById("text_cookiesInfoNt");

  fetch(langPath)
    .then(response => response.json())
    .then(data => {
      displayName.textContent = data.displayName;
      text_delCookies.textContent = data.text_delCookies;
      bio.innerHTML = data.bio;
      text_bio.innerHTML = data.text_bio;
      text_wellcome.textContent = data.text_wellcome;
      all.textContent = data.all;
      news.textContent = data.news;
      waifu.textContent = data.waifu;
      art.textContent = data.art;
      dev.textContent = data.dev;
      gaming.textContent = data.gaming;

      allS.textContent = data.all;
      newsS.textContent = data.news;
      waifuS.textContent = data.waifu;
      artS.textContent = data.art;
      devS.textContent = data.dev;
      gamingS.textContent = data.gaming;

      text_cookieInfo.innerHTML = data.text_cookieInfo;
      text_rejectCookie.innerHTML = data.text_rejectCookie;
      text_acceptCookie.innerHTML = data.text_acceptCookie;
      text_cookiesInfo.innerHTML = data.text_cookiesInfo;
      text_infoCookies.innerHTML = data.text_infoCookies;
      text_cookiesInfoNt.innerHTML = data.text_cookiesInfoNt;
    });
  if (lang == "es" || lang == "en") {
    document.body.style.fontFamily = 'Ysabeau';
  }else if (lang == "jp") {
    document.body.style.fontFamily = 'Sawarabi Gothic';
  } else if (lang == "kr") {
    document.body.style.fontFamily = 'Hahmlet';
  }
};
