import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-text-area',
  standalone: false,
  templateUrl: './custom-text-area.component.html',
  styleUrl: './custom-text-area.component.css'
})
export class CustomTextAreaComponent {
  @Input() formGroup!: FormGroup;
  @Input() field: string = '';
  @Input() Caption!: string;
  @Input() IsReq: boolean = false;
  @Input() IsPattern: boolean = false;
  @Input() pattern_msg: string = '';
  @Input() max_min_msg: string = '';
  @Input() maxLen: number = 500;
  @Input() minLen: number = 0;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() customclassname: string = '';

  // Optional: Add control flags back if needed
  @Input() IsBlockAllChar: boolean = false;
  @Input() IsBlockAllNum: boolean = false;

  @Output() TextValueChangeEvent = new EventEmitter<any>();
  @Output() TextBlurEvent = new EventEmitter<any>();

  hasError(controlName: string, errorName: any): boolean {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  IsValid(controlName: string): boolean {
    return this.formGroup.controls[controlName]?.valid || false;
  }

  smartTextValueChange(event: any): void {
    this.TextValueChangeEvent.emit(event);
  }

  smartTextBlur(event: any): void {
    this.TextBlurEvent.emit(event);
    this.trimLeadingSpaces();
  }

  trimLeadingSpaces(): void {
    const control = this.formGroup.get(this.field);
    if (control && typeof control.value === 'string') {
      control.setValue(control.value.replace(/^\s+/, ''), { emitEvent: false });
    }
  }

  handleKeydown(evt: KeyboardEvent): void {
    if (this.IsBlockAllChar) this.blockAllChar(evt);
    if (this.IsBlockAllNum) this.blockAllNum(evt);
  }

  private blockAllChar(evt: KeyboardEvent): void {
    const allowedKeys = new Set([8, 9, 13, 16, 20, 17, 27, 32, 35, 36, 37, 38, 39, 40, 46]);
    const key = evt.key.toLowerCase();
    if ((evt.ctrlKey || evt.metaKey) && ['a', 'c', 'v'].includes(key)) return;
    if (allowedKeys.has(evt.keyCode)) return;
    evt.preventDefault();
  }

  private blockAllNum(evt: KeyboardEvent): void {
    const numCodes = new Set([
      ...Array.from({ length: 10 }, (_, i) => 48 + i), // 0-9
      ...Array.from({ length: 10 }, (_, i) => 96 + i)  // Numpad 0-9
    ]);
    if (numCodes.has(evt.which ?? evt.keyCode)) {
      evt.preventDefault();
    }
  }
}
