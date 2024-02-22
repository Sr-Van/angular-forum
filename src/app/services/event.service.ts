import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  filterEvent = new EventEmitter<boolean>()

  constructor() { }
}
