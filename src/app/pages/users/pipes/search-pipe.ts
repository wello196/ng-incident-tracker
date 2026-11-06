import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from '../../../core/models/auth.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: UserInterface[], searchInput: string) {
    if(!value)return [];
    const term = searchInput.toLowerCase().trim();
    return value.filter(user=>user.userName.toLowerCase().includes(term)||user.role.toLowerCase().includes(term)||user.projectName.toLowerCase().includes(term));


  }
}
