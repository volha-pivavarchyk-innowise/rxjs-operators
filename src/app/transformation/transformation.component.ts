import {Component, Input, ViewEncapsulation} from '@angular/core'
import {Observable} from "rxjs";
import {map, take, filter} from 'rxjs/operators';

@Component({
  selector: 'app-transformation',
  templateUrl: './transformation.component.html',
  styleUrls: ['./transformation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransformationComponent {

  @Input('intervalChildStream$') intervalStream$: Observable<number> | undefined;

  public arrayMultiplyBy3 = [];
  public arrayFirst7 = [];
  public arrayEvenNumbers = [];
  private _event: any;

  onClick(event: any) {
    this._event = event;
    const method = this._event.target.id;

    switch (method) {
      case 'multiply-by-3':
        this.multiplyBy3();
        break;
      case 'take-first-7':
        this.takeFirst7();
        break;
      case 'take-even-numbers':
        this.takeEvenNumbers();
        break;
    }
  }

  multiplyBy3() {
    this.arrayMultiplyBy3 = [];

    // @ts-ignore
    this.intervalStream$
      .pipe(
        map( (value: number) => value * 3)
      )
      .subscribe(
        (value) => {
          console.log(value);
          // @ts-ignore
          this.arrayMultiplyBy3.push(value);
        }
      );
  }

  takeFirst7() {
    this.arrayFirst7 = [];

    // @ts-ignore
    this.intervalStream$
      .pipe(
        take(7)
      )
      .subscribe(
        (value) => {
          console.log(value);
          // @ts-ignore
          this.arrayFirst7.push(value);
        }
      );
  }

  takeEvenNumbers() {
    this.arrayEvenNumbers = [];

    // @ts-ignore
    this.intervalStream$
      .pipe(
        filter( (value: number) => value % 2 === 0)
      )
      .subscribe(
        (value) => {
          console.log(value);
          // @ts-ignore
          this.arrayEvenNumbers.push(value);
        }
      );
  }
}
