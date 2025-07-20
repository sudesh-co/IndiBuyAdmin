import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridColumn } from '../../../Shared/custom-grid/custom-grid.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { CommonService } from '../../../Shared/CommonService/common.service';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';

@Component({
  selector: 'app-admin-users',
  standalone: false,
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  Users: any[] = [];
  parentCategories: any[] = [];

  columns: GridColumn[] = [];
  constructor(
    public dialog: MatDialog,
    private service: UsersService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private alertService: NanaAlertService,
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadUsers();

  }
  loadUsers(): void {
    this.service.getUsersList({}).subscribe(x => {
      this.Users = x.meta;
      console.log("dasfsfsf",x)
      this.columns = x.data
        .filter((c: any) => c.IsVisible)
        .sort((a: any, b: any) => a.SortOrder - b.SortOrder)
        .map((c: any) => ({
          field: c.FieldName,
          label: c.Label,
          type: c.FieldType
        }));
      this.cdr.detectChanges();
    }, err => console.error('Failed to load categories.', err));
  }
  addEditUsers(user: any): void {
    const dialogRef = this.dialog.open(AddEditUsersComponent, {
      width: '700px',
      data: {
        user: user || {},
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.loadUsers();
      }
    });
  }

  onDelete(ProductId: number): void {
    const obj = {
      TableName: 'Products',
      SoftDelete: true,
      WhereClause: `ProductId =${ProductId}`
    };
    this.alertService.confirm("Are you sure you want to delete this product?", "Confirm").subscribe(confirm => {
      if (confirm) {
        this.commonService.Dynamicdelete(obj).subscribe(x => {
          if (x) {
            this.alertService.success("The product has been deleted.");
            this.loadUsers();
          } else {
            this.alertService.error("Failed to delete the product.");
          }
        });
      }
    });
  }

  
}
