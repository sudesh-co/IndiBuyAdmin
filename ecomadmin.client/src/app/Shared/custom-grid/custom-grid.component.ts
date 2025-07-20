import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
  AfterViewInit, ViewChild, OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GridConfigFormComponent } from './grid-config-form/grid-config-form.component';
import { MatDialog } from '@angular/material/dialog';

export interface GridColumn {
  field: string;
  label: string;
  type: 'text' | 'chip' | 'image' | 'boolean';
  visible?: boolean;
}

@Component({
  selector: 'app-custom-grid',
  standalone: false,
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class CustomGridComponent implements OnInit, OnChanges {
  @Input() columns: GridColumn[] = [];
  @Input() data: any[] = [];
  @Input() showEdit: boolean = false;
  @Input() showDelete: boolean = false;
  @Input() showCustom: boolean = false;
  @Input() showNote: boolean = false;
  @Input() customButton: string ="";
  @Input() noteMsg!: string;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() custom = new EventEmitter<any>();
   ShowNodataImage: boolean = false;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumnFields: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.ShowNodataImage = this.data! == null ||false; 
    this.initializeDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['columns']) {
      this.initializeDataSource();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initializeDataSource(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumnFields = this.columns
      .filter(col => col.visible !== false)
      .map(col => col.field);

    if (this.showEdit || this.showDelete || this.showCustom) {
      this.displayedColumnFields.push('actions');
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openGridConfig(): void {
    const dialogRef = this.dialog.open(GridConfigFormComponent, {
      width: '600px',
      data: this.columns
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.columns = result;
        this.initializeDataSource();
      }
    });
  }
}
