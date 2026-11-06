export interface IncidentUser {
  userId: number;
  userName: string;
  emailId: string;
}

export interface IncidentInterface {
  incidentId: number;
  title: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low' | string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | string;
  createdDate: string;
  resolvedDate: string | null;
  createdBy: IncidentUser;
  assignedTo: IncidentUser|null;
}