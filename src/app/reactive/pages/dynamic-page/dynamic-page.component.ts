import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  constructor(private fb: FormBuilder) {}

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['FIFA 21', Validators.required],
      ['Teken tak', Validators.required],
      ['Metal slug', Validators.required],
      ['Bomberman', Validators.required],
    ])
  })

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidFieldInArray(formArray: FormArray, index: number){
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

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

  onSubmit(): void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }
    console.log(this.myForm.value);
  }
}
