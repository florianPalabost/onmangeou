import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  faSearch = faSearch;
  @Input() items: any = [];
  @Output() itemWanted: EventEmitter<string> =  new EventEmitter();
  showDropDown = false;
  valueSearch;
  filteredValues = [];

  constructor() { }

  ngOnInit(): void {
  }

  hideDropDown = (event) => {
    console.log('need to hide dropdown');
    this.showDropDown = false;
  }

  search(value: any) {
    console.log('val', value);
    this.filteredValues = this.items.filter((item) => {

      if (item?.tags?.cuisine?.toLowerCase().includes(value)) {
        return true;
      } else if (item?.tags?.brand?.toLowerCase().includes(value)) {
        return true;
      }
    });
    this.filteredValues = this.filteredValues.map((item) => item?.tags);
    console.log('filter', this.filteredValues);
    this.showDropDown = !this.showDropDown;
  }

  addToWheel(name: any) {
    console.log('from search wanted to add ', name);
    // todo send this to the parent (app)
    this.itemWanted.emit(name);
  }
}
