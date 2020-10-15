export interface Bicicleta {
  id?: number;
  color?: string;
  modelo?: string;
  latitud?: string;
  longitud?: string;
}

export class Bicicleta implements Bicicleta {
  constructor(
    public id?: number,
    public color?: string,
    public modelo?: string,
    public latitud?: string,
    public longitud?: string,
  ){}
}
