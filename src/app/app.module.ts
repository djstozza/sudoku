import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { CellComponent } from './cell/cell.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FormatTimePipe } from './format-time.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SudokuComponent,
    CellComponent,
    FormatTimePipe
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
