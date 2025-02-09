import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  getItem(item: string) {
    return localStorage.getItem(item);
  }

  setItem(nameItem: string, item: string) {
    localStorage.setItem(nameItem, item);
  }

  removeItem(nameItem: string) {
    localStorage.removeItem(nameItem);
  }
}
