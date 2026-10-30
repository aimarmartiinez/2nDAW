/*
    * Crea una única función (importante que sólo sea una) que sea capaz
    * de calcular y retornar el área de un polígono.
    * - La función recibirá por parámetro sólo UN polígono a la vez.
    * - Los polígonos soportados serán Triángulo, Cuadrado y Rectángulo.
    * - Imprime el cálculo del área de un polígono de cada tipo.
 */

let poligon = "triangulo";

let altura = 10;
let base = 20;

function calcularArea(poligon, altura, base){
    poligon.toLowerCase();
    if (poligon==="triangulo"){
        area = (base * altura) / 2;
        console.log("el area del "+poligon+" es igual a "+area+" metros cuadrados");
    }else if(poligon==="cuadrado"){
        area = base * base;
        console.log("el area del "+poligon+" es igual a "+area+" metros cuadrados");
    }else if(poligon==="rectangulo"){
        area = base * altura;
        console.log("el area del "+poligon+" es igual a "+area+" metros cuadrados");
    }

}

calcularArea(poligon, altura, base)
