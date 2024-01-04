let contents = [
  "entries/240104_1.html",
  "entries/231216_1.html",
  "entries/231215_1.html",
  "entries/231203_1.html",
  "entries/231129_1.html",
  "entries/231123_1.html",
  "entries/231118_1.html",
  "entries/231115_1.html",
];

contents.forEach(function(archivo, indice) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(this.responseText, "text/html");
      var contenidoEspecifico = doc.getElementById("info").innerHTML;
      var box = indice.toString();
      document.getElementById(box).innerHTML = contenidoEspecifico;

      // Asignar el valor de 'archivo' al atributo href del elemento correspondiente
      document.getElementById(box).setAttribute('href', archivo);
    }
  };
  xhttp.open("GET", archivo, true);
  xhttp.send();
});
