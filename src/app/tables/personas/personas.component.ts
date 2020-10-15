import { Component, OnInit, ViewChild, TemplateRef, Inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

import { PersonaService } from './persona.service'; // llamado al servico
import { Persona } from './persona.model'; // llamado al modelo

import { FormPersonaDialogComponent } from './dialogs/form-persona-dialog/form-persona-dialog.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.sass']
})
export class PersonasComponent implements OnInit {

  personas: Persona[];
  displayedColumns: string[] = ['id', 'name', 'lastname', 'address', 'phone', 'actions'];
  personaOrder: MatTableDataSource<Persona>; // para la tabla
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  id: number;
  persona: Persona | null;


  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };


  constructor(
    private personaService: PersonaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Metodo para mostrar todas las personas
   */
  loadData(){
    this.personaService.getAllPersonaService().subscribe(res => {
      this.personas = res.body;
      console.log('Lista de personas', this.personas);

      this.personaOrder = new MatTableDataSource(this.personas); // para filtro busqueda
      this.personaOrder.sort = this.sort;
      this.personaOrder.paginator = this.paginator;

    }, error => {
      console.log('Mesaje de error', error);
    });
  }


  /**
   * Metodo para crear
   */
  addNew() {
    const dialogRef = this.dialog.open(FormPersonaDialogComponent, {
      data: {
        persona: this.persona,
        action: 'add'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.personaService.getDialogData();

        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

/**
 * Metodo para refrescar tabla
 */
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /**
   * Metodo para notificar
   */
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }

   // context menu
   onContextMenu(event: MouseEvent, item: Persona) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}