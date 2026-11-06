import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_BASE_URL } from '../../../core/constants/api.constants';
import { AuthResponseInterface, RegisterInterface, UserInterface } from '../../../core/models/auth.interface';

@Service()
export class UsersService {
    private httpClient=inject(HttpClient);

    getAllUsers(){
        return this.httpClient.get<AuthResponseInterface<UserInterface[]>>(`${API_BASE_URL}/GetAllUsers`);
    }

    deletUser(id:number)
    {
        return this.httpClient.delete<AuthResponseInterface<UserInterface>>(`${API_BASE_URL}/DeleteUserByUserId`,{
            params:
            {
                userId:id
            }
        })
    }

    createUser(value:RegisterInterface){
        return this.httpClient.post<AuthResponseInterface<UserInterface>>(`${API_BASE_URL}/Register`,value);
    }
}
