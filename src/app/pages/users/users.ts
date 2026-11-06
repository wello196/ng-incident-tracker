import { Component, computed, inject, signal } from '@angular/core';
import { UserForm } from './components/user-form/user-form';
import { UsersList } from './components/users-list/users-list';
import { AuthResponseInterface, RegisterInterface, UserInterface } from '../../core/models/auth.interface';
import { UsersService } from './services/users.service';
import { DeleteModal } from '../shared/components/delete-modal/delete-modal';

@Component({
  imports: [UserForm, UsersList],
  selector: 'app-users',
  styleUrl: './users.css',
  templateUrl: './users.html',
})
export class Users {
  private usersService=inject(UsersService);
  usersData=signal<UserInterface[]>([]);
  totalUsers=computed(()=>this.usersData().length);
 
  errMessage=signal<string>('');

  

  ngOnInit(){
    this.getUsers();
  }




  getUsers(){
    this.usersService.getAllUsers().subscribe((res:AuthResponseInterface<UserInterface[]>)=>{
      if(!res.result)
      {
        console.log(res);
        this.errMessage.set(res.message);
      }
        
      else
      {
        console.log(res);
        this.usersData.set(res.data);
      }
        
    }
    
  )}

  createUser(user:RegisterInterface){
    console.log(user);
    this.usersService.createUser(user).subscribe((res:AuthResponseInterface<UserInterface>)=>{
      if(!res.result){
        console.log(res);
        this.errMessage.set(res.message);
      }
      else{
        console.log(res);
        this.usersData.update(prev=>[...prev,res.data]);
        this.errMessage.set('');
      }
      
    })
  }

  deleteUser(userId:number){
    this.usersService.deletUser(userId).subscribe((res:AuthResponseInterface<UserInterface>)=>{
      if(!res.result){
        console.log(res);
        this.errMessage.set(res.message);
      }
      else{
        console.log(res);
        this.usersData.update(prev=>prev.filter(user=>user.userId!==userId));
        this.errMessage.set('');
      }
      
    })
  }
}
