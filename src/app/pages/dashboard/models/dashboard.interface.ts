export interface StatusSummaryItem {
  status: 'Closed' | 'In Progress' | 'Open' | 'Resolved' | string;
  count: number;
}

export interface PrioritySummaryItem {
  priority: 'Critical' | 'High' | 'Low' | 'Medium' | string;
  count: number;
}

export interface DashboardSummaryResponse {
  statusSummary: StatusSummaryItem[];
  prioritySummary: PrioritySummaryItem[];
}