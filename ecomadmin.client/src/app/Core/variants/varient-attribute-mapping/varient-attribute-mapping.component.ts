import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { GridColumn } from '../../../Shared/custom-grid/custom-grid.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VariantsService } from '../../variants.service';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { AddEditVariantAttributeMappingComponent } from './add-edit-variant-attribute-mapping/add-edit-variant-attribute-mapping.component';

@Component({
  selector: 'app-varient-attribute-mapping',
  standalone: false,
  templateUrl: './varient-attribute-mapping.component.html',
  styleUrl: './varient-attribute-mapping.component.css'
})
export class VarientAttributeMappingComponent implements OnInit {
  Attributes: any[] = [];
  @Input() productId!: number;
  columns: GridColumn[] = [];

  constructor(
    public dialog: MatDialog,
    private service: VariantsService,
    private cdr: ChangeDetectorRef,
    private alertService: NanaAlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VarientAttributeMappingComponent>
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadVariants();

  }
  loadVariants(): void {
    this.service.getvariantAttributeList({ VariantId: this.data?.VariantId ?? 0}).subscribe(x => {
      this.Attributes = x.meta;
      this.columns = x.data
        .filter((c: any) => c.IsVisible)
        .sort((a: any, b: any) => a.SortOrder - b.SortOrder)
        .map((c: any) => ({
          field: c.FieldName,
          label: c.Label,
          type: c.FieldType
        }));

      
      this.cdr.detectChanges();
    }, err => this.alertService.error('Error loading variants'+err));
  }
  addEditVarientAttr(variant: any): void {
    const dialogRef = this.dialog.open(AddEditVariantAttributeMappingComponent, {
      width: '700px',
      position: {
        top: '15px'
      },
      data: {
        VariantId: variant?.VariantId ?? this.data?.VariantId ?? 0,
      }
    });


    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.loadVariants();
      }
    });
  }

  onDelete(ProductId: number): void {
    // Use real delete API here
    // this.service.deleteCategory(categoryId).subscribe(() => {
    //   this.categories = this.categories.filter(c => c.CategoryId !== categoryId);
    // });
  }
  onClick(custonData: any) {
    console.log(custonData)
  }
}
