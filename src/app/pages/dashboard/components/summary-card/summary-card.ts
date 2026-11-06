import { Component, computed, Input, input, signal } from '@angular/core';
import { PrioritySummaryItem, StatusSummaryItem } from '../../models/dashboard.interface';
import { DecimalPipe, NgClass, NgStyle} from '@angular/common';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

@Component({
  imports: [DecimalPipe, NgStyle, NgClass, LoadingSpinner],
  selector: 'app-summary-card',
  styleUrl: './summary-card.css',
  templateUrl: './summary-card.html',
})
export class SummaryCard {
  statusSummary=input.required<StatusSummaryItem[]>();
  prioritySummary=input.required<PrioritySummaryItem[]>();
  totalIncidents=input.required<number>();



   
}
