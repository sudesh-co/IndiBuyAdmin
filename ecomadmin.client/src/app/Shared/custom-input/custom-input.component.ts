import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone:false,
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() field: string = '';
  @Input() Caption!: string;
  @Input() noteMsg!: string;
  @Input() IsReq: boolean = false;
  @Input() IsPattern: boolean = false;
  @Input() pattern_msg: string = '';
  @Input() max_min_msg: string = '';
  @Input() maxLen: number = 500;
  @Input() minLen: number = 0;
  @Input() Isnum: string = 'text';
  @Input() IsBlockAllChar: boolean = false;
  @Input() IsBlockAllNum: boolean = false;
  @Input() block_spl_char_and_space: boolean = false;
  @Input() block_spl_char: boolean = false;
  @Input() block_space: boolean = false;
  @Input() is_OnlyAlphabet: boolean = false;
  @Input() is_bit: boolean = false;
  @Input() is_numeric: boolean = false;
  @Input() is_numeric_with_minus: boolean = false;
  @Input() is_numeric_without_minus_and_decimal: boolean = false;
  @Input() maxnumvalue!: string ;
  @Input() digitafterdecimal!: string ;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() customclassname: string = 'input_style';

  @Output() TextValueChangeEvent = new EventEmitter<any>();
  @Output() TextBlurEvent = new EventEmitter<any>();

  hasError = (controlName: string, errorName: any) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  IsValid = (controlName: string) => {
    return this.formGroup.controls[controlName].valid;
  };

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

  blockAllChar(evt: KeyboardEvent): void {
    const charCode = evt.which ?? evt.keyCode;

    // Allow navigation keys, backspace, delete, etc.
    const allowedKeys = new Set([
      8, 9, 13, 27, 35, 36, 37, 38, 39, 40, 46
    ]);

    const isCtrlOrCmd = evt.ctrlKey || evt.metaKey;
    const key = evt.key.toLowerCase();

    if (
      (charCode >= 48 && charCode <= 57) ||           // 0-9
      (charCode >= 96 && charCode <= 105) ||          // Numpad 0-9
      allowedKeys.has(charCode) ||
      (isCtrlOrCmd && ['a', 'c', 'v', 'x'].includes(key))
    ) {
      return;
    }

    evt.preventDefault();
  }

  blockAllNum(evt: KeyboardEvent): void {
    const numCodes = new Set([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]);
    if (numCodes.has(evt.which ?? evt.keyCode)) {
      evt.preventDefault();
    }
  }

  // Additional utility methods
  private isKeyMatch(evt: KeyboardEvent, regex: RegExp): boolean {
    const val = this.formGroup.controls[this.field]?.value || '';
    return regex.test(val + evt.key);
  }

  text_key_event(event: KeyboardEvent): boolean {
    if (this.is_bit) return this.bit_key(event);
    if (this.maxnumvalue || this.digitafterdecimal) return this.check_decimal_max(event);
    if (this.block_spl_char_and_space) return this.blockSpecialCharAndSpace(event);
    if (this.block_spl_char) return this.blockSpecialChar(event);
    if (this.block_space) return this.blockSpace(event);
    if (this.is_numeric_without_minus_and_decimal) return this.isNumberWithoutMinusAndDecimal(event);
    if (this.is_numeric_with_minus) return this.isNumberOrMinusSignKey(event);
    if (this.is_numeric) return this.isNumberKey(event);
    if (this.is_OnlyAlphabet) return this.alphabetOnly(event);
    return true;
  }

  isNumberKey(evt: KeyboardEvent): boolean {
    return this.isKeyMatch(evt, /^\d*\.?\d*$/);
  }

  isNumberOrMinusSignKey(evt: KeyboardEvent): boolean {
    return this.isKeyMatch(evt, /^-?\d*\.?\d*$/);
  }


  isNumberWithoutMinusAndDecimal(evt: KeyboardEvent): boolean {
    const charCode = evt.which ?? evt.keyCode;
    return charCode >= 48 && charCode <= 57;
  }
  

  bit_key(evt: KeyboardEvent): boolean {
    const charCode = evt.charCode;
    const val = this.formGroup.controls[this.field]?.value || '';
    return ((charCode === 48 || charCode === 49) && val.length === 0) || charCode === 8;
  }

  blockSpace(evt: KeyboardEvent): boolean {
    return (evt.which ?? evt.keyCode) !== 32;
  }

  blockSpecialChar(evt: KeyboardEvent): boolean {
    const charCode = evt.which ?? evt.keyCode;
    return (charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32;
  }

  alphabetOnly(evt: KeyboardEvent): boolean {
    const charCode = evt.which ?? evt.keyCode;
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32;
  }

  blockSpecialCharAndSpace(evt: KeyboardEvent): boolean {
    const charCode = evt.which ?? evt.keyCode;
    return (charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 8;
  }

  check_decimal_max(event: KeyboardEvent): boolean {
    if (!this.isNumberKey(event)) return true;
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;
    const selectedText = window.getSelection()?.toString() || '';
    let value = input.value;
    if (!value || value === selectedText) value = '';
    value = value.slice(0, cursorPosition) + event.key + value.slice(cursorPosition);

    const withinMax = !this.maxnumvalue || Number(value) <= Number(this.maxnumvalue);
    const decimalValid = !this.digitafterdecimal || value.split('.')[1]?.length <= Number(this.digitafterdecimal);

    return withinMax && decimalValid;
  }
}
