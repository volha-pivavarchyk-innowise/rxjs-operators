import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TransformationComponent} from "./transformation/transformation.component";
import {FlatteningComponent} from "./flattening/flattening.component";
import {CombinationComponent} from "./combination/combination.component";

@NgModule({
  declarations: [
    AppComponent,
    TransformationComponent,
    FlatteningComponent,
    CombinationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
