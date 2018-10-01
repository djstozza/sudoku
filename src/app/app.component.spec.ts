import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { CellComponent } from './cell/cell.component';
import { CompletionDialogComponent } from './completion-dialog/completion-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatDialog } from '@angular/material';
import { FormatTimePipe } from './format-time.pipe';
import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from './game/game.component';
import { APP_BASE_HREF } from '@angular/common';

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
        GameComponent,
        CompletionDialogComponent
      ],
      imports: [
        AppRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
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
