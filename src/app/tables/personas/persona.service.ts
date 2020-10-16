import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import { Persona } from './persona.model'; // llamado al modelo

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private url = environment.urlBack;
  dialogData: any;
  constructor(
    private http: HttpClient, // implementar para peticiones http
  ) { }

  getDialogData() {
    return this.dialogData;
  }

  /**
   * Servicio Obtener lista de personas
   */
  getAllPersonaService(): Observable<any> {
    return this.http.get<any[]>(this.url + 'Persona',  {observe: 'response'} );
  }


  /**
   * Servicio Obtener perosna por id
   * @param idPersona,
   */
  getUsuarioByIdService(idPersona: any): Observable<any> {
    return this.http.get<any[]>(this.url + 'Persona' + idPersona,  {observe: 'response'});
  }

  /**
   * Servicio para crear persona
   * @param persona,
   */
  crearPersonaService(persona: any): Observable<any> {
    return this.http.post(this.url + 's', persona, {observe: 'response'});
  }


  /**
   * Servicio para actualizar persona
   * @param dataPersona,
   */
  actualizarPersonaService(dataPersona: any): Observable<any> {
    return this.http.put<any>(this.url + 'Persona/', dataPersona, {observe: 'response'});
  }


  /**
   * Servicio eliminar perosna por id
   * @param idPersona,
   */
  eliminarPersonaService(idPersona: any): Observable<any> {
    return this.http.delete<any[]>(this.url + 'Persona' + idPersona,  {observe: 'response'});
  }


  addAdvanceTable(persona: Persona): void {
    this.dialogData = persona;
  }

}
