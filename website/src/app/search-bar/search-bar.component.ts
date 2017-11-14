import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})



export class SearchBarComponent {
  items = [
    {
      id: 1,
      text: 'First item'
    },
    {
      id: 2,
      text: 'Second item'
    },
    {
      id: 3,
      text: 'Third item'
    }
  ];
  public transform(value, keys: string, term: string) {

    if (!term) return value;
    return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  }

}
