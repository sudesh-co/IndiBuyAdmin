import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import { CategoryService } from '../category.service';
import { GridColumn } from '../../../Shared/custom-grid/custom-grid.component';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { CommonService } from '../../../Shared/CommonService/common.service';

@Component({
  selector: 'app-category-list',
  standalone:false,
  templateUrl: './category-list.component.html',
  styleUrl:'./category-list.component.css'
})

export class CategoryListComponent implements OnInit, AfterViewInit {
  categories: any[] = [];
  subCategories: any[] = [];
  parentCategories: any[] = [];

  columns: GridColumn[] = [  ];
  subCategoryColumns: GridColumn[] = [  ];

  constructor(
    public dialog: MatDialog,
    private service: CategoryService,
    private alert_srv: NanaAlertService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadCategories();

  }
  onClick(categoriId: number) {
    this.loadSubCategories(categoriId)
  }
  loadCategories(): void {
    this.service.getCategoriesList({}).subscribe(x => {
      this.categories = x.meta;
      this.columns = x.data
        .filter((c: any) => c.IsVisible)
        .sort((a: any, b: any) => a.SortOrder - b.SortOrder)
        .map((c: any) => ({
          field: c.FieldName,
          label: c.Label,
          type: c.FieldType
        }));

      //this.parentCategories = this.categories.filter(c => c.ParentCategoryId === null);
      this.cdr.detectChanges();
    }, err => console.error('Error loading categories'));
  }
  loadSubCategories(code :number): void {
    this.service.getCategoriesList({"ParentCategoryId":code }).subscribe(x => {
      this.subCategories = x.meta;
      this.subCategoryColumns = x.data
        .filter((c: any) => c.IsVisible) 
        .sort((a: any, b: any) => a.SortOrder - b.SortOrder)
        .map((c: any) => ({
          field: c.FieldName,
          label: c.Label,
          type: c.FieldType
        }));

      //this.parentCategories = this.categories.filter(c => c.ParentCategoryId === null);
      this.cdr.detectChanges();
    }, err => console.error('Error loading categories'));
  }
  addEditCategory(category: any): void {
    const dialogRef = this.dialog.open(CategoryAddEditComponent, {
      width: '400px',
      data: {
        categoryId: category?.CategoryId,
        name: category?.Name,
        parentCategoryId: category?.ParentCategoryId,
        isActive: category?.IsActive
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.loadCategories();
        this.loadSubCategories(1025);
      }
    });
  }

  onDelete(CategoryId: number): void {
    const obj = {
      TableName: 'Categories',
      WhereClause: `CategoryId =${CategoryId}`
    };
    this.alert_srv.confirm("Are you sure to delete this Category?", "Confirm").subscribe(confirm => {
      if (confirm) {
        this.commonService.Dynamicdelete(obj).subscribe(x => {
          if (x) {
            this.alert_srv.success("Category has been deleted");
            this.loadCategories();
          } else {
            this.alert_srv.error("Delete failed");
          }
        });
      }
    });
  }
}
