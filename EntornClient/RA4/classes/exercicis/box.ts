export class Box<T>{
    set(value: T): T {
        return value;
    }
    get(value: T): T {
        return value;
    }
    describe(value:T): string {
        //retorna el tipus y el contingut
        return `Aquesta caixa conté un element de tipus ${typeof value} i té el valor: ${this.get(value)}`;
    }
}