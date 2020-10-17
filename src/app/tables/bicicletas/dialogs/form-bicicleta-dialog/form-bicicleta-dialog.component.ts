import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { PersonaService } from '../../../personas/persona.service'; // llamado al servico
import { Persona } from '../../../personas/persona.model'; // llamado al modelo

import { BicicletaService } from '../../bicicleta.service';
import { Bicicleta } from '../../bicicleta.model';

@Component({
  selector: 'app-form-bicicleta-dialog',
  templateUrl: './form-bicicleta-dialog.component.html',
  styleUrls: ['./form-bicicleta-dialog.component.sass']
})
export class FormBicicletaDialogComponent {

  action: string;
  dialogTitle: string;
  bicicletaForm: FormGroup;
  bicicleta: Bicicleta;
  respuesta: any;
  personas: Persona[];


  constructor(
    public dialogRef: MatDialogRef<FormBicicletaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bicicletaService: BicicletaService,
    private personaService: PersonaService,
    private fb: FormBuilder
  ) {
    this.loadPersonas();
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.bicicleta.modelo + ' ' + data.bicicleta.color;
      this.bicicleta = data.bicicleta;
    } else {
      this.dialogTitle = 'Nueva Bicicleta';
      this.bicicleta = new Bicicleta();
    }
    this.bicicletaForm = this.createBicicletaForm();
  }



  /**
   * Metodo para mostrar todas las personas
   */
  loadPersonas(){
    this.personaService.getAllPersonaService().subscribe(res => {
      this.personas = res.body;
      console.log('Lista de personas', this.personas);
    }, error => {
      console.log('Mesaje de error', error);
    });
  }


  /**
   * Metodo para crear el formulario
   */
  createBicicletaForm(): FormGroup {
    return this.fb.group({
      id: [this.bicicleta.id],
      modelo: [this.bicicleta.modelo, [Validators.required]],
      color: [this.bicicleta.color, [Validators.required]],
      latitude: [this.bicicleta.latitude, [Validators.required]],
      longitud: [this.bicicleta.longitud, [Validators.required]],
      personaId: [this.bicicleta.personaId, [Validators.required]],
    });
  }


  /**
   * Metodo para definicion de estado
   */
  onSubmit(){
    if (this.bicicletaForm.valid){
      console.log('accion', this.action);
      if (this.action === 'add'){
        this.guardar();
      } else if (this.action === 'edit'){
        this.actualizar();
      }
    }
  }

  guardar(){
    const newBicicleta: Bicicleta = {
      color: this.bicicletaForm.get('color').value,
      modelo: this.bicicletaForm.get('modelo').value,
      latitude: this.bicicletaForm.get('latitude').value,
      longitud: this.bicicletaForm.get('longitud').value,
      personaId: this.bicicletaForm.get('personaId').value,
    };
    console.log('valor a guardar de Bicicleta ', newBicicleta);

    this.bicicletaService.crearBicicletaService(newBicicleta).subscribe(res => {
      this.respuesta = res;
      console.log('Bicicleta guardada', this.respuesta);
    }, error => {
      console.log('Mesaje de error', error);
    });
  }


  actualizar(){
    const editBicicleta: Bicicleta = {
      id: this.bicicletaForm.get('id').value,
      color: this.bicicletaForm.get('color').value,
      modelo: this.bicicletaForm.get('modelo').value,
      latitude: this.bicicletaForm.get('latitude').value,
      longitud: this.bicicletaForm.get('longitud').value,
      personaId: this.bicicletaForm.get('personaId').value,
    };
    console.log('valor a actualizar de Bicicleta ', editBicicleta);

    this.bicicletaService.actualizarBicicletaService(editBicicleta).subscribe(res => {
      this.respuesta = res;
      console.log('Bicicleta Actualizar', this.respuesta);
    }, error => {
      console.log('Mesaje de error', error);
    });
  }


  /**
   * Metodo para cerra rmodal
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.bicicletaService.addAdvanceTable(
      this.bicicletaForm.getRawValue()
    );
  }




}
