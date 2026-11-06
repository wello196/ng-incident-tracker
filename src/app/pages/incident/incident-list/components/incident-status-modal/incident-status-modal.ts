import { NgClass } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [NgClass, FormsModule],
  selector: 'app-incident-status-modal',
  styleUrl: './incident-status-modal.css',
  templateUrl: './incident-status-modal.html',
})
export class IncidentStatusModal {

statusStyles: Record<string, string> = {
  Open: 'border-rose-200 bg-rose-50 text-rose-700',
  'In Progress': 'border-sky-200 bg-sky-50 text-sky-700',
  Resolved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Closed: 'border-slate-200 bg-slate-100 text-slate-700',
};

  incidentId=input.required<number>();
  incidentStatus=input.required<string>();
  closeModal=output<void>();
  chooseStatus=signal<string>('Open');
  saveStatus=output<string>();


  changeStatus(){
    this.saveStatus.emit(this.chooseStatus());
  }
  
  
}
