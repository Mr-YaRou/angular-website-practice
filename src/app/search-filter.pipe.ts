import { Pipe, PipeTransform } from '@angular/core';

// Custom Filter not used anymore, made use of ng2-search filter
@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }
}