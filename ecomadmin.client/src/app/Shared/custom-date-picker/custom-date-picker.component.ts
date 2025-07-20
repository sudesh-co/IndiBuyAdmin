import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-custom-date-picker',
  standalone: false,
  templateUrl: './custom-date-picker.component.html',
  styleUrl: './custom-date-picker.component.css',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class CustomDatePickerComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() field: string = '';
  @Input() IsReq: boolean = false;
  @Input() Caption: string = '';
  @Input() place: string = '';
  @Input() min: Date = new Date('1900-01-01');
  @Input() max!: Date ;
  @Output() date_change_event: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!(control && control.hasError(errorName));
  }

  IsValid(controlName: string): boolean {
    return this.formGroup.get(controlName)?.valid ?? false;
  }

  DateSelected(event: any): void {
    this.updateSavingDateFormat(this.formGroup, this.field);
    this.date_change_event.emit(event);
  }

  updateSavingDateFormat(formGroup: FormGroup, controlName: string): void {
    const formatted = this.changeFormatDate(formGroup.get(controlName), 'date');
    formGroup.get(controlName)?.setValue(formatted);
  }

  changeFormatDate(control: AbstractControl | null, formatType: 'date' | 'datetime' | 'time'): string | null {
    if (control?.value) {
      const date = moment(control.value);
      switch (formatType) {
        case 'datetime': return date.format('MM/DD/YYYY HH:mm:ss');
        case 'time': return date.format('HH:mm:ss');
        case 'date': return date.format('YYYY-MM-DD');
      }
    }
    return null;
  }
}
