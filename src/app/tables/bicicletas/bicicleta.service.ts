import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Bicicleta } from './bicicleta.model'; // llamado al modelo

@Injectable({
  providedIn: 'root'
})
export class BicicletaService {

  private url = environment.urlBack;
  dialogData: any;

  constructor(
    private http: HttpClient, // implementar para peticiones http
  ) { }

  getDialogDataBici() {
    return this.dialogData;
  }

  /**
   * Servicio Obtener lista de bicicletas
   */
  getAllBicicletaService(): Observable<any> {
    return this.http.get<any[]>(this.url + 'Bicicletas',  {observe: 'response'} );
  }


  /**
   * Servicio Obtener Bicicleta por id
   * @param idBicicleta,
   */
  getBicicletaByIdService(idBicicleta: any): Observable<any> {
    return this.http.get<any[]>(this.url + 'Bicicletas' + idBicicleta,  {observe: 'response'});
  }

  /**
   * Servicio para crear Bicicleta
   * @param bicicleta,
   */
  crearBicicletaService(bicicleta: any): Observable<any> {
    return this.http.post(this.url + 'Bicicletas', bicicleta, {observe: 'response'});
  }


  /**
   * Servicio para actualizar Bicicleta
   * @param dataBicicleta,
   */
  actualizarPersonaService(dataBicicleta: any): Observable<any> {
    return this.http.put<any>(this.url + 'Bicicletas/', dataBicicleta, {observe: 'response'});
  }


  /**
   * Servicio eliminar Bicileta por id
   * @param idBicicleta,
   */
  eliminarPersonaService(idBicicleta: any): Observable<any> {
    return this.http.delete<any[]>(this.url + 'Bicicletas/' + idBicicleta,  {observe: 'response'});
  }


  addAdvanceTable(bicicleta: Bicicleta): void {
    this.dialogData = bicicleta;
  }
}
