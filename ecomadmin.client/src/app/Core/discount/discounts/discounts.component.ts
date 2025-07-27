import { ChangeDetectorRef, Component } from '@angular/core';
import { AddEditDiscountComponent } from './add-edit-discount/add-edit-discount.component';
import { MatDialog } from '@angular/material/dialog';
import { DiscountService } from '../discount.service';
import { CommonService } from '../../../Shared/CommonService/common.service';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GridColumn } from '../../../Shared/custom-grid/custom-grid.component';

@Component({
  selector: 'app-discounts',
  standalone: false,
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.css'
})
export class DiscountsComponent {
  discounts: any[] = [];
  columns: GridColumn[] = [];

  constructor(
    public dialog: MatDialog,
    private service: DiscountService, 
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private alertService: NanaAlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.loadDiscounts();
  }

  loadDiscounts(): void {
    this.service.getDiscountList({}).subscribe((x: any) => {
      this.discounts = x?.meta;
      console.log(this.discounts)
      this.columns = x.data
        .filter((c: any) => c.IsVisible)
        .sort((a: any, b: any) => a.SortOrder - b.SortOrder)
        .map((c: any) => ({
          field: c.FieldName,
          label: c.Label,
          type: c.FieldType
        }));

      this.cdr.detectChanges();
    }, err => console.error('Failed to load discounts.', err));
  }

  addEditDiscount(discount: any): void {
    const dialogRef = this.dialog.open(AddEditDiscountComponent, {
      width: '900px',
      maxWidth:'none',
      data: {
        discount: discount || {}
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.loadDiscounts();
      }
    });
  }

  onDelete(DiscountId: number): void {
    const obj = {
      TableName: 'Discounts',
      SoftDelete: true,
      WhereClause: `DiscountId = ${DiscountId}`
    };

    this.alertService.confirm("Are you sure you want to delete this discount?", "Confirm").subscribe(confirm => {
      if (confirm) {
        this.commonService.Dynamicdelete(obj).subscribe(x => {
          if (x) {
            this.alertService.success("The discount has been deleted.");
            this.loadDiscounts();
          } else {
            this.alertService.error("Failed to delete the discount.");
          }
        });
      }
    });
  }

  //onClick(discountId: any) {
  //  this.dialog.open(DiscountConditionsComponent, { // Optional, if you're using a variant-style child modal
  //    width: '1000px',
  //    maxWidth: 'none',
  //    height: '800px',
  //    data: { discountId }
  //  });
  //}

}
