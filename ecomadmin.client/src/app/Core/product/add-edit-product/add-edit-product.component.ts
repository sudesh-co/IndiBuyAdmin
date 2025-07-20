import { Component, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { ProductService } from '../product.service';
import { CommonService } from '../../../Shared/CommonService/common.service';

@Component({
  selector: 'app-add-edit-product',
  standalone: false,
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
  prodcutForm!: FormGroup;
  Categories!: any;
  Brands: any[] =[];
  imageUrls:any[] =[]
  title: string = "Add Product"
  constructor(private fb: FormBuilder, private alert: NanaAlertService, private service: ProductService, private Commonservice :CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddEditProductComponent>) {

  }
  ngOnInit() {
    this.ddl_helper()
    if (this.data?.ProductId) {
      this.service.getProductDetails({ "ProductId": this.data?.ProductId }).subscribe(x => {
        this.imageUrls = x?.imgdeta || {} || []
        this.buildForm(x?.data?.[0])
      })
    } else {
      this.buildForm(null)

    }

  }

  buildForm(data: any) {
  this.prodcutForm = this.fb.group({  
    ProductId: [data?.ProductId ?? 0]
     ,Name: [data?.Name ?? null ]
    , Description: [data?.Description ?? null]
    , CategoryId: [data?.CategoryId ?? null]
    , Price: [data?.Price ?? null]
    , SKU: [data?.SKU ?? null]
    , IsActive: [data?.IsActive ?? true]
    , productImages: [null]
    , Slug: [data?.Slug ?? null]
    , BrandId: [data?.BrandId ?? null]
  });
}
  onSubmit() {
    if (this.prodcutForm.valid) {
      const formData = new FormData();
      const formValue = this.prodcutForm.value;
      formData.append('Name', formValue.Name);
      formData.append('ProductId', formValue.ProductId || 0);
      formData.append('Description', formValue.Description);
      formData.append('Price', formValue.Price);
      formData.append('SKU', formValue.SKU);
      formData.append('CategoryId', formValue.CategoryId);
      formData.append('IsActive', formValue.isActive);
      formData.append('Slug', formValue.Slug);
      formData.append('BrandId', formValue.BrandId);

      if (formValue.productImages && formValue.productImages.length > 0) {
        for (let file of formValue.productImages) {
          formData.append('productImages', file);
        }
      }
      if (this.prodcutForm.valid) {

        this.service.AddUpdateProducts(formData).subscribe(res => {
          if (res) {
            this.alert.success("Product details saved successfully")
            this.dialogRef.close(true);

          }
        }, err => {
          this.alert.error(err || "Somthing Went Wrong")

        });
      } else {
        this.alert.error("Please fil all required fields")

      }
    } else {
      this.alert.error("Please fil all required fields")

    }
  }

  ddl_helper() {
    const obj = {
      tableName: 'Categories',
      valueField: 'CategoryId',
      displayField: 'Name',
      whereClause: 'IsActive = 1 AND ParentCategoryId IS NULL'
    };

    this.service.getCategoriesDDl(obj).subscribe(x => {
      this.Categories = x || []
    })
    const brd_obj = {
      tableName: 'Brands',
      valueField: 'BrandId',
      displayField: 'Name',
      whereClause: 'IsActive = 1 '
    };

    this.service.getBrandsDDl(brd_obj).subscribe(x => {
      this.Brands = x || []
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }
  handleFiles(event:any) {

  }

  public DynamicDeleteImages(Image: any) {
    const obj = {
      tableName: 'ProductImages',
      whereClause: `ImageId = ${Image.ImageId}`,
      filePath: `Uploads/product-images/${Image.ImageId}/${Image.ImageUrl}`
    }
    this.Commonservice.DynamicDeleteImages(obj).subscribe(x => {
      if (x) {
        this.alert.info("Image was deleted succefully")
      }
    })
  }
}
