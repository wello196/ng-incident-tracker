import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AuthResponseInterface, LoginInterface, UserInterface} from '../../../core/models/auth.interface';
import { API_BASE_URL } from '../../../core/constants/api.constants';

@Service()
export class LoginService {
    private httpClient=inject(HttpClient)
    
    login(value:LoginInterface){
        return this.httpClient.post<AuthResponseInterface<UserInterface>>(`${API_BASE_URL}/login`,value);
    }
    
}
