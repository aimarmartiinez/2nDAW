console.log('EXERCICI CONDUCTOR')
export class Conductor {
  private nom: string;
  private dataNaixement: Date;
  private potPortarMoto: boolean;

  constructor(nom: string, dataNaixement: Date, potPortarMoto: boolean) {
    this.nom = nom;
    this.dataNaixement = dataNaixement;

    const avui = new Date();
    const edat = avui.getFullYear() - dataNaixement.getFullYear();

    if (edat < 18) {
      throw new Error("El conductor ha de ser major d'edat");
    }

    this.potPortarMoto = potPortarMoto;
  }

  // Sobrecàrregues
  print():string;
  print(value:string):string;
  print(value:Date):string;
  print(value:boolean):string;

  // Implementació
  print(value?: string | Date | boolean): string{
    let nom = this.nom;
    let edat =
      new Date().getFullYear() - this.dataNaixement.getFullYear();
    let potMoto = this.potPortarMoto ? "Sí" : "No";

    // Si s'ha passat un paràmetre, modifiquem el camp corresponent
    if (typeof value === "string") {
      nom = value;
    } else if (value instanceof Date) {
      edat = new Date().getFullYear() - value.getFullYear();
    } else if (typeof value === "boolean") {
      potMoto = value ? "Sí" : "No";
    }

    return `Nom: ${nom}, Edat: ${edat}, Pot portar moto: ${potMoto}`;
  }
}

