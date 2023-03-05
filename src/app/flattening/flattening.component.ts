import {Component, Input} from '@angular/core'
import {Observable, interval, of} from "rxjs";
import {switchMap, take, filter, delay, repeat, mergeMap, concatMap} from 'rxjs/operators';

@Component({
  selector: 'app-flattering',
  templateUrl: './flattening.component.html',
})
export class FlatteningComponent {

  @Input('intervalChildStream$') intervalStream$: Observable<number> | undefined;

  public arrayTask1 = [];
  public arrayTask2 = [];
  public arrayTask3 = [];
  public arrayTask4 = [];
  private _event: any;

  onClick(event: any) {
    this._event = event;
    const method = this._event.target.id;

    switch (method) {
      case 'task-1':
        this.task1();
        break;
      case 'task-2':
        this.task2();
        break;
      case 'task-3':
        this.task3();
        break;
      case 'task-4':
        this.task4();
        break;
    }
  }

  task1() {
    this.arrayTask1 = [];

    // @ts-ignore
    this.intervalStream$
      .pipe(
        // switchMap( (value: number) => interval(200).pipe(map (() => value)))
        switchMap( (value: number) => of(value).pipe(delay(200), repeat(1000)))
      )
      .subscribe(
        (value) => {
          console.log(value);
          // @ts-ignore
          this.arrayTask1.push(value);
        }
      );
  }

  task2() {
    this.arrayTask2 = [];

    // @ts-ignore
    this.intervalStream$
      .pipe(
        mergeMap( (value: number) => interval(100).pipe(take(10)))
      )
      .subscribe(
        (value) => {
          console.log(value);
          // @ts-ignore
          this.arrayTask2.push(value);
        }
      );
  }

  task3() {
    this.arrayTask3 = [];

    // @ts-ignore
    this.intervalStream$
      .pipe(
        filter((value) => value % 2 === 0),
        concatMap( (value: number) => of(value).pipe(delay(400), repeat(5)))
      )
      .subscribe(
        (value) => {
          console.log(value);
          // @ts-ignore
          this.arrayTask3.push(value);
        }
      );
  }

  task4() {
    this.arrayTask4 = [];

    // @ts-ignore
    this.intervalStream$
      .pipe(
        mergeMap( (value: number) => of(value).pipe(delay(300),repeat(5)))
      )
      .subscribe(
        (value) => {
          console.log(value);
          // @ts-ignore
          this.arrayTask4.push(value);
        }
      );
  }
}
