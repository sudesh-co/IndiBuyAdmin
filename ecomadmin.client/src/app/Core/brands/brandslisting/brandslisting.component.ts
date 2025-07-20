import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridColumn } from '../../../Shared/custom-grid/custom-grid.component';
import { MatDialog } from '@angular/material/dialog';
import { BrandsService } from '../brands.service';
import { CommonService } from '../../../Shared/CommonService/common.service';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { AddEditBrandsComponent } from './add-edit-brands/add-edit-brands.component';

@Component({
  selector: 'app-brandslisting',
  standalone: false,
  templateUrl: './brandslisting.component.html',
  styleUrl: './brandslisting.component.css'
})
export class BrandslistingComponent implements OnInit, AfterViewInit {
  brands: any[] = [];
  columns: GridColumn[] = [];

  constructor(
    public dialog: MatDialog,
    private service: BrandsService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private alertService: NanaAlertService,
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadProducts();

  }
  loadProducts(): void {
    this.service.getBrandsList({}).subscribe(x => {
      this.brands = x.meta;
      this.columns = x.data
        .filter((c: any) => c.IsVisible)
        .sort((a: any, b: any) => a.SortOrder - b.SortOrder)
        .map((c: any) => ({
          field: c.FieldName,
          label: c.Label,
          type: c.FieldType
        }));

      this.cdr.detectChanges();
    }, err => console.error('Failed to load brands.', err));
  }
  addEditBrands(brand: any): void {
    console.log("brand", brand)
    const dialogRef = this.dialog.open(AddEditBrandsComponent, {
      width: '700px',
      data: brand ?? {}
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.loadProducts();
      }
    });
  }

  onDelete(BrandId: number): void {
    const obj = {
      TableName: 'Brands',
      SoftDelete: false,
      WhereClause: `BrandId =${BrandId}`
    };
    this.alertService.confirm("Are you sure you want to delete this brand?", "Confirm").subscribe(confirm => {
      if (confirm) {
        this.commonService.Dynamicdelete(obj).subscribe(x => {
          if (x) {
            this.alertService.success("The brand has been deleted.");
            this.loadProducts();
          } else {
            this.alertService.error("Failed to delete the brand.");
          }
        });
      }
    });
  }


}
