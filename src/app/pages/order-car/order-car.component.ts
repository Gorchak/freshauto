import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-car',
  templateUrl: './order-car.component.html',
  styleUrls: ['./order-car.component.scss']
})
export class OrderCarComponent implements OnInit {
  myForm!: FormGroup;

  get name() {
    return this.myForm.get('name');
  }

  get phoneNumber() {
    return this.myForm.get('phoneNumber');
  }

  get notes() {
    return this.myForm.get('notes');
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Виконати дії з формою (наприклад, відправити дані на сервер)
      console.log(this.myForm.value);
    } else {
      // Відображати помилки форми
      this.validateAllFormFields(this.myForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

}
