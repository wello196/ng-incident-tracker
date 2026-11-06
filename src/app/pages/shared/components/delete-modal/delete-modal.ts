import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-delete-modal',
  styleUrl: './delete-modal.css',
  templateUrl: './delete-modal.html',
})
export class DeleteModal {
  title=input.required<string>();
  isModalOpen=input.required<boolean>();

  closeModal=output<void>();
  deleteTrigger=output<void>();

 

  onCancel()
  {
    this.closeModal.emit();
  }

  onDelete()
  {
    this.deleteTrigger.emit();
  }

  
  
}
