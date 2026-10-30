console.log('EXERCICI FIGURES')
export interface Perimetrable {
    perimetre(): number;
}

export class Rectangle implements Perimetrable {
    protected _base: number;
    protected _altura: number;

    constructor(base: number, altura: number) {
        this._base = base;
        this._altura = altura;
    }

    perimetre(): number {
        return 2 * (this._base + this._altura);
    }
}

export class Quadrat extends Rectangle {
    private _lado: number;

    constructor(lado: number) {
        super(lado, lado);
        this._lado = lado;
    }

    perimetre(): number {
        return 4 * this._lado;
    }
}

export class Cercle implements Perimetrable {
    private _radi: number;

    constructor(radi: number) {
        this._radi = radi;
    }

    perimetre(): number {
        return 2 * Math.PI * this._radi;
    }
}


