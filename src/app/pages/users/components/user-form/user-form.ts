import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterInterface, UserInterface } from '../../../../core/models/auth.interface';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-user-form',
  styleUrl: './user-form.css',
  templateUrl: './user-form.html',
})
export class UserForm {
  errMessage=signal<string>('');
  payload=output<RegisterInterface>();
  
  private formBuilder=inject(FormBuilder).nonNullable;

  userForm = this.formBuilder.group({
    fullName: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
    userName: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20),Validators.pattern('^[a-zA-Z0-9]+$')]],
    emailId: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20),Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$')]],
    role: ['',[Validators.required]],
    

  });

  

  get fullName() {
    return this.userForm.get('fullName');
  }
  get userName() {
    return this.userForm.get('userName');
  }
  get emailId() {
    return this.userForm.get('emailId');
  }
  get password() {
    return this.userForm.get('password');
  }
  get role() {
    return this.userForm.get('role');
  }

  onSubmit(){
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
      return
    }
    this.errMessage.set('');
    this.payload.emit({
      ...this.userForm.getRawValue(),
      userId:0
    });
    this.userForm.reset();
  }
  onCancel(){
    this.userForm.reset();
  }

}
