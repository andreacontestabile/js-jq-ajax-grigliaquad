/* Generare una griglia 6x6 (36 boxes), ad ogni click parte
una richiesta AJAX che prende un numero random da 1 a 9 (scegliere API opportuna).
Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
Il numero ottenuto appare al centro del quadrato.  */

$(document).ready(function() {
  // Genero la mia griglia 6x6 (36 elementi):
  // Creo un ciclo (che si ripete 36 volte) che generi un nuovo elemento div,
  // gli associ la classe ".square"
  // e ne faccia .append all'interno di .container
  for (var i = 0; i < 36; i++) {
    var newDiv = $("<div></div>");
    newDiv.addClass("square");
    $(".container").append(newDiv);
  }

  // Creo un evento click per tutti i quadrati della griglia:
  $(".square").click(function(){

    // Salvo in una variabile l'elemento cliccato, per utilizzo successivo
    var thisSquare = $(this);

    // Definisco una funzione che, in base al numero ottenuto, cambi il colore del quadrato cliccato
    function squareColorNumber(result) {
      // Salvo il numero in una variabile
      var randAjaxNum = result.response;
      // Se è minore o uguale a 5
      if (randAjaxNum <= 5) {
        // Il colore sarà GIALLO
        var color = "yellow";
      } else {
        // Altrimenti sarà VERDE
        var color = "green";
      }
      // Cambio il colore di sfondo del quadrato
      thisSquare.css({"background-color":color});
      // Stampo il numero all'interno del quadrato
      thisSquare.html(randAjaxNum);
    }

    // Eseguo la chiamata Ajax per ottenere un numero random tra 1 e 9
    $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/random/int",
      method: "GET",
      success: function (data, stato) {
        // Se la chiamata è stata effettuata con successo, eseguo la funzione creata in precedenza
        squareColorNumber(data);
      },
      error: function (richiesta, stato, errori) {
        // Altrimenti comparirà un alert contenente un errore
        alert("E' avvenuto un errore. " + errore);
      }
    });

  });

});
