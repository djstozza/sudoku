import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { CellComponent } from './components/cell/cell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatOptionModule,
  MatSelectModule,
} from '@angular/material';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CompletionDialogComponent } from './components/completion-dialog/completion-dialog.component';
import { GameComponent } from './components/game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { ScoreTableComponent } from './components/score-table/score-table.component';
import { DifficultySelectComponent } from './components/difficulty-select/difficulty-select.component';

@NgModule({
  declarations: [
    AppComponent,
    SudokuComponent,
    CellComponent,
    FormatTimePipe,
    CompletionDialogComponent,
    GameComponent,
    ScoreTableComponent,
    DifficultySelectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [HttpClientModule, DifficultySelectComponent],
  bootstrap: [AppComponent],
  entryComponents: [CompletionDialogComponent],
})
export class AppModule { }
