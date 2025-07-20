import { Component } from '@angular/core';
import { FieldConfig, FieldConfigService } from './field-config.service';
import { FieldConfigFormComponent } from './field-config-form/field-config-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-field-config',
  standalone: false,
  templateUrl: './field-config.component.html',
  styleUrl: './field-config.component.css'
})
export class FieldConfigComponent {
  dataSource = new MatTableDataSource<FieldConfig>();
  displayedColumns: string[] = ['ColumnName', 'FieldName', 'Label', 'FieldType', 'IsVisible', 'SortOrder', 'actions'];
  viewName = 'vw_ProductAttributes';

  constructor(private service: FieldConfigService, private dialog: MatDialog) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getConfigs(this.viewName).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(config?: FieldConfig) {
    const dialogRef = this.dialog.open(FieldConfigFormComponent, {
      width: '400px',
      data: config ? { ...config } : { viewName: this.viewName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.load();
    });
  }
}
