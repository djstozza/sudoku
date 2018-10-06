import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { CellComponent } from './cell/cell.component';
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
import { FormatTimePipe } from './format-time.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CompletionDialogComponent } from './completion-dialog/completion-dialog.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { ScoreTableComponent } from './score-table/score-table.component';
import { DifficultySelectComponent } from './difficulty-select/difficulty-select.component';

describe('AppComponent', () => {
  let fixture: any = null;
  let app: any = null;
  let compiled: any = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
        AppRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it(`should have as title 'sudoku'`, () => {
    expect(app.title).toEqual('sudoku');
  });
});
