import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { IncidentService } from '../incident.service';
import { IncidentInterface } from '../incident.interface';
import { DatePipe, NgClass } from '@angular/common';
import { ExtractPipe } from '../../shared/pipes/extract-pipe';
import { UserInterface } from '../../../core/models/auth.interface';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';
import { RouterLink } from '@angular/router';
import { DeleteModal } from '../../shared/components/delete-modal/delete-modal';
import { FormsModule } from '@angular/forms';
import { IncidentStatusModal } from './components/incident-status-modal/incident-status-modal';


@Component({
  imports: [DatePipe, NgClass, ExtractPipe, LoadingSpinner, RouterLink, DeleteModal, FormsModule, IncidentStatusModal],
  selector: 'app-incident-list',
  styleUrl: './incident-list.css',
  templateUrl: './incident-list.html',
})

export class IncidentList implements OnInit{

  priorityStyles: Record<string, string> = {
  Critical: 'bg-rose-50 text-rose-700',
  High: 'bg-orange-50 text-orange-700',
  Medium: 'bg-amber-50 text-amber-700',
  Low: 'bg-emerald-50 text-emerald-700',
};

priorityDotStyles: Record<string, string> = {
  Critical: 'bg-rose-500',
  High: 'bg-orange-500',
  Medium: 'bg-amber-500',
  Low: 'bg-emerald-500',
};

statusStyles: Record<string, string> = {
  Open: 'border-rose-200 bg-rose-50 text-rose-700',
  'In Progress': 'border-sky-200 bg-sky-50 text-sky-700',
  Resolved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Closed: 'border-slate-200 bg-slate-100 text-slate-700',
};

statusIconStyles: Record<string, string> = {
  Open: 'bg-rose-50 text-rose-600',
  'In Progress': 'bg-sky-50 text-sky-600',
  Resolved: 'bg-emerald-50 text-emerald-600',
  Closed: 'bg-slate-100 text-slate-600',
};

cardBorderStyles: Record<string, string> = {
  Open: 'hover:border-rose-200',
  'In Progress': 'hover:border-sky-200',
  Resolved: 'hover:border-emerald-200',
  Closed: 'hover:border-slate-300',
};
 
  private incidentService=inject(IncidentService);
  private destroyRef=inject(DestroyRef);
  incidentlist=signal<IncidentInterface[]>([]);
  incidentId=signal<number>(0);
  incidentStatus=signal<string>('');
  loggedUserData=signal<UserInterface>(JSON.parse(localStorage.getItem('incidentUser')|| '{}'));
  isDeleteModelOpen = signal(false);
 
  
  search=signal<string>('');
  selectedStatus=signal<string>('All');
  isChangeStatusModalOpen=signal<boolean>(false);
  

   ngOnInit() {
    if(this.loggedUserData().role==='IncidentAdmin')
      this.getIncidents();
    if(this.loggedUserData().role==='User')
      this.getUserIncident();
    if(this.loggedUserData().role==='Support Staff')
      this.getSupportIncident();
    
  } 

  getIncidents(){
     const subscription=this.incidentService.getAllincidents().subscribe((res:IncidentInterface[])=>{
      this.incidentlist.set(res);
    });
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
    
  }

  getSupportIncident(){
       const subscription=this.incidentService.getIncidentAssignToUser(this.loggedUserData().userId).subscribe((res:IncidentInterface[])=>{
      this.incidentlist.set(res);
    });
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })

  }
  getUserIncident(){
    const subscription=this.incidentService.getIncidentCreatedByUser(this.loggedUserData().userId).subscribe((res:IncidentInterface[])=>{
      this.incidentlist.set(res);
    });
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })

  }

  toggleModal(){
   
    this.isDeleteModelOpen.set(!this.isDeleteModelOpen());
  }
  onDelete(id:number){
    this.incidentId.set(id);
    this.toggleModal();
  }
  confirmDelete(){
    this.incidentService.deleteIncident(this.incidentId()).subscribe((res:string)=>{
      console.log(res);
      this.incidentlist.update(prev => prev.filter(i => i.incidentId !== this.incidentId()));
      this.toggleModal();
    })

  }
 

  filteredIncidents=computed(()=>{
    const term=this.search().toLowerCase().trim();
    const status=this.selectedStatus();
    return this.incidentlist().filter(incident=>
    {
      const searchedIncident=incident.title.toLowerCase().includes(term);
      const matchedStatus=status==='All'||incident.status===status;
      return searchedIncident && matchedStatus;
    }
      
    );
  })

  changeStatusModal(id:number,status:string){
    this.incidentId.set(id);
    this.incidentStatus.set(status);
    this.isChangeStatusModalOpen.set(!this.isChangeStatusModalOpen());
  }

  onSaveStatus(status: string) {
  const target = this.incidentlist().find(i => i.incidentId === this.incidentId());
  if (!target) return;

 
  const updatedPayload = {
    incidentId: target.incidentId,
    title: target.title,
    description: target.description,
    priority: target.priority,
    status: status,
   
    createdBy: typeof target.createdBy === 'object' ? target.createdBy?.userId : target.createdBy,
    assignedTo: typeof target.assignedTo === 'object' ? target.assignedTo?.userId : (target.assignedTo || 0),
    createdDate: target.createdDate,
    resolvedDate: (status === 'Resolved' || status === 'Closed') 
      ? new Date().toISOString() 
      : target.resolvedDate
  };

  this.incidentService.updateIncident(updatedPayload as any).subscribe({
    next: (res) => {
      console.log('Update Successful:', res);
      this.incidentlist.update(prev => prev.map(i => i.incidentId === this.incidentId() ? { ...i, status: status } : i));
      this.isChangeStatusModalOpen.set(false);
    },
    error: (err) => {
      console.error('API Error Response:', err.error);
    }
  });
}
  

}
