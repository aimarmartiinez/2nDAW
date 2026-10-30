      // Numero de enlaces de la pagina
      var enlaces = document.getElementsByTagName("a");
      console.log("Numero de enlaces de la pagina: " + enlaces.length);

      // Direccion del penultimo enlace
      var penultimoEnlace = enlaces[enlaces.length - 2];
      console.log("Direccion del penultimo enlace: " + penultimoEnlace.href);


      // Numero de enlaces que apuntan a http://prueba
      var contador = 0;
      for (var i = 0; i < enlaces.length; i++) {
        if (enlaces[i].href === "http://prueba/") {
          contador++;
        }
      }
      console.log("Numero de enlaces que apuntan a http://prueba: " + contador);

      // Numero de enlaces del tercer parrafo
      var parrafos = document.getElementsByTagName("p")[2];
      var enlacesTercerParrafo = parrafos.getElementsByTagName("a");
      console.log("Numero de enlaces del tercer parrafo: " + enlacesTercerParrafo.length);