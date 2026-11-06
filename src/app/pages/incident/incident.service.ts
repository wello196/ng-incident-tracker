import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { API_BASE_URL } from '../../core/constants/api.constants';
import { IncidentInterface } from './incident.interface';

@Service()
export class IncidentService {
    private httpClient=inject(HttpClient)


    getAllincidents(){
        return this.httpClient.get<IncidentInterface[]>(`${API_BASE_URL}/getAllIncidents`);
    }

    getIncidentAssignToUser(id:number){
        return this.httpClient.get<IncidentInterface[]>(`${API_BASE_URL}/getIncidentAssignToUser`,{
            params:
            {
                userId:id
            }
        })
    }

    getIncidentCreatedByUser(id:number){
        return this.httpClient.get<IncidentInterface[]>(`${API_BASE_URL}/getIncidentCreatedByUser`,{
            params:
            {
                userId:id
            }
        })
    }

    deleteIncident(id:number){
        return this.httpClient.delete<string>(`${API_BASE_URL}/deleteIncident/${id}`)
    }
    

    createIncident(value:IncidentInterface){
        return this.httpClient.post<IncidentInterface>(`${API_BASE_URL}/createIncident`,value);
    }

    updateIncident(value:IncidentInterface){
        return this.httpClient.put<IncidentInterface>(`${API_BASE_URL}/updateIncident/${value.incidentId}`,value);

    }
}
