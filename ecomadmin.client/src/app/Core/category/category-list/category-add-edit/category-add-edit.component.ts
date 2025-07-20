import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../category.service';
import { NanaAlertService } from '../../../../Shared/nana-alert.service';

@Component({
  selector: 'app-category-add-edit',
  standalone: false,
  templateUrl: './category-add-edit.component.html',
  styleUrl: './category-add-edit.component.css'
})
export class CategoryAddEditComponent implements OnInit {
  categoryForm!: FormGroup;
  parentCategories: any[] = [];
  categories: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CategoryAddEditComponent>,
    private fb: FormBuilder, private service: CategoryService, private alertService: NanaAlertService) {
    this.createForm();

  }
  ngOnInit() {
    this.ddl_helper()
  } createForm(): void {
    const { categoryId, isActive, name, parentCategoryId } = this.data || {};
    this.categoryForm = this.fb.group({
      categoryId: [categoryId ?? 0],
      name: [name ?? name, Validators.required],  
      parentCategoryId: [parentCategoryId ?? parentCategoryId],
      isActive: [false, Validators.required]    });
  }
  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.alertService.error('Please Fill Required Fields');
      return;
    }
    const formData = this.categoryForm.value;
    if (formData) {
      this.service.AddUpdateCategories(formData).subscribe(data => {
        console.log("datadata", data)
        this.alertService.success('New Category Added Successfully');
        this.dialogRef.close(true);
      })
    } 

  }


  // In component
  get validCategories() {
    return this.parentCategories.filter(cat =>
      this.parentCategories.some(c => c.value === cat.value)
    );
  }

  ddl_helper() {
    const obj = {
      tableName: 'Categories',
      valueField: 'CategoryId',
      displayField: 'Name',
      whereClause: 'IsActive = 1 AND ParentCategoryId IS NULL'
    };

    this.service.getCategoriesDDl(obj).subscribe(x => {
      console.log(x)
      this.parentCategories = x || []
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
