import { Component, OnInit, ViewChild, ElementRef, TemplateRef, Inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

import { BicicletaService } from './bicicleta.service'; // llamado al servico
import { Bicicleta } from './bicicleta.model'; // llamado al modelo


import { FormBicicletaDialogComponent } from './dialogs/form-bicicleta-dialog/form-bicicleta-dialog.component';
import { DeleteBicicletaComponent } from './dialogs/delete-bicicleta/delete-bicicleta.component';


@Component({
  selector: 'app-bicicletas',
  templateUrl: './bicicletas.component.html',
  styleUrls: ['./bicicletas.component.sass']
})
export class BicicletasComponent implements OnInit {


  bicicletas: Bicicleta[];
  displayedColumns: string[] = ['modelo', 'color', 'latitude', 'longitud', 'persona', 'actions'];
  bicicletaOrder: MatTableDataSource<Bicicleta>; // para la tabla
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  id: number;
  bicicleta: Bicicleta | null;


  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };


  constructor(
    private bicicletaService: BicicletaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
    console.log('entro');
  }

  /**
   * Metodo para mostrar todas las personas
   */
  loadData() {
    this.bicicletaService.getAllBicicletaService().subscribe(res => {
      this.bicicletas = res.body;
      console.log('Lista de bicicletas', this.bicicletas);

      this.bicicletaOrder = new MatTableDataSource(this.bicicletas); // para filtro busqueda
      this.bicicletaOrder.sort = this.sort;
      const sortState: Sort = {active: 'id', direction: 'desc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
      this.bicicletaOrder.paginator = this.paginator;

    }, error => {
      console.log('Mesaje de error', error);
    });
  }

  /**
   * Metodo para crear Bicicleta
   */
  addNew() {
    const dialogRef = this.dialog.open(FormBicicletaDialogComponent, {
      data: {
        bicicleta: this.bicicletas,
        action: 'add'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.bicicletaService.getDialogDataBici();

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
   * Metodo para Editar Bicicleta
   * @param row,
   */
  editCall(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(FormBicicletaDialogComponent, {
      data: {
        bicicleta: row,
        action: 'edit'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.bicicletas.findIndex(x => x.id === this.id);

        this.bicicletas[foundIndex] = this.bicicletaService.getDialogDataBici();
        this.refreshTable();
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  /**
   * Metodo para eliminar Bicicleta
   * @param row,
   */
  deleteItem(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(DeleteBicicletaComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.bicicletas.findIndex(x => x.id === this.id);
        this.bicicletas[foundIndex] = this.bicicletaService.getDialogDataBici();

        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
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
  onContextMenu(event: MouseEvent, item: Bicicleta) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
