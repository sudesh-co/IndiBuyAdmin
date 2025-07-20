import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NanaAlertService } from '../../../../Shared/nana-alert.service';
import { VariantsService } from '../../../variants.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../../Shared/CommonService/common.service';

@Component({
  selector: 'app-add-edit-product-variant',
  standalone: false,
  templateUrl: './add-edit-product-variant.component.html',
  styleUrl: './add-edit-product-variant.component.css'
})
export class AddEditProductVariantComponent implements OnInit {
  title!: string;
  constructor(private fb: FormBuilder, private alert: NanaAlertService, private service: VariantsService, private Commonservice: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddEditProductVariantComponent>) {

  }
  variantForm!: FormGroup;
  imageUrls: string[] = [];

  ngOnInit() {
   
    if (this.data?.VariantId) {
      this.service.getProductVariantDetails({ "VariantId": this.data?.VariantId ?? 0 }).subscribe(res => {
        console.log(res)
        this.imageUrls = res.imgdeta || []//map((x: any) => x.ImageUrl);
        this.buildForm(res.data?.[0])
      }, err => {
        this.alert.error("Somthing went wrong while fetching varient details" + err)
      })
    } else {
      this.buildForm(null)

    }

  }

  buildForm(data: any) {
    console.log(data)
    const { VariantId, SKU, ProductId, Price, Stock, IsActive, variantImages, Slug } = data || {}
    this.variantForm = this.fb.group({
      VariantId: [VariantId ?? 0],
      ProductId: [this.data?.productId ?? ProductId ?? null, Validators.required],
      SKU: [SKU ?? '', [Validators.required, Validators.maxLength(100)]],
      Slug: [Slug ?? '', [Validators.required, Validators.maxLength(100)]],
      Price: [Price ?? 0, [Validators.required]],
      Stock: [Stock ?? 0, [Validators.required]],
      IsActive: [IsActive ?? true],
      variantImages: [[null]]
    });
  }

  onSubmit() {
    if (true) {
      const formData = new FormData();

      const formValue = this.variantForm.value;
      formData.append('VariantId', formValue.VariantId);
      formData.append('ProductId', formValue.ProductId || this.data?.ProductId);
      formData.append('SKU', formValue.SKU);
      formData.append('Price', formValue.Price);
      formData.append('Slug', formValue.Slug);
      formData.append('Stock', formValue.Stock);
      formData.append('IsActive', formValue.isActive);

      if (formValue.variantImages && formValue.variantImages.length > 0) {
        for (let file of formValue.variantImages) {
          formData.append('variantImages', file);
        }
      }
      if (true) {
        this.service.addUpdateProductVariants(formData).subscribe(res => {
          if (res) {
            this.alert.success("Variant details saved successfully")
            this.dialogRef.close(true);
          }
        }, err => {
          this.alert.error(err || "Somthing Went Wrong")

        });
      } else {
        this.alert.error("Please fil all required fields")

      }
    }
    else {
      this.alert.info("Please fill all required fields")
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  handleFiles(files: any) {
    this.variantForm.get('variantImages')?.setValue(files);
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
