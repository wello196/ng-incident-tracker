import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { DashboardSummaryResponse, PrioritySummaryItem, StatusSummaryItem } from './models/dashboard.interface';
import { SummaryCard } from './components/summary-card/summary-card';

@Component({
  imports: [SummaryCard],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);
  private destroyRef=inject(DestroyRef)
  StatusSummaryItem=signal<StatusSummaryItem[]>([]);
  PrioritySummaryItem=signal<PrioritySummaryItem[]>([]);
  readonly totalIncidents=computed(()=>{
    return this.StatusSummaryItem().reduce((acc,curr)=>acc+curr.count,0)
  })

  ngOnInit() {
   this.getDashboardData()
  }

  getDashboardData(){
     const subscription=this.dashboardService.getDashboardSummary().subscribe((res:DashboardSummaryResponse)=>{
      console.log(res);
      this.StatusSummaryItem.set(res.statusSummary);
      this.PrioritySummaryItem.set(res.prioritySummary);
    });
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
  }

}
