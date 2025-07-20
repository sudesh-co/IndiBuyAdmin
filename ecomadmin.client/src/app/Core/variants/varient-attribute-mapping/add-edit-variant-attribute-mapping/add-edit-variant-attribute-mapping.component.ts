import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NanaAlertService } from '../../../../Shared/nana-alert.service';
import { VariantsService } from '../../../variants.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-variant-attribute-mapping',
  standalone: false,
  templateUrl: './add-edit-variant-attribute-mapping.component.html',
  styleUrl: './add-edit-variant-attribute-mapping.component.css'
})
export class AddEditVariantAttributeMappingComponent {
  title!: string;
  variantAttrMappingForm!: FormGroup;
  Attributes: any[]=[]
  AttributeValues: any[]=[]
  constructor(private fb: FormBuilder, private alert: NanaAlertService, private service: VariantsService,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddEditVariantAttributeMappingComponent>) {

  }

  ngOnInit() {
    this.get_attr_helper();
    if (this.data?.VariantId) {
      this.service.getvariantAttributeList({ "VariantId": this.data?.VariantId ?? 0 }).subscribe(res => {
        this.buildForm(res.meta?.[0])
      }, err => {
        this.alert.error("Failed to load variant information." + err)
      })
    } else {
      this.buildForm(null)
    }

  }

  buildForm(data: any) {
    const { VariantId } = data || {}
    this.variantAttrMappingForm = this.fb.group({
      VariantId: [VariantId ?? this.data?.VariantId ?? 0],
      ValueId: [null, Validators.required],
      AttributeId: [null, [Validators.required]],
    });
    this.variantAttrMappingForm.get('AttributeId')?.valueChanges.subscribe(attrId => {
      if (attrId) {
        this.get_attr_value_helper(attrId ?? 0);
      }
    })
  }

  onSubmit() {
    if (this.variantAttrMappingForm.valid) {
        this.service.addUpdateVariantAttribute(this.variantAttrMappingForm.value).subscribe(res => {
          if (res) {
            this.alert.success("The attribute has been mapped successfully.")
            this.dialogRef.close(true);
          }
        }, err => {
          this.alert.error(err?.message || "Somthing Went Wrong")

        });
      } else {
        this.alert.error("Please fil all required fields")
      }
    }
  
  get_attr_helper() {
    const attr_obj = {
      tableName: 'ProductAttributes',
      valueField: 'AttributeId',
      displayField: 'Name',
      whereClause: 'IsActive = 1'
    };
    this.service.VariantAttributeDDL(attr_obj).subscribe(x => {
      this.Attributes = x || []
    })

    
  }
  get_attr_value_helper(AttributeId :number) {
    const attr_val_obj = {
      tableName: 'ProductAttributeValues',
      valueField: 'ValueId',
      displayField: 'Value',
      whereClause: ` ISNULL(AttributeId ,0) = ${AttributeId}`
    };
    this.service.VariantAttributeDDL(attr_val_obj).subscribe(x => {
      this.AttributeValues = x || []
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
