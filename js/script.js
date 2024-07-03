function toggleMenu() {
  var sideMenu = document.getElementById('sideMenu');
  sideMenu.classList.toggle('show');
}

function langSelection() {
  var langMenu = document.getElementById('langMenu');
  langMenu.classList.toggle('show');
  var bioDisplay = document.getElementById('bioDisplay');
  bioDisplay.classList.toggle('show');
}

function isDesktop() {
  return window.innerWidth > 719;
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
};

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

function loadContent() {
  var loader = document.getElementById("load");
  loader.style.display = "flex";
  
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

  var filter = params.get('filter');
  var cajas = document.getElementById('cajas');
  const contents = [
    "240703",
    "240628",
    "240622",
    "240613",
    "240609",
    "240511",
    "240423",
    "240416",
    "240414",
    "240406",
    "240324",
    "240323",
    "240322",
    "231216",
    "231203",
    "231115"
  ];
  while (cajas.firstChild) {
    cajas.removeChild(cajas.firstChild);
  }

  // Define una función para cargar los contenidos con un retraso entre cada uno
  function loadSequentially(index) {
    if (index < contents.length) {
      setTimeout(() => {
        entryPath = 'entries/' + lang + '/' + contents[index] + '.json';
        fetch(entryPath)
          .then(response => response.json())
          .then(data => {
            if (filter == "all" || data.type == filter) {
              var caja = document.createElement('a');
              caja.className = 'caja';
              caja.style = "border: 2px dashed" + data.color + ";";
              caja.href = 'entries/entry.html?id=' + data.id;
              var h2 = document.createElement('h2');
              h2.textContent = data.title;
              h2.style.color = data.color;
              var h3 = document.createElement('h3');
              h3.textContent = data.date;
              h3.style.color = data.color;
              var p = document.createElement('p');
              p.textContent = data.summary;
              p.style.color = data.color;

              caja.appendChild(h2);
              caja.appendChild(h3);
              caja.appendChild(p);
              cajas.appendChild(caja);
            }
            // Llama recursivamente a la función para cargar el siguiente contenido
            loadSequentially(index + 1);
          })
          .catch(error => console.error('Error al cargar el archivo JSON:', error));
      }, 100); // Retraso de 100 ms entre cada carga
    } else {
      loader.style.display = "none";
    }
  }

  // Inicia la carga secuencial
  loadSequentially(0);
}


function loadEntry() {
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
    .then(response => response.json()) // Parsea la respuesta como JSON
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

  var displayName = document.getElementById("displayName")
  //var archivo = document.getElementById("archivo")
  var cookies1 = document.getElementById("cookies1")
  var cookies2 = document.getElementById("cookies2")
  var langDisclaimer = document.getElementById("langDisclaimer")
  var bio = document.getElementById("bio")
  var bio2 = document.getElementById("bio2")
  var wellcome = document.getElementById("wellcome")
  var all = document.getElementById("all")
  var news = document.getElementById("news")
  var waifu = document.getElementById("waifu")
  var art = document.getElementById("art")
  var dev = document.getElementById("dev")
  var gaming = document.getElementById("gaming")

  fetch(langPath)
    .then(response => response.json())
    .then(data => {
      displayName.textContent = data.displayName
      //archivo.textContent = data.archivo
      cookies1.textContent = data.cookies1
      cookies2.innerHTML = data.cookies2
      langDisclaimer.textContent = data.langDisclaimer
      bio.textContent = data.bio
      bio2.innerHTML = data.bio2
      wellcome.textContent = data.wellcome
      all.textContent = data.all
      news.textContent = data.news
      waifu.textContent = data.waifu
      art.textContent = data.art
      dev.textContent = data.dev
      gaming.textContent = data.gaming
    });
  if (lang == "es" || lang == "en") {
    document.body.style.fontFamily = 'Ysabeau';
  }else if (lang == "jp") {
    document.body.style.fontFamily = 'Sawarabi Gothic';
  } else if (lang == "kr") {
    document.body.style.fontFamily = 'Hahmlet';
  }
};