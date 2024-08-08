function loadContent() {
  var loader = document.getElementById("load");
  loader.style.display = "flex";

  var filter = document.getElementById("filter"); filter.style.display = "none";
  var filterS = document.getElementById("filterS"); filterS.style.display = "flex";
  var reload = document.getElementById("reload"); reload.style.display = "none";
  var reloadS = document.getElementById("reloadS"); reloadS.style.display = "flex";
  filterS.children.style = "border: 1px solid #888;"
  
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

  var momos = document.getElementById('momos');
  const memes = [
    "240808_1",
    "240807_2",
    "240807_1"
  ]
  while (momos.firstChild) {
    momos.removeChild(momos.firstChild);
  }
  function loadMemes(index) {
    if (index < memes.length) {
      setTimeout(() => {
        memePath = "momos/" + memes[index] + ".jpg";
        let link = document.createElement("a");
        link.href = memePath;
        link.target = "_blank"
        let image = document.createElement("img");
        image.src = memePath;

        link.appendChild(image);
        momos.appendChild(link);
        loadMemes(index + 1)
      }, 10);
    } else {
    }
  }
  loadMemes(0);

  var filter = params.get('filter');
  var cajas = document.getElementById('cajas');
  const contents = [
    "240722",
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
              caja.style = "border: 2px solid" + data.color + ";";
              caja.href = 'entries/entry.html?id=' + data.id;
              var h2 = document.createElement('h2');
              h2.textContent = data.title;
              h2.style.color = data.color;
              var h3 = document.createElement('h3');
              h3.textContent = data.date;
              h3.style.color = data.color + "aa";
              var h4 = document.createElement('h4');
              h4.textContent = data.langs;
              h4.style.color = data.color;
              var p = document.createElement('p');
              p.textContent = data.summary;
              p.style.color = data.color;

              caja.appendChild(h2);
              caja.appendChild(h3);
              caja.appendChild(h4);
              caja.appendChild(p);
              cajas.appendChild(caja);
            }
            // Llama recursivamente a la función para cargar el siguiente contenido
            loadSequentially(index + 1);
          })
          .catch(error => console.error('Error al cargar el archivo JSON:', error));
      }, 10); // Retraso de 100 ms entre cada carga
    } else {
      loader.style.display = "none";
      filter = document.getElementById("filter"); filter.style.display = "flex";
      filterS = document.getElementById("filterS"); filterS.style.display = "none";
      reload = document.getElementById("reload"); reload.style.display = "flex";
      reloadS = document.getElementById("reloadS"); reloadS.style.display = "none";
    }
  }
  loadSequentially(0);
}