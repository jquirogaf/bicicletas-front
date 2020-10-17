import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BicicletaService } from '../../bicicleta.service';
@Component({
  selector: 'app-delete-bicicleta',
  templateUrl: './delete-bicicleta.component.html',
  styleUrls: ['./delete-bicicleta.component.sass']
})
export class DeleteBicicletaComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBicicletaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // dat aobtenida
    public bicicletaService: BicicletaService
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
    const bicicletaId = this.data.id;
    this.bicicletaService.eliminarBicicletaService(bicicletaId).subscribe(res => {
      console.log('Borrado', res.status);
    }, error => {
      console.log('Mesaje de error', error);
    });
  }

}
