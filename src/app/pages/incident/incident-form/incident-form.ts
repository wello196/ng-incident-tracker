import { Component, inject, signal } from '@angular/core';
import { UserInterface } from '../../../core/models/auth.interface';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncidentInterface } from '../incident.interface';
import { IncidentService } from '../incident.service';


@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-incident-form',
  styleUrl: './incident-form.css',
  templateUrl: './incident-form.html',
})
export class IncidentForm {
  loggedUserData=signal<UserInterface>(JSON.parse(localStorage.getItem('incidentUser')|| '{}'));
  isSubmitted = signal(false);
  private incidentService=inject(IncidentService)
  private formBuilder=inject(FormBuilder).nonNullable
  incidentForm = this.formBuilder.group({
    title: ['',Validators.required],
    description: ['',Validators.required],
    priority: ['',Validators.required],
    status: ['',Validators.required],
    createdBy: ['',Validators.required],
  });

  get title() {
    return this.incidentForm.get('title');
  }

  get description() {
    return this.incidentForm.get('description');
  }

  get priority() {
    return this.incidentForm.get('priority');
  }

  get status() {
    return this.incidentForm.get('status');
  }

  get createdBy() {
    return this.incidentForm.get('createdBy');
  }

  onCancel(){
    this.incidentForm.reset();
  }

  onSubmit(){
    if(this.incidentForm.invalid){
      this.incidentForm.markAllAsTouched();
      return
    }
    this.isSubmitted.set(true);
    const payload:IncidentInterface={
      incidentId:0,
      title:this.title?.getRawValue(),
      description:this.description?.getRawValue(),
      priority:this.priority?.getRawValue(),
      status:this.status?.getRawValue(),
      createdDate:new Date().toISOString(),
      resolvedDate:null,
      createdBy:this.createdBy?.getRawValue(),
      assignedTo:null
    }
    this.incidentService.createIncident(payload).subscribe((res:IncidentInterface)=>{
      console.log(res);
      this.incidentForm.reset();
      this.isSubmitted.set(false);
    })
    
  }
}
