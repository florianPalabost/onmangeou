import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  /**
   * retrieve items from localstorage given a key
   * @param key
   */
  retrieveItems(key = '') {
    return key !== '' ? JSON.parse(localStorage.getItem(key)) : [];
  }

  /**
   * push items in localstorage given a key
   * @param key
   * @param items
   */
  pushItems(key = '', items = []) {
    localStorage.setItem(key, JSON.stringify(items));
  }
}
