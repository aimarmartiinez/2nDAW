import { Box } from './exercicis/box';
import { Rectangle, Quadrat, Cercle, Perimetrable } from './exercicis/figures';
import { Conductor } from './exercicis/conductor';
import { Entity, Repository } from './exercicis/entity';


// Box
const caixa = new Box<number>();
console.log(caixa.describe(42));

// Figures
const rect = new Rectangle(10, 5);
const quad = new Quadrat(7);
const cercle = new Cercle(3);

console.log(`Rectangle: ${rect.perimetre()}`);
console.log(`Quadrat: ${quad.perimetre()}`);
console.log(`Cercle: ${cercle.perimetre()}`);

// Conductor
const conductor = new Conductor("Aimar", new Date(2000, 5, 15), true);
console.log(conductor.print());
console.log(conductor.print("Joan"));
console.log(conductor.print(new Date(1990, 1, 1)));
console.log(conductor.print(false));

// Repository
interface Vehicle extends Entity {
  marca: string;
}

const repo = new Repository<Vehicle>();
repo.add({ id: 1, marca: "Yamaha" });
repo.add({ id: 2, marca: "Honda" });

console.log(repo.getById(1));
console.log(repo.getAll());
repo.remove(2);
console.log(repo.getAll());
