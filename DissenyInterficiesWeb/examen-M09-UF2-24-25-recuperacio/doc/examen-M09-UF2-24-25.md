# Examen M09 UF2 24-25

Crea una funció com a mínim per cada exercici. Dins de la funció a de seleccionar el canvas corresponent a l'exercici i el seu context.

## Exercici 1 (2.5p)
Dibuixa un elefant semblant al de la imatge d'exemple al canvas `ex1-elefant`. Fes servir les primitives més adients per dibuixar cada part de l'elefant.

## Exercici 2 (2.5p)
Dibuixa els cuadrats semblants a la imatge d'exemple fent servir `fillRect` i `strokeRect`.

## Exercici 3 (2.5p)
Dibuixa les onades del mar semblants al de la imatge d'exemple. fent servir corbes beizer.

## Exercici 4 (2.5p)
Mostra la imatge `image.jpg` sencera al canvas 'ex4-zoom'. Al fer una selecció d'un espai de la imatge fes un zoom d'aquella part. Fes servir els esdeveniments 
`mousedown` i `mouseup`. Al fer `mousedown` i `mouseup` sense moure el cursor fes que la imatge torni al seu estat original.

# Apunts
0. Colors
```js
ctx.fillStyle = "red"; // Nom de color
ctx.fillStyle = "#ff0000"; // Hexadecimal
ctx.fillStyle = "rgb(255,0,0)"; // RGB
ctx.fillStyle = "rgba(0,0,255,0.5)"; // RGBA (amb transparència)

ctx.strokeStyle = "green";
ctx.strokeStyle = "#00ff00";
ctx.strokeStyle = "rgb(0,255,0)";
ctx.lineWidth = 4; // Gruix del traç
```

1. Rectangle

```js
ctx.fillRect(x, y, amplada, alçada); // Dibuixa un rectangle ple
ctx.strokeRect(x, y, amplada, alçada); // Només el contorn
ctx.clearRect(x, y, amplada, alçada); // Esborra una àrea rectangular
```

2. Path (camí personalitzat)

```js
ctx.beginPath();
ctx.moveTo(x1, y1); // Punt inicial
ctx.lineTo(x2, y2); // Línia fins aquí
ctx.lineTo(x3, y3);
ctx.closePath();
ctx.stroke();
```
3. Arc

```js
ctx.beginPath();
ctx.arc(x, y, radi, angleInici, angleFi);
ctx.stroke();
```

4. Quadratic Curve (corba quadràtica)

```js
ctx.beginPath();
ctx.moveTo(x1, y1); // Punt inicial
ctx.quadraticCurveTo(cx, cy, x2, y2); // Control, final
ctx.stroke();
```

5. Bezier Curve (corba de Bézier cúbica)

```js
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
ctx.stroke();
```
6. DrawImage (dibuixar una imatge)

```js
let img = new Image()
img.src = ('picture.jpg')
ctx.drawImage(img, x, y, amplada, alçada);
ctx.drawImage(img, xImatge, yImatge, ampladaImatge, alçadaImatge, xCanvas, yCanvas, ampladaCanvas, alçadaCanvas);
```


