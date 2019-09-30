import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filter: string, column?: string): any {
    if (!value || !filter || filter.trim() === '') {
      return value;
    }
    const newArray = [];
    let colmn: string;
    for (const t of value) {
      colmn = t[column].toLowerCase();
      if (colmn.indexOf(filter.toLowerCase()) !== -1) {
        newArray.push(t);
      }
    }
    return newArray;
  }
}
