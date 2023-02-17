import {Component, Input, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Subscription} from "rxjs";

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR , useExisting: AddressFormComponent, multi: true
  }]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {

  @Input() legend: string;
  onChangeSub: Subscription;
  form: FormGroup = this.fb.group({
    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    city: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }

  onTouched = () => {

  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

  registerOnChange(onChange: any): void {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value);
    }
  }

}



