import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {interval, Observable} from "rxjs";
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'rxjs-operators';
  intervalStream$: Observable<number> | undefined;
  intervalStream1$: Observable<string> | undefined;
  intervalStream2$: Observable<string> | undefined;
  intervalStream3$: Observable<string> | undefined;

  ngOnInit() {
    this.intervalStream$ = interval(1000).pipe(take(20));

    this.intervalStream1$ = interval(200).pipe(take(10), map((value) => ' src1 val = ' + value));
    this.intervalStream2$ = interval(300).pipe(take(10), map((value) => ' src2 val = ' + value));
    this.intervalStream3$ = interval(400).pipe(take(10), map((value) => ' src3 val = ' + value));
  }
}
