import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent {

  constructor( private fb: FormBuilder) {}

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(0)]],
    inStorage: ['', [Validators.required, Validators.min(0)]],
  })

  isValidField(field: string){
    return this.myForm.get(field)?.touched && this.myForm.get(field)?.errors;
  }

  getFieldError(field: string): string | null{
    if( !this.myForm.get(field)) return null

    const errors = this.myForm.get(field)?.errors || {};

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Minimo ${errors[key].requiredLength} caracteres`
      }
    }
    return null
  }

  onSave(): void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }
    console.log(this.myForm.value)
  }
}
