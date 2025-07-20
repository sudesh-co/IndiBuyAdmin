import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig, FieldConfigService } from '../field-config.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-field-config-form',
  standalone: false,
  templateUrl: './field-config-form.component.html',
  styleUrl: './field-config-form.component.css'
})
export class FieldConfigFormComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FieldConfig,
    private fb: FormBuilder,
    private service: FieldConfigService,
    public dialogRef: MatDialogRef<FieldConfigFormComponent>
  ) {
    this.form = this.fb.group({
      viewName: [data?.viewName, Validators.required],
      columnName: [data?.columnName, Validators.required],
      fieldName: [data?.fieldName, Validators.required],
      label: [data?.label],
      fieldType: [data?.fieldType || 'text'],
      isVisible: [data.isVisible ?? true],
      sortOrder: [data?.sortOrder || 1]
    });

    if (data.columnName) {
      this.form.get('columnName')?.disable(); // prevent editing on update
    }
  }

  save() {
    if (this.form.valid) {
      const payload = { ...this.form.getRawValue() };
      this.service.upsert(payload).subscribe(() => this.dialogRef.close(true));
    }
  }
}
