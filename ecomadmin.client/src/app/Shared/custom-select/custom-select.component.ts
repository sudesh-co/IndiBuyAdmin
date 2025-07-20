import {
  Component, Input, OnInit, Output, EventEmitter,
  ViewChild, AfterViewInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-custom-select',
  standalone:false,
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent implements OnInit, AfterViewInit {
  @Input() formGroup!: FormGroup;
  @Input() field: string = '';
  @Input() Caption!: string;
  @Input() IsReq: boolean = false;
  @Input() options: any[] = [];
  @Input() display_property: string = 'display';
  @Input() value_property: string = 'value';
  @Input() multi_select: boolean = false;
  @Input() show_caption: boolean = true;
  @Input() return_mapping_field: string = '';
  @Input() has_initial_focus: boolean = false;
  @Input() has_focus: boolean = false;

  @Output() OptionValueChangeEvent = new EventEmitter<any>();

  @ViewChild('selectbox') selectBox!: MatSelect;

  constructor() { }

  ngOnInit(): void {
    const control = this.formGroup.get(this.field);
    const selectedVal = control?.value;

    if (selectedVal != null) {
      const match = this.options.find(
        opt => opt[this.value_property] === selectedVal
      );
      if (match) this.getSelOptionValue(match);
    }
  }

  ngAfterViewInit(): void {
    if (this.has_focus) {
      setTimeout(() => {
        this.selectBox.focus();
      }, 300);
    }
  }

  has_error(controlName: string, errorName: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  IsValid(controlName: string): boolean {
    return this.formGroup.get(controlName)?.valid || false;
  }

  getSelOptionValue(selected: any): void {
    try {
      if (this.return_mapping_field) {
        const mappings = this.return_mapping_field.split(',');

        for (const map of mappings) {
          const [formControlName, eventProp] = map.split('|');

          if (formControlName && eventProp && this.formGroup.get(formControlName)) {
            const value = selected?.[eventProp] ?? null;
            this.formGroup.get(formControlName)?.setValue(value);
          }
        }
      }
    } catch (error) {
      console.error('Mapping error:', error);
    }

    this.OptionValueChangeEvent.emit(selected);
  }

  compareFn = (a: any, b: any) => {
    if (!a || !b) return false;
    return a[this.value_property] === b[this.value_property];
  };

  getOptionLabel(value: any): string {
    const match = this.options.find(opt => opt[this.value_property] === value);
    return match ? match[this.display_property] : value;
  }
  removeSelectedOption(value?: any): void {
    const control = this.formGroup.get(this.field);
    this.formGroup.get(value)?.setValue(null);
  }

}
