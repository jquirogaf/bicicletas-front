export interface Persona {
  id?: number;
  name?: string;
  lastName?: string;
  address?: string;
  phone?: string;
}


export class Persona implements Persona {
  constructor(
    public id?: number,
    public name?: string,
    public lastName?: string,
    public address?: string,
    public phone?: string,
  ){}

}
