import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NanaAlertService } from '../../../../Shared/nana-alert.service';
import { BrandsService } from '../../brands.service';

@Component({
  selector: 'app-add-edit-brands',
  standalone: false,
  templateUrl: './add-edit-brands.component.html',
  styleUrl: './add-edit-brands.component.css'
})
export class AddEditBrandsComponent implements OnInit {
  public brandsForm!: FormGroup;
  public title!: string;
  public imageUrls: any[]=[];

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    public alert_Service: NanaAlertService,
    private service: BrandsService,
    private alert_service: NanaAlertService,
    public dialogRef: MatDialogRef<AddEditBrandsComponent>) {

  }
  ngOnInit() {
    if (this.data?.BrandId) {
      this.service.getBrandDetails({ "BrandId": this.data?.BrandId }).subscribe(x => {
        this.imageUrls = x?.data || [];
        this.buildForm(x?.data[0])
      })
    } else {
      this.buildForm(null)

    }
  }

  public buildForm(data: any) {
    console.log(data)
    const { BrandName, IsActive, BrandLogo, BrandId } = data || {}
    this.brandsForm = this.fb.group({
      Name: [BrandName ?? null , [Validators.required]],
      IsActive: [IsActive ?? true],
      BrandLogo: [BrandLogo?? null ],
      BrandId: [BrandId ?? null ],
    })
  }
  onSubmit() {
    if (this.brandsForm.valid) {
      const formData = new FormData();

      const formValue = this.brandsForm.value;
      formData.append('Name', formValue.Name);
      formData.append('IsActive', formValue.IsActive);
      formData.append('BrandId', formValue.BrandId);
      formData.append('BrandLogo', formValue.BrandLogo);

      if (formValue.BrandLogo && formValue.BrandLogo.length > 0) {
        for (let file of formValue.BrandLogo) {
          formData.append('brandImages', file);
        }
      }
      if (this.brandsForm.valid) {
        this.service.AddUpdateBrands(formData).subscribe(res => {
          if (res) {
            this.alert_service.success("Brand details saved successfully")
            this.dialogRef.close(true);

          }
        }, err => {
          this.alert_service.error(err || "Somthing Went Wrong")

        });
      } else {
        this.alert_Service.error("please fill all required fields")
      }
    }}
  handleFiles(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.brandsForm.patchValue({ BrandLogo: files });
    }
  }

}
