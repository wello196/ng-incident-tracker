import { Component, input, Output, output, signal } from '@angular/core';
import { UserInterface } from '../../../../core/models/auth.interface';
import { ExtractPipe } from '../../../shared/pipes/extract-pipe';
import { DeleteModal } from '../../../shared/components/delete-modal/delete-modal';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search-pipe';
import { DatePipe, NgClass } from '@angular/common';



@Component({
  imports: [ExtractPipe, DeleteModal, LoadingSpinner, FormsModule, SearchPipe, DatePipe, NgClass],
  selector: 'app-users-list',
  styleUrl: './users-list.css',
  templateUrl: './users-list.html',
})
export class UsersList {
  userData=input.required<UserInterface[]>();
  totalUsers=input.required<number>();
  

  isModalOpen=signal<boolean>(false);
  userId=signal<number>(0);
  searchTerm=signal<string>('');
 

 
  
  selectedUserId=output<number>();


  toggleModal(id?:number)
  {
    if(id){
      this.userId.set(id);
    }
    this.isModalOpen.set(!this.isModalOpen());
  }

  onDelete()
  {
    this.selectedUserId.emit(this.userId());
    this.toggleModal();
  }

 


}
