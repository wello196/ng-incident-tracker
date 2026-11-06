import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { AuthResponseInterface, UserInterface,} from '../../core/models/auth.interface';
import { Router } from '@angular/router';
import { LoadingSpinner } from '../shared/components/loading-spinner/loading-spinner';

@Component({
  imports: [ReactiveFormsModule, LoadingSpinner],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login   {
  isLoading=signal<boolean>(false);
  private loginService=inject(LoginService);
  private router = inject(Router);
  private formBuilder=inject(FormBuilder).nonNullable;
  errMessage=signal<string>('');
  loginForm = this.formBuilder.group({
    userName: ['',[Validators.required]],
    password: ['',[Validators.required]],
  });

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  } 

  onLogin(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      this.errMessage.set('Please enter valid credentials');
      return;
    }
    this.isLoading.set(true);
    this.errMessage.set('');
    

   this.loginService.login(this.loginForm.getRawValue()).subscribe((res:AuthResponseInterface<UserInterface>)=>{
    if(!res.result){
      this.errMessage.set(res.message);
    }
    else{
      console.log(res);
      localStorage.setItem('incidentUser',JSON.stringify(res.data));
      this.router.navigate(['admin','incidents-list']);
    }
    
    this.isLoading.set(false);
   })

  }

 
  
  
}
