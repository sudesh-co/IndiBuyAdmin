import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-ckeck',
  standalone: false,
  templateUrl: './custom-ckeck.component.html',
  styleUrls: ['./custom-ckeck.component.css']
})
export class CustomCkeckComponent {
  @Input() formGroup!: FormGroup;
  @Input() field!: string;
  @Input() label: string = '';
  @Input() IsReq: boolean = false;
  @Input() useToggle: boolean = false;
  @Input() options: { label: string, value: any }[] = [];

  @Output() valueChange = new EventEmitter<any>();

  onToggleChange(value: boolean): void {
    this.formGroup.get(this.field)?.setValue(value);
    this.valueChange.emit(value);
  }

  onMultiCheckChange(value: any, isChecked: boolean): void {
    const control = this.formGroup.get(this.field);
    const current = Array.isArray(control?.value) ? [...control.value] : [];

    if (isChecked) {
      current.push(value);
    } else {
      const index = current.indexOf(value);
      if (index >= 0) current.splice(index, 1);
    }

    control?.setValue(current);
    this.valueChange.emit(current);
  }

  isOptionChecked(value: any): boolean {
    return this.formGroup.get(this.field)?.value?.includes(value);
  }
  get control(): FormControl {
    return this.formGroup.get(this.field) as FormControl;
  }

}
