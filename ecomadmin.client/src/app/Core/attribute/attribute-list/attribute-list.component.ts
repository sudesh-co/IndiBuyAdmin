import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridColumn } from '../../../Shared/custom-grid/custom-grid.component';
import { CategoryService } from '../../category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AttributeAddEditComponent } from './attribute-add-edit/attribute-add-edit.component';
import { AttributeService } from '../attribute.service';
import { CommonService } from '../../../Shared/CommonService/common.service';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { AttributeValueAddEditComponent } from './attribute-value-add-edit/attribute-value-add-edit.component';

@Component({
  selector: 'app-attribute-list',
  standalone: false,
  templateUrl: './attribute-list.component.html',
  styleUrl: './attribute-list.component.css'
})
export class AttributeListComponent implements OnInit {
  attributes: any[] = [];
  attributeValues: any[] = [];

  attrColumns: GridColumn[] = [];
  attrValueColumns: GridColumn[] = [];


  constructor(
    public dialog: MatDialog,
    private service: AttributeService,
    private alertService: NanaAlertService,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAttributes();
    this.loadAttributeValues();
  }

  loadAttributes(): void {
    this.service.getAttrubutesList({}).subscribe(res => {
      this.attributes = res.meta || [];
      this.attrColumns = res.data
        .filter((c: any) => c.IsVisible)
        .sort((a: any, b: any) => a.SortOrder - b.SortOrder)
        .map((c: any) => ({
          field: c.FieldName,
          label: c.Label,
          type: c.FieldType
        }));
      this.cdr.detectChanges();
    });
  }

  loadAttributeValues(): void {
    this.service.getAttrubuteValueList({}).subscribe(res => {
      this.attributeValues = res.meta || [];
      this.attrValueColumns = res.data
        .filter((c: any) => c.IsVisible)
        .sort((a: any, b: any) => a.SortOrder - b.SortOrder)
        .map((c: any) => ({
          field: c.FieldName,
          label: c.Label,
          type: c.FieldType
        }));
      this.cdr.detectChanges();
    });
  }

  addEditAttribute(attribute: any): void {
    const dialogRef = this.dialog.open(AttributeAddEditComponent, {
      width: '700px',
      height: '300px',
      panelClass: 'custom-dialog-container',
      data: {
        attr_id: attribute?.AttributeId,
        AttributeName: attribute?.AttributeName,
        AttributeIsActive: attribute?.IsActive
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadAttributes();
    });
  }

  addEditAttributeValue(attrValue: any): void {
    const dialogRef = this.dialog.open(AttributeValueAddEditComponent, {
      width: '700px',
      height: '400px',
      panelClass: 'custom-dialog-container',
      data: {
        ValueId: attrValue?.ValueId,
        AttributeValue: attrValue?.AttributeValue,
        attr_id: attrValue?.AttributeId,
        ValueIsActive: attrValue?.IsActive
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadAttributeValues();
    });
  }

  onDeleteAttribute(AttributeId: number): void {
    const obj = {
      TableName: 'ProductAttributes',
      WhereClause: `AttributeId =${AttributeId}`
    };
    this.alertService.confirm("Are you sure to delete this Attribute?", "Confirm").subscribe(confirm => {
      if (confirm) {
        this.commonService.Dynamicdelete(obj).subscribe(x => {
          if (x) {
            this.alertService.success("Attribute deleted");
            this.loadAttributes();
          } else {
            this.alertService.error("Delete failed");
          }
        });
      }
    });
  }

  onDeleteAttributeValue(ValueId: number): void {
    const obj = {
      TableName: 'ProductAttributeValues',
      WhereClause: `ValueId =${ValueId}`,
      SoftDelete:false
    };
    this.alertService.confirm("Are you sure to delete this Attribute Value?", "Confirm").subscribe(confirm => {
      if (confirm) {
        this.commonService.Dynamicdelete(obj).subscribe(x => {
          if (x) {
            this.alertService.success("Attribute Value deleted");
            this.loadAttributeValues();
          } else {
            this.alertService.error("Delete failed");
          }
        });
      }
    });
  }
}
