import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { GridColumn } from '../../../Shared/custom-grid/custom-grid.component';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductVarientsComponent } from '../../variants/product-varients/product-varients.component';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { CommonService } from '../../../Shared/CommonService/common.service';

@Component({
  selector: 'app-product-listing',
  standalone: false,
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css'
})
export class ProductListingComponent implements OnInit, AfterViewInit {
  categories: any[] = [];
  parentCategories: any[] = [];

  columns: GridColumn[] = [];

  constructor(
    public dialog: MatDialog,
    private service: ProductService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private alertService: NanaAlertService,
    private route: ActivatedRoute, private router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadProducts();

  }
  loadProducts(): void {
    this.service.getProductList({}).subscribe(x => {
      this.categories = x.meta;

      this.columns = x.data
        .filter((c: any) => c.IsVisible)
        .sort((a: any, b: any) => a.SortOrder - b.SortOrder)
        .map((c: any) => ({
          field: c.FieldName,
          label: c.Label,
          type: c.FieldType
        }));

      this.parentCategories = this.categories.filter(c => c.ParentCategoryId === null);
      this.cdr.detectChanges();
    }, err => console.error('Failed to load categories.', err));
  }
  addEditCategory(product: any): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      width: '700px',
      data: {
        ProductId: product?.ProductId ?? 0,
      } 
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.loadProducts();
      }
    });
  }

  onDelete(ProductId: number): void {
    const obj = {
      TableName: 'Products',
      SoftDelete:true,
      WhereClause: `ProductId =${ProductId}`
    };
    this.alertService.confirm("Are you sure you want to delete this product?", "Confirm").subscribe(confirm => {
      if (confirm) {
        this.commonService.Dynamicdelete(obj).subscribe(x => {
          if (x) {
            this.alertService.success("The product has been deleted.");
            this.loadProducts();
          } else {
            this.alertService.error("Failed to delete the product.");
          }
        });
      }
    });
  }

  onClick(productId: any) {
    this.dialog.open(ProductVarientsComponent, {
      width: '1000px',
      maxWidth:'none',
      height: '800px',
      data: { productId } 
    });
  }
}
