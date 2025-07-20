import { Component, Inject, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { GridConfigFormService } from "./grid-config-form.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GridColumn } from "../custom-grid.component";

export interface GridFieldConfig {
  id?: number;
  entityName: string;
  fieldName: string;
  label: string;
  fieldType: string;
  isVisible: boolean;
  sortOrder: number;
}

@Component({
  selector: 'app-grid-config-form',
  standalone: false,
  templateUrl: './grid-config-form.component.html',
  styleUrls: ['./grid-config-form.component.css']
})
export class GridConfigFormComponent implements OnInit, OnChanges {
  @Input() entityName!: string;

  configList: FormArray;
  formGroup: FormGroup;

  fieldTypes = ['text', 'chip', 'date', 'icon', 'checkbox'];

  constructor(
    public dialogRef: MatDialogRef<GridConfigFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GridColumn[] | null,
    private fb: FormBuilder,
    private service: GridConfigFormService
  ) {
    this.configList = this.fb.array([]);
    this.formGroup = this.fb.group({
      configs: this.configList
    });
  }

  ngOnInit(): void {
    if (this.entityName) {
      this.loadConfig(this.entityName);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entityName'] && changes['entityName'].currentValue) {
      this.loadConfig(changes['entityName'].currentValue);
    }
  }

  onEntityNameChange(): void {
    if (this.entityName) {
      this.loadConfig(this.entityName);
    }
  }

  private loadConfig(entityName: string) {
    this.service.getConfig(entityName).subscribe(configs => {
      this.configList.clear();
      configs.forEach(cfg => this.configList.push(this.createGroup(cfg)));
    });
  }

  createGroup(cfg: GridFieldConfig): FormGroup {
    return this.fb.group({
      id: [cfg.id],
      entityName: [cfg.entityName],
      fieldName: [{ value: cfg.fieldName, disabled: true }],
      label: [cfg.label],
      fieldType: [cfg.fieldType],
      isVisible: [cfg.isVisible],
      sortOrder: [cfg.sortOrder]
    });
  }

  save(): void {
    if (this.formGroup.valid) {
      const updatedConfigs = this.configList.getRawValue();
      this.service.saveConfig(updatedConfigs).subscribe(() => {
        alert('Configuration saved successfully');
      });
    }
  }
}
