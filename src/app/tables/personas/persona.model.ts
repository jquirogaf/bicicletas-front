export interface Persona {
  id?: number;
  name?: string;
  lastname?: string;
  address?: string;
  phone?: string;
}


export class Persona implements Persona {
  constructor(
    public id?: number,
    public name?: string,
    public lastname?: string,
    public address?: string,
    public phone?: string,
  ){}

}
