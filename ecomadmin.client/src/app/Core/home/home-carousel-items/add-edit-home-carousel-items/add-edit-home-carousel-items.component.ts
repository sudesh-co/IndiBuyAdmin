import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../home.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NanaAlertService } from '../../../../Shared/nana-alert.service';
import { CommonService } from '../../../../Shared/CommonService/common.service';

@Component({
  selector: 'app-add-edit-home-carousel-items',
  standalone: false,
  templateUrl: './add-edit-home-carousel-items.component.html',
  styleUrl: './add-edit-home-carousel-items.component.css'
})
export class AddEditHomeCarouselItemsComponent implements OnInit {
  carouselForm!: FormGroup;
  Categories: any[] = [];
  Products: any[] = [];
  SubCategories: any[] = [];
  imageUrls: any[] = [];
  title: string = "Add Carousel Item";

  constructor(
    private fb: FormBuilder,
    private service: HomeService,
    private alert: NanaAlertService,
    private Commonservice: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditHomeCarouselItemsComponent>
  ) { }

  ngOnInit(): void {
    this.ddl_helper();
    if (this.data?.Id) {
      this.service.getCarouselItemById(this.data.Id).subscribe(res => {
        this.imageUrls = res?.imgdeta || [];
        this.buildForm(res.data[0]);

      });
    } else {
      this.buildForm(null);
    }
  }

  buildForm(data: any): void {
    this.carouselForm = this.fb.group({
      Id: [data?.Id ?? 0],
      Title: [data?.Title ?? '', Validators.required],
      Subtitle: [data?.Subtitle ?? ''],
      CtaText: [data?.CtaText ?? ''],
      CtaLink: [data?.CtaLink ?? ''],
      ProductId: [data?.ProductId ?? null],
      CategoryId: [data?.CategoryId ?? null],
      SubCategoryId: [data?.SubCategoryId ?? null],
      StartDate: [data?.StartDate ?? '', Validators.required],
      EndDate: [data?.EndDate ?? '', Validators.required],
      Priority: [data?.Priority ?? 0, Validators.required],
      Status: [data?.Status ?? 'active', Validators.required],
      Image: [null] // for new file upload
    });
    this.carouselForm?.get('CategoryId')?.valueChanges?.subscribe(x => {
      if (x) {
        this.service.getProducts(x).subscribe(res => this.Products = res || []);
        this.service.getSubCategories(x).subscribe(res => this.SubCategories = res || []);
      }
    })
  }

  onSubmit(): void {
    if (this.carouselForm.valid) {
      const formData = new FormData();
      const value = this.carouselForm.value;

      for (const key in value) {
        if (value[key] !== null && key !== 'Image') {
          formData.append(key, value[key]);
        }
      }
      if (value.Image && value.Image.length > 0) {
        for (let file of value.Image) {
          formData.append('Image', file);
        }
      }


      this.service.saveOrUpdateCarouselItem(formData).subscribe({
        next: () => {
          this.alert.success("Carousel item saved successfully!");
          this.dialogRef.close(true);
        },
        error: () => {
          this.alert.error("Something went wrong.");
        }
      });
    } else {
      this.alert.error("Please fill all required fields.");
    }
  }

  ddl_helper(): void {
    this.service.getCategories().subscribe(res => this.Categories = res || []);

  }

  handleImageUpload(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.carouselForm.patchValue({ Image: files });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  public DynamicDeleteImages(Image: any) {
    const obj = {
      tableName: 'CarouselImages',
      whereClause: `ImageId = ${Image.ImageId}`,
      filePath: `Uploads/carousel-images/${Image.ImageId}/${Image.ImageName}`
    }
    this.Commonservice.DynamicDeleteImages(obj).subscribe(x => {
      if (x) {
        this.alert.info("Image was deleted succefully")
      }
    })
  }
}
