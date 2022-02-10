import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, of, Subject } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rxjs-demo';
  protected unsubscribe$ = new Subject<void>();

  // Observables
  dataSource$ = of(1, 2, 3, 4, 5);
  dataSource2$ = of(6, 7, 8, 9, 10);
  
  // To display
  dataSource: number[] = [];
  filterData: number[] = [];
  mapData: number[] = [];
  combineLatestData: string[] = [];
  multipleOperatorsData: number[] = []

  // Observer demo
  firstSubscriber: number[] = [];
  secondSubscriber: number[] = [];

  constructor(
    protected dataService: DataService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    
  }

  ngOnInit(): void {
    this.dataSource$.subscribe(data => {
      this.dataSource.push(data);
    });

    // With operators
    this.dataSource$.pipe(
      filter(data => data >= 3)
    ).subscribe(data => {
      this.filterData.push(data);
    });

    this.dataSource$.pipe(
      map(data => data * 5)
    ).subscribe(data => {
      this.mapData.push(data);
    });

    combineLatest([
      this.dataSource$,
      this.dataSource2$
    ]).pipe(
      filter(([data1, data2]) => data1 > 3 && data2 < 9)
    ).subscribe(([data1, data2]) => {
      this.combineLatestData.push(data1 + ' and ' + data2);
    });

    this.dataSource$.pipe(
      map(data => data * 10),
      filter(data => data > 3)
    ).subscribe(data => {
      this.multipleOperatorsData.push(data);
    });

    this.dataService.currentNumber$.pipe(
      filter(number => number > 20)
    ).subscribe(number => {
      this.firstSubscriber.push(number);
      this.changeDetectorRef.detectChanges();
    });

    this.dataService.currentNumber$.pipe(
      filter(number => number < 20)
    ).subscribe(number => {
      this.secondSubscriber.push(number);
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
