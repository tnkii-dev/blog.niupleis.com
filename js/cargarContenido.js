function cargarContenidoEspecifico(divId, archivo, elementoId) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(this.responseText, "text/html");
      var contenidoEspecifico = doc.getElementById(elementoId).innerHTML;
      document.getElementById(divId).innerHTML = contenidoEspecifico;

      // Asignar el valor de 'archivo' al atributo href del elemento correspondiente
      document.getElementById(divId).setAttribute('href', archivo);
    }
  };
  xhttp.open("GET", archivo, true);
  xhttp.send();
}

//Cargar el contenido específico en el div correspondiente
cargarContenidoEspecifico("caja3", "entries/231216_1.html", "info");
cargarContenidoEspecifico("caja4", "entries/231215_1.html", "info");
cargarContenidoEspecifico("caja5", "entries/231203_1.html", "info");
cargarContenidoEspecifico("caja6", "entries/231129_1.html", "info");
cargarContenidoEspecifico("caja7", "entries/231123_1.html", "info");
cargarContenidoEspecifico("caja8", "entries/231121_1.html", "info");
cargarContenidoEspecifico("caja9", "entries/231118_1.html", "info");
cargarContenidoEspecifico("caja10", "entries/231115_1.html", "info");
//cargarContenidoEspecifico("caja99", "entries/231114.html", "info");
//cargarContenidoEspecifico("caja100", "entries/231113.html", "info");
