import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tr',
  templateUrl: './tr.component.html',
  styleUrls: ['./tr.component.css']
})
export class TrComponent implements OnInit {

  faPlus = faPlus;
  faTrash = faTrash;

  @Input() choice = null;

  @Output() updateChoice: EventEmitter<object> =  new EventEmitter();
  @Output() deleteChoice: EventEmitter<object> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log('choice', this.choice);
  }

  increment(choiceItem: any) {
    console.log('increment', choiceItem);
    if (choiceItem) {
      // @ts-ignore
      choiceItem.nbTime++;
    }

    this.updateChoice.emit(choiceItem);

  }

  removeChoice(choice: any) {
    this.deleteChoice.emit(choice);
  }
}
