import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DiscountService } from '../../discount.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../../Shared/CommonService/common.service';
import { NanaAlertService } from '../../../../Shared/nana-alert.service';

@Component({
  selector: 'app-add-edit-discount',
  standalone: false,
  templateUrl: './add-edit-discount.component.html',
  styleUrl: './add-edit-discount.component.css'
})
export class AddEditDiscountComponent {
  title = 'Add/Edit Discount';
  discountForm!: FormGroup;
  discountTypes = [
    { display: 'Flat', value: 'Flat' },
    { display: 'Percentage', value: 'Percentage' }
  ];
  Products: any[] = [];
  Categories: any[] = [];
  UserGroups: any[] = [];

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private commonService: CommonService,
    private alertService: NanaAlertService,
    @Optional()  private dialogRef: MatDialogRef<AddEditDiscountComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadDropdowns();

    if (this.data?.discount) {
      this.title = 'Add/Edit Discount';
      this.patchForm(this.data.discount); 
    }
  }
  patchForm(discount: any): void {
    this.discountForm.patchValue({
      DiscountId: discount?.DiscountId ?? 0,
      Name: discount?.DiscountName ?? '',
      Type: discount?.Type ?? 'Flat',
      Value: discount?.Value ?? null,
      MinOrderAmount: discount?.MinOrderAmount ?? null,
      MaxDiscountAmount: discount?.MaxDiscountAmount ?? null,
      UsageLimit: discount?.UsageLimit ?? null,
      PerUserLimit: discount?.PerUserLimit ?? null,
      StartDate: discount?.StartDate ?? '',
      EndDate: discount?.EndDate ?? '',
      ProductIds: (discount.ProductIds || '').split(',').map(Number),
      CategoryIds: (discount.CategoryIds || '').split(',').map(Number),
      UserGroupIds: Array.isArray(discount?.UserGroups)
        ? discount.UserGroups.map((u: any) => u.UserGroupId)
        : [],
      IsActive: discount?.IsActive ?? true
    });

    let parsedConditions: any[] = [];

    try {
      parsedConditions = typeof discount?.Conditions === 'string'
        ? JSON.parse(discount.Conditions)
        : discount.Conditions;
    } catch (e) {
      console.error('Invalid JSON in Conditions:', e);
    }


    if (Array.isArray(parsedConditions) && parsedConditions.length > 0) {
      const formArray: FormArray = this.fb.array([]);

      parsedConditions.forEach((cond: any) => {
        formArray.push(this.fb.group({
          Type: [cond?.ConditionType ?? cond?.Type ?? '', Validators.required],
          Value: [cond?.ConditionValue ?? cond?.Value ?? '', Validators.required]
        }));
      });

      this.discountForm.setControl('Conditions', formArray);
    }

  }


  buildForm(): void {
    this.discountForm = this.fb.group({
      DiscountId: [0],
      Name: ['', Validators.required],
      Type: ['', Validators.required],
      Value: [null, Validators.required],
      MinOrderAmount: [null],
      MaxDiscountAmount: [null],
      UsageLimit: [null],
      PerUserLimit: [null],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      ProductIds: [[]],
      CategoryIds: [[]],
      UserGroupIds: [[]],
      Conditions: this.fb.array([]),
      IsActive: [true, Validators.required]
    });
    this.addCondition(); // Optionally add one by default

  }

  get conditions(): FormArray {
    return this.discountForm.get('Conditions') as FormArray;
  }


  addCondition(): void {
    this.conditions.push(
      this.fb.group({
        Type: ['', Validators.required],
        Value: ['', Validators.required]
      })
    );
  }

  setConditions(conditions: any[]): void {
    conditions.forEach(c => {
      this.conditions.push(
        this.fb.group({
          Type: [c.Type, Validators.required],
          Value: [c.Value, Validators.required]
        })
      );
    });
  }
  //get conditionControls(): FormArray {
  //  return this.discountForm.get('Conditions') as FormArray;
  //}
  get conditionControls(): FormGroup[] {
    return (this.discountForm.get('Conditions') as FormArray).controls as FormGroup[];
  }



  loadDropdowns(): void {
    this.discountService.getDropdownData('Products', 'ProductId', 'Name').subscribe(x => this.Products = x || []);
    this.discountService.getDropdownData('Categories', 'CategoryId', 'Name', 'IsActive = 1').subscribe(x => this.Categories = x || []);
    this.discountService.getDropdownData('UserGroups', 'UserGroupId', 'GroupName', 'IsActive = 1').subscribe(x => this.UserGroups = x || []);
  }

  onSubmit(): void {
    if (this.discountForm.invalid) {
      this.discountForm.markAllAsTouched();
      return;
    }

    const discountPayload = this.discountForm.value;
    this.discountService.saveDiscount(discountPayload).subscribe(res => {
      if (res) {
        this.alertService.success("Discount data has been saved successfully")
        this.dialogRef.close(true);
      }
    });
  }

  removeCondition(index: number) {
    this.conditions.removeAt(index);
  }



  closeDialog(): void {
    this.dialogRef.close();
  }
}
