import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalstorageService} from '../../services/localstorage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() choices  = [];

  @Output() needWheelUpdate = new EventEmitter<object>();

  constructor(private localstorage: LocalstorageService) { }

  ngOnInit(): void {
    // this.listChoices(null);
  }

  addChoice = (val = null) => {
    // todo emit add choice to parent
    // debugger;
    // let choice = '';
    // if (val) {
    //   choice = val;
    // } else {
    //   const inputChoice = document.querySelector('.inputChoice');
    //   // @ts-ignore
    //   choice = inputChoice?.value;
    // }
    //
    // if (choice.length <= 0) {
    //   console.log('no', choice);
    //   return;
    // }
    //
    // // reduce size if too long
    // if (choice.length > 9) {
    //   choice = choice.substring(0, 10) + '...';
    // }
    //
    // // todo Get Next Index
    //
    // const objChoice = {
    //   text: choice,
    //   nbTime: 0,
    //   index: this.choices.length > 0 ? this.choices.length++ : 1
    // };
    // //  add on state + localstorage
    // this.choices.push(objChoice);
    // localStorage.setItem('choices', JSON.stringify(this.choices));
    // console.log('choice added successfully !');
    // // todo add nbTime to wheel to ponderate on nb time
    // const newChoice = {
    //   text : choice
    // };
    // if (this.wheel instanceof Winwheel) {
    //
    //   this.wheel.addSegment(newChoice);
    //   this.wheel.draw();
    // } else {
    //   console.error('pb');
    // }
  }

  listChoices(choiceItem) {
    const list = document.querySelector('#list');

    // const tr = document.createElement('tr');
    // tr.id = 'tr_' + choiceItem.index;
    // const tdChoice = document.createElement('td');
    // const tdNbTime = document.createElement('td');
    // tdNbTime.className = 'tdNbTime';
    // const tdBtnDelete = document.createElement('td');
    // const tdBtnPlus = document.createElement('td');
    //
    // const btnPlus = document.createElement('button');
    // btnPlus.className = 'btnPlus';
    // btnPlus.addEventListener('click', e => this.incrementNbTime(choiceItem));
    //
    // const plus = document.createElement('p');
    // const textPlus = document.createTextNode('+');
    // plus.appendChild(textPlus);
    //
    // // @ts-ignore
    // btnPlus.appendChild(plus);
    // tdBtnPlus.appendChild(btnPlus);
    //
    // const btnDelete = document.createElement('button');
    // btnDelete.className = 'btnDelete';
    // btnDelete.addEventListener('click', e => this.deleteChoice(choiceItem));
    // const trashPicture = document.createElement('img');
    // trashPicture.src = 'assets/trash.png';
    // trashPicture.className = 'trash';
    // btnDelete.appendChild(trashPicture);
    // tdBtnDelete.appendChild(btnDelete);
    //
    // const p = document.createElement('p');
    // p.id = 'span_' + choiceItem?.index;
    // const textSpan = document.createTextNode(choiceItem?.text);
    //
    // const nbTimeValue = document.createTextNode(choiceItem?.nbTime);
    // tdNbTime.appendChild(nbTimeValue);
    //
    // p.appendChild(textSpan);
    // tdChoice.appendChild(p);
    //
    // tr.appendChild(tdChoice);
    // tr.appendChild(tdNbTime);
    // tr.appendChild(tdBtnPlus);
    // tr.appendChild(tdBtnDelete);
    // list.appendChild(tr);
  }

  deleteChoice(choice) {
    console.log('delete choice in list', choice);
      // delete last added by default
      // delete from wheel


    // delete from localstorage
    const choiceInLS = this.choices.filter(c => c.text === choice.text);
    this.choices.splice(choiceInLS.index, 1);

    console.log('deleted ?', this.choices);
    this.localstorage.pushItems('choices', this.choices);

    // todo emit event to parent for redraw the will with updated choices[]
    // this.wheel.deleteSegment(choice.index);
    this.needWheelUpdate.emit(this.choices);
  }

  update(choiceItem) {
    const remove = this.choices.filter((item) => item?.text === choiceItem?.text);
    this.choices.splice(remove?.index, 1);
    this.choices.push(choiceItem);
    this.localstorage.pushItems('choices', this.choices);

    // todo redraw wheel event
    this.needWheelUpdate.emit(this.choices);
  }
}
