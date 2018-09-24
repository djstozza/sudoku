import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { CellComponent } from './cell/cell.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FormatTimePipe } from './format-time.pipe';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
