import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.css',
})
export class TemplateDrivenForm {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    console.log('Template-driven form submitted', form.value);
  }
}
