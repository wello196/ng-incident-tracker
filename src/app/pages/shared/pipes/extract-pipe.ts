import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extract',
})
export class ExtractPipe implements PipeTransform {
  transform(value: string) {
    if(!value)return null;
    return value.slice(0,2).toUpperCase();

  }
}
