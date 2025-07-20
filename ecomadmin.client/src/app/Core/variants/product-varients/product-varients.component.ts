import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GridColumn } from '../../../Shared/custom-grid/custom-grid.component';
import { VariantsService } from '../../variants.service';
import { AddEditProductVariantComponent } from './add-edit-product-variant/add-edit-product-variant.component';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { AddEditVariantAttributeMappingComponent } from '../varient-attribute-mapping/add-edit-variant-attribute-mapping/add-edit-variant-attribute-mapping.component';
import { VarientAttributeMappingComponent } from '../varient-attribute-mapping/varient-attribute-mapping.component';

@Component({
  selector: 'app-product-varients',
  standalone: false,
  templateUrl: './product-varients.component.html',
  styleUrl: './product-varients.component.css',

})
export class ProductVarientsComponent {
  variants: any[] = [];

  columns: GridColumn[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: VariantsService, private alertservice: NanaAlertService,
    public dialogRef: MatDialogRef<ProductVarientsComponent>, private dialog: MatDialog) {
    console.log(this.data.productId);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadProductVariants();

  }
  loadProductVariants(): void {
    this.service.getvariantList({ productId: this.data?.productId || 0 }).subscribe(x => {
      this.variants = x.meta;

      this.columns = x.data
        .filter((c: any) => c.IsVisible)
        .sort((a: any, b: any) => a.SortOrder - b.SortOrder)
        .map((c: any) => ({
          field: c.FieldName,
          label: c.Label,
          type: c.FieldType
        }));

    }, err => console.error('Error loading categories', err));
  }
  addEditVarients(VariantId: any): void {
    if (this.data?.productId) {
      const dialogRef = this.dialog.open(AddEditProductVariantComponent, {
        width: '700px',
        data: {
          ProductId: this.data?.productId ?? 0,
          VariantId: VariantId ?? 0
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.loadProductVariants();
        }
      });
    } else {
      this.alertservice.error("Product id is required")
    }
   
  }

  addEditVarientAttributes(VariantId: any): void {
    if (VariantId) {
      const dialogRef = this.dialog.open(VarientAttributeMappingComponent, {
        width: '900px',
        height: '500px',
        maxWidth:'none',
        data: {
          VariantId: VariantId ?? 0
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.loadProductVariants();
        }
      });
    } else {
      this.alertservice.error("Product id is required")
    }

  }

  onDelete(ProductId: number): void {
    // Use real delete API here
    // this.service.deleteCategory(categoryId).subscribe(() => {
    //   this.categories = this.categories.filter(c => c.CategoryId !== categoryId);
    // });
  }

}
