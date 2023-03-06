import {Component, Input} from '@angular/core'
import {Observable, combineLatest, skipUntil} from "rxjs";
import {take, map, takeLast} from 'rxjs/operators';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.scss'],
})
export class CombinationComponent {

  @Input('intervalChildStream1$') intervalStream1$: Observable<any> | undefined;
  @Input('intervalChildStream2$') intervalStream2$: Observable<any> | undefined;
  @Input('intervalChildStream3$') intervalStream3$: Observable<any> | undefined;

  public arrayTask1 = [];
  public arrayTask2 = [];
  public arrayTask3 = [];
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
    }
  }

  task1() {
    this.arrayTask1 = [];

    combineLatest([
      // @ts-ignore
      this.intervalStream1$.pipe(
        skipUntil(
          // @ts-ignore
          this.intervalStream2$.pipe(take(1)),
          // @ts-ignore
          this.intervalStream3$.pipe(take(1)))
      ),
      // @ts-ignore
      this.intervalStream2$.pipe(skipUntil( this.intervalStream1$.pipe(take(1)),  this.intervalStream3$.pipe(take(1)))),
      // @ts-ignore
      this.intervalStream3$.pipe(skipUntil(this.intervalStream1$.pipe(take(1)), this.intervalStream2$.pipe(take(1)))),
    ])
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

    combineLatest([
      // @ts-ignore
      this.intervalStream1$.pipe(takeLast(1)),
      // @ts-ignore
      this.intervalStream2$.pipe(takeLast(1)),
      // @ts-ignore
      this.intervalStream3$.pipe(takeLast(1)),
    ])
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
    combineLatest([
      // @ts-ignore
      this.intervalStream1$,
      // @ts-ignore
      this.intervalStream2$,
      // @ts-ignore
      this.intervalStream3$,
    ])
      // @ts-ignore
    .subscribe(([timerValOne, timerValTwo, timerValThree]) => {
      console.log(timerValOne, timerValTwo, timerValThree);
      // @ts-ignore
      this.arrayTask3.push([timerValOne, timerValTwo, timerValThree]);
    });
  }
}
