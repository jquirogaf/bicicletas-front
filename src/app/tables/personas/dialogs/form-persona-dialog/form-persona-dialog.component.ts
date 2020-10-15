import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { PersonaService } from '../../persona.service'; // llamado al servico
import { Persona } from '../../persona.model'; // llamado al modelo

@Component({
  selector: 'app-form-persona-dialog',
  templateUrl: './form-persona-dialog.component.html',
  styleUrls: ['./form-persona-dialog.component.sass']
})
export class FormPersonaDialogComponent {

  action: string;
  dialogTitle: string;
  personaForm: FormGroup;
  persona: Persona;

  constructor(
    public dialogRef: MatDialogRef<FormPersonaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public personaService: PersonaService,
    private fb: FormBuilder
  ) {

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle =
        data.persona.name + ' ' + data.persona.lastname;
      this.persona = data.persona;
    } else {
      this.dialogTitle = 'Nueva Persona';
      this.persona = new Persona();
    }
    this.personaForm = this.createPersonaForm();
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('address')
        ? 'Not a valid email'
        : '';
  }



  /**
   * Metodo para crear el formulario
   */
  createPersonaForm(): FormGroup {
    return this.fb.group({
      id: [this.persona.id],
      name: [this.persona.name, [Validators.required]],
      lastname: [this.persona.lastname, [Validators.required]],
      address: [
        this.persona.address,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      phone: [this.persona.phone, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.personaService.addAdvanceTable(
      this.personaForm.getRawValue()
    );
  }

}
