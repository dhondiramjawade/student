import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  /**
 * Value of input
 */
  @Input() value: number | string = "";

  /**
   * Mat appearance of input
   */
  @Input() appearance: MatFormFieldAppearance = "outline";

  /**
   * Lable of input
   */
  @Input() lable = "";

  /**
   * Input types
   */
  @Input() type: 'text' | 'number' | 'email' = 'text';

  /**
   * Required field
   */
  @Input() required = false;

  /**
   * form inputs
   */
  @Input() formGroup: FormGroup | null = null;
  @Input() control: FormControl = new FormControl();
  @Input() formControlKey: string | null = null;

  @Output() valueChange = new EventEmitter();

  validators: ValidatorFn[] = [];

  constructor() { }

  /**
   * @ignore
   */
  ngOnInit(): void {
    if (this.required) {
      this.validators.push(Validators.required);
    }

    if (this.type === 'email') {
      this.validators.push(Validators.email);
    }

    if (this.value) {
      this.control.setValue(this.value);
    }

    if (this.control) {
      this.control.setValidators(this.validators)
    }

    if (this.formGroup && this.formControlKey) {
      this.formGroup.addControl(this.formControlKey, this.control);
    }
  }

  onValueChange(evt: any) {
    this.valueChange.emit(evt)
  }
}
