import { Persona } from '../personas/persona.model';

export interface Bicicleta {
  id?: number;
  color?: string;
  modelo?: number;
  latitude?: number;
  longitud?: number;
  personaId?: number;
  persona?: Persona[];
}

export class Bicicleta implements Bicicleta {
  constructor(
    public id?: number,
    public color?: string,
    public modelo?: number,
    public latitude?: number,
    public longitud?: number,
    public personaId?: number,
    public persona?: Persona[],
  ){}
}
