import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../../app.component';
import { SudokuComponent } from '../sudoku/sudoku.component';
import { CellComponent } from '../cell/cell.component';
import { CompletionDialogComponent } from '../completion-dialog/completion-dialog.component';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
} from '@angular/material';
import { MatDialog } from '@angular/material';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { AppRoutingModule } from '../../app-routing.module';
import { GameComponent } from './game.component';
import { DifficultySelectComponent } from '../difficulty-select/difficulty-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { difficulties } from '../../models/difficulty.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let app: any = null;
  let compiled: any = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        SudokuComponent,
        CellComponent,
        FormatTimePipe,
        GameComponent,
        CompletionDialogComponent,
        DifficultySelectComponent
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    component.difficulties = difficulties;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the sudoku board', () => {
    const defaultDifficulty = 'moderate';
    const cells = compiled.querySelectorAll('.sudoku-container .cell');
    const values = compiled.querySelectorAll('.sudoku-container .cell .value');

    expect(component.difficulty.name).toEqual(defaultDifficulty);

    for (let rowIndex in component.sudoku) {
      for (let colIndex in component.sudoku[rowIndex]) {

        const index = parseInt(rowIndex) * component.sudoku.length + parseInt(colIndex);
        const value = values[index];
        const input = component.sudoku[rowIndex][colIndex];
        const cell = cells[index];

        expect(input.rowIndex).toEqual(parseInt(rowIndex));
        expect(input.colIndex).toEqual(parseInt(colIndex));

        const squareIndex = Math.floor(parseInt(rowIndex) / 3) * 3 + Math.floor(parseInt(colIndex) / 3);

        expect(input.squareIndex).toEqual(squareIndex);

        expect(value.textContent).toEqual(`${input.value}`);

        if (parseInt(rowIndex) % 3 === 0) {
          expect(cell.classList.contains('top')).toBeTruthy();
        }

        if (parseInt(rowIndex) % 3 === 2) {
          expect(cell.classList.contains('bottom')).toBeTruthy();
        }

        if (parseInt(colIndex) % 3 === 0) {
          expect(cell.classList.contains('left')).toBeTruthy();
        }

        if (parseInt(colIndex) % 3 === 2) {
          expect(cell.classList.contains('right')).toBeTruthy();
        }

        if (typeof(input.value) === 'number') {
          expect(cell.classList.contains('readonly')).toBeTruthy();
        }
      }
    }
  });

  it('sets the difficulty of the sudoku board', () => {
    const difficulty = new DifficultySelectComponent().difficulties.pop();

    component.onSetDifficulty(difficulty);
    fixture.detectChanges();

    expect(component.difficulty).toEqual(difficulty);

    const inputs = JSON.parse(JSON.stringify(component.sudoku)).flat();
    const cells = compiled.querySelectorAll('.sudoku-container .cell .value');

    for (let index in inputs) {
      const cell = cells[index];
      const input = inputs[index];

      expect(cell.textContent).toEqual(`${input.value}`);
    }
  });

  it('shows the pause button if more than 5 seconds has elapsed', () => {
    component.elapsedTime = 5;
    fixture.detectChanges();

    expect(compiled.querySelector('.time').textContent).toEqual(new FormatTimePipe().transform(component.elapsedTime));
    expect(compiled.querySelector('.pause-button').textContent).toContain('Pause');
  });

  it('hides the sudoku puzzle when paused and reveals it when resumed', () => {
    component.elapsedTime = 5;
    fixture.detectChanges();

    const pauseButton = compiled.querySelector('.pause-button');
    pauseButton.click();
    fixture.detectChanges();

    expect(component.paused).toBeTruthy();
    expect(compiled.querySelectorAll('.sudoku-container .cell').length).toEqual(0);
    expect(compiled.querySelector('.pause-button').textContent).toContain('Resume');
    expect(compiled.querySelector('.sudoku-container').textContent).toContain('Paused');

    pauseButton.click();
    fixture.detectChanges();
    expect(component.paused).toBeFalsy();

    const cellCount = JSON.parse(JSON.stringify(component.sudoku)).flat().length;

    expect(compiled.querySelectorAll('.sudoku-container .cell').length).toEqual(cellCount);
    expect(compiled.querySelector('.pause-button').textContent).toContain('Pause');
    expect(compiled.querySelector('.sudoku-container').textContent).not.toContain('Paused');

    const event: Event = new KeyboardEvent('keydown', { 'key': 'p' });
    window.dispatchEvent(event);

    fixture.detectChanges();
    expect(component.paused).toBeTruthy();

    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.paused).toBeFalsy();
  });
});
