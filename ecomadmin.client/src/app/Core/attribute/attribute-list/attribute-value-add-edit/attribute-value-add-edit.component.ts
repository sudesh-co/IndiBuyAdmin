import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AttributeService } from '../../attribute.service';
import { NanaAlertService } from '../../../../Shared/nana-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-attribute-value-add-edit',
  standalone: false,
  templateUrl: './attribute-value-add-edit.component.html',
  styleUrl: './attribute-value-add-edit.component.css'
})
export class AttributeValueAddEditComponent implements OnInit {
  public attrFormValues!: FormGroup;
  public Attributes: any[] = [];
  public title: string ="Add Attrinbute Value";

  constructor(
    private fb: FormBuilder,
    private service: AttributeService,
    private alert: NanaAlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AttributeValueAddEditComponent>
  ) { }

  ngOnInit() {
    this.ddl_helper();
    this.attrFormValues = this.fb.group({
      ValueId: [this.data?.ValueId ?? ""],
      attr_value: [this.data?.AttributeValue ?? ""],
      attribute: [this.data?.attr_id ?? 0],
      isActive: [this.data?.ValueIsActive ?? false],
    });
  }

  registerAttributesValues() {
    if (this.attrFormValues.valid) {
      this.service.AddUpdateAttrubutesValue(this.attrFormValues.value).subscribe({
        next: () => {
          this.alert.success("Attribute Value saved.");
          this.dialogRef.close(true);
        },
        error: () => this.alert.error("Something went wrong.")
      });
    } else {
      this.alert.error("Please fill all required fields");
    }
  }

  ddl_helper() {
    const obj = {
      tableName: 'ProductAttributes',
      valueField: 'AttributeId',
      displayField: 'Name',
      whereClause: 'IsActive = 1'
    };

    this.service.getCategoriesDDl(obj).subscribe(x => {
      this.Attributes = x || [];
    });
  }
}
