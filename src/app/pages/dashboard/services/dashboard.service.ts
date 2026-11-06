import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { DashboardSummaryResponse } from '../models/dashboard.interface';
import { API_BASE_URL } from '../../../core/constants/api.constants';

@Service()
export class DashboardService {
    private httpClient=inject(HttpClient);

    getDashboardSummary(){
        return this.httpClient.get<DashboardSummaryResponse>(`${API_BASE_URL}/dashboardSummary`);
    }
}
