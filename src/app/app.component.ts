import {Component, HostListener, OnInit} from '@angular/core';
import {HttpService} from './services/http.service';
import {LocalstorageService} from './services/localstorage.service';

declare let Winwheel: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'onmangeou';
  wheel: any;
  choices = [];
  speed = 10;
  cheat = false;
  cheatIndex = -1;
  firstBefore = true;
  wheelSpinning = false;
  justOnce = true;
  restaurants = [];

  constructor(private http: HttpService, private localStorage: LocalstorageService) {}

  @HostListener('mousewheel', ['$event']) onMouseWheel(event: any) {
    this.handleMouseWheel(event);
  }
  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.handleMouseWheel(event);
  }

  async ngOnInit() {

    const response = await this.http.retrieve();
    // @ts-ignore
    if (response?.hasOwnProperty('elements') && Object.keys(response.elements).length > 0) {
      // @ts-ignore
      this.restaurants = response.elements;
    }

    this.setup();

  }

  setup() {
    console.log('---------setup---------');
    const choices = this.localStorage.retrieveItems('choices');

    if (choices) {
      console.log(choices);
      this.choices = choices;

      // check if friday
      const now = new Date();
      const opt = {
        weekday: 'long'
      };
      const day = now.toLocaleDateString('en', opt);
      // console.log('Current day : ', day);
      if (day === 'Friday') {
        this.cheat = true;
        const burgerInd = this.choices.map((item) => item.text === 'burger');
        this.cheatIndex = this.wheel?.getRandomForSegment(burgerInd);
      }

    }

    console.log(this.choices);

    const options = {
      numSegments: Object.keys(this.choices).length,
      segments: this.choices,
      fillStyle: '#ffd1b3',
      lineWidth: 1,
      outerRadius: 180,
      // 'textFontSize': 15,
      animation:                   // Note animation properties passed in constructor parameters.
        {
          type: 'spinToStop',  // Type of animation.
          duration: 20,             // How long the animation is to take in seconds.
          spins: 20 + this.speed % 20,         // The number of complete 360 degree rotations the wheel is to do.
          callbackFinished: this.finish,
          // callbackBefore: this.before,
        }
    };
    this.wheel = new Winwheel(options);
    console.log(this.wheel);
  }

  finish(indicatedSegment)  {
    console.log('finished');
    if (indicatedSegment?.text) {
      alert('One more time ... Go eat to : ' +  indicatedSegment?.text + ' !');
      this.reset();
    }
  }

  /** called while wheel ldoop */
  // before(this) {
  //   console.log('before');
  // }

  addChoice = (val = null) => {
    // debugger;
    let choice = '';
    if (val) {
      choice = val;
    } else {
      const inputChoice = document.querySelector('.inputChoice');
      // @ts-ignore
      choice = inputChoice?.value;
    }

    if (choice.length <= 0) {
      console.log('no', choice);
      return;
    }

    // reduce size if too long
    if (choice.length > 9) {
      choice = choice.substring(0, 10) + '...';
    }

    // todo Get Next Index
    const items = this.localStorage.retrieveItems('choices')  !== null  ? this.localStorage.retrieveItems('choices') : [];
    let lengthChoices = Object.keys(items).length;
    const objChoice = {
      text: choice,
      nbTime: 0,
      index: lengthChoices++
    };
    //  add on state + localstorage
    this.choices.push(objChoice);

    this.localStorage.pushItems('choices', this.choices);

    console.log('choice added successfully !');
    // todo add nbTime to wheel to ponderate on nb time
    const newChoice = {
      text : choice
    };
    if (this.wheel instanceof Winwheel) {

      this.wheel.addSegment(newChoice);
      this.wheel.draw();
    } else {
      console.error('pb');
    }
  }

  deleteChoice = (choice) => {
    console.log('choiceitem', choice),
    // delete last added by default
    // delete from wheel
    this.wheel.deleteSegment(choice.index);

    // delete from localstorage
    this.choices.splice(choice.index, 1);

    this.localStorage.pushItems('choices', this.choices);
    console.log('after', this.choices);
    const tr = document.querySelector('#tr_' + choice.index);
    tr.remove();
    this.wheel.draw();
  }

  handleMouseWheel(event: any) {
    this.wheelSpinning = true;
    console.log(event);
    if (event.hasOwnProperty('deltaY')) {
      this.speed += Math.abs(event?.deltaY);
    }

    this.wheel.startAnimation();
  }

  reset() {
    this.wheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    this.wheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    this.wheel.draw();                // Call draw to render changes to the wheel.
    this.wheelSpinning = false;
  }


  refreshWheel($event: object) {
    this.setup();
    this.reset();
  }
}
