import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TweenMax } from 'gsap';
import {HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import {RouterModule} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListComponent } from './components/list/list.component';
import { TrComponent } from './components/list/tr/tr.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    TrComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
