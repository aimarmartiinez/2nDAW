console.log('EJERCICIO 2 DATATYPES')
enum Size {
    XS,
    S,
    M,
    L,
    XL
};
function getPriceFromSize(size: Size, price: number): number {
    const increment = 0.05 * (size + 1);
    return price + (price * increment);
};
console.log(getPriceFromSize(Size.M, 10));

enum DayOfWeek {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
};
function printWeekNomberDay(day: DayOfWeek): void {
    console.log(`The day number is: ${day + 1}`);
};
printWeekNomberDay(DayOfWeek.Monday);

enum RainbowColor {
    red = '#EB1416',
    orange = '#FFA500',
    yellow = '#FAAB36',
    green = '#79C314',
    blue = '#487DE7',
    indigo = '#4B369D',
    violet = '#70369D'
};

function printColors(colors: RainbowColor[]): void {
    colors.forEach(color => {
        const div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.margin = '5px';
        div.style.backgroundColor = color;
        document.body.appendChild(div);
    });
}
printColors([
    RainbowColor.red,
    RainbowColor.orange,
    RainbowColor.yellow,
    RainbowColor.green,
    RainbowColor.blue,
    RainbowColor.indigo,
    RainbowColor.violet
]);