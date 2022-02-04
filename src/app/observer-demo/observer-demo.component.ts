import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'observer-demo',
  templateUrl: './observer-demo.component.html'
})
export class ObserverDemoComponent implements OnInit {
  // UI elements
  saveText: string;
  currentNumber: number;

  // Observables
  unsubscribe$: Subject<void> = new Subject();

  constructor(protected dataService: DataService) {

  }

  ngOnInit(): void {
    // Initialize UI elements
    this.saveText = '';
    this.currentNumber = 0;
  }

  numberChanged(): void {
    this.dataService.updateCurrentNumber(this.currentNumber);
  }
}