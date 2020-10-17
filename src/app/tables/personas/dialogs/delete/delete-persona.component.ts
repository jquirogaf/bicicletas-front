import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonaService } from '../../persona.service';
@Component({
  selector: 'app-delete-persona',
  templateUrl: './delete-persona.component.html',
  styleUrls: ['./delete-persona.component.sass']
})
export class DeletePersonaComponent  {


  constructor(
    public dialogRef: MatDialogRef<DeletePersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // dat aobtenida
    public personaService: PersonaService
  ) { }


  /**
   * Metodo para cerar modal
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Metodo confirmar elmiminar perosna
   */
  confirmDelete(): void {
    console.log('VALOR DE LA DATA', this.data);
    const personaId = this.data.id;
    this.personaService.eliminarPersonaService(personaId).subscribe(res => {
      console.log('Borrado', res.status);
    }, error => {
      console.log('Mesaje de error', error);
    });
  }
}
