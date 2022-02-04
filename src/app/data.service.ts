import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  updateCurrentNumber(newNumber: number): void {
    this.currentNumber$.next(newNumber);
  }
}