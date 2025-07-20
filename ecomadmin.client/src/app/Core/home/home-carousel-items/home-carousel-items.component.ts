import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridColumn } from '../../../Shared/custom-grid/custom-grid.component';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { CommonService } from '../../../Shared/CommonService/common.service';
import { HomeService } from '../home.service';
import { AddEditHomeCarouselItemsComponent } from './add-edit-home-carousel-items/add-edit-home-carousel-items.component';

@Component({
  selector: 'app-home-carousel-items',
  standalone: false,
  templateUrl: './home-carousel-items.component.html',
  styleUrl: './home-carousel-items.component.css'
})
export class HomeCarouselItemsComponent implements OnInit, AfterViewInit {
  items: any[] = [];
  columns: GridColumn[] = [];

  constructor(
    public dialog: MatDialog,
    private service: HomeService,
    private Commonservice: CommonService,
    private cdr: ChangeDetectorRef,
    private alertService: NanaAlertService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.loadCarouselItems();
  }
  loadCarouselItems(): void {
    this.service.getCarouselList({}).subscribe(result => {
      this.items = result.meta;
      this.columns = result.data
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

  addEditItem(item: any): void {
    const dialogRef = this.dialog.open(AddEditHomeCarouselItemsComponent, {
      width: '800px',
      maxWidth:"none",
      data: { Id: item?.Id ?? 0 }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) this.loadCarouselItems();
    });
  }

  onDelete(Id: number): void {
    const obj = {
      TableName: 'HomeCarouselItems',
      SoftDelete: true,
      WhereClause: `IsDeleted = 0 AND Id = ${Id}`
    };
    this.alertService.confirm("Are you sure you want to delete this carousel item?", "Confirm").subscribe(confirm => {
      if (confirm) {
        this.commonService.Dynamicdelete(obj).subscribe(x => {
          if (x) {
            this.alertService.success("The item has been deleted.");
            this.loadCarouselItems();
          } else {
            this.alertService.error("Failed to delete the item.");
          }
        });
      }
    });
  }
  
}
