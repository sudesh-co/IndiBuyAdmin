import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AttributeService } from '../../attribute.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NanaAlertService } from '../../../../Shared/nana-alert.service';

@Component({
  selector: 'app-attribute-add-edit',
  standalone: false,
  templateUrl: './attribute-add-edit.component.html',
  styleUrl: './attribute-add-edit.component.css'
})
export class AttributeAddEditComponent implements OnInit {
  title:string = "Add Attributes"
  public attrForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AttributeService,
    private alert: NanaAlertService,
    public dialogRef: MatDialogRef<AttributeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.attrForm = this.fb.group({
      attr_id: [this.data?.attr_id ?? 0],
      attr_name: [this.data?.AttributeName ?? ""],
      isActive: [this.data?.AttributeIsActive ?? false],
    });
  }

  registerAttributes() {
    if (this.attrForm.valid) {
      this.service.AddUpdateAttrubutes(this.attrForm.value).subscribe({
        next: () => {
          this.alert.success("Attribute saved.");
          this.dialogRef.close(true);
        },
        error: () => this.alert.error("Something went wrong.")
      });
    } else {
      this.alert.error("Please fill all required fields");
    }
  }
}
