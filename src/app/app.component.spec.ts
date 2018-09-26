import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { CellComponent } from './cell/cell.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FormatTimePipe } from './format-time.pipe';

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
        FormatTimePipe
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it(`should have as title 'sudoku'`, () => {
    expect(app.title).toEqual('sudoku');
  });

  it('should render difficulty buttons', () => {
    const difficultyButtons = compiled.querySelectorAll('.difficulty-button');
    const difficultiesArr = app.difficultiesArr;

    for (let index in difficultiesArr) {
      const difficulty = difficultiesArr[index];
      const text = app.difficultyText(difficulty);
      const button = difficultyButtons[index];

      expect(button.textContent).toContain(text);
    }
  });

  it('should render the sudoku board', () => {
    const defaultDifficulty = 'moderate';
    const cells = compiled.querySelectorAll('.sudoku-container .cell');
    const values = compiled.querySelectorAll('.sudoku-container .cell .value');

    expect(app.difficulty).toEqual(defaultDifficulty);

    for (let rowIndex in app.sudoku) {
      for (let colIndex in app.sudoku[rowIndex]) {

        const index = parseInt(rowIndex) * app.sudoku.length + parseInt(colIndex);
        const value = values[index];
        const input = app.sudoku[rowIndex][colIndex];
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

  it('sets the difficutly of the sudoku board', () => {
    const difficulty = 'insane';

    app.setDifficulty(difficulty);
    fixture.detectChanges();

    expect(app.difficulty).toEqual(difficulty);

    const inputs = JSON.parse(JSON.stringify(app.sudoku)).flat();
    const cells = compiled.querySelectorAll('.sudoku-container .cell .value');

    for (let index in inputs) {
      const cell = cells[index];
      const input = inputs[index];

      expect(cell.textContent).toEqual(`${input.value}`);
    }

    expect(inputs.filter(f => typeof(f.value) === 'number').length).toBe(app.difficultiesHash[difficulty]);
  });

  it('sets the difficutly to moderate if invalid', () => {
    const defaultDifficulty = 'moderate';

    app.setDifficulty('foo');
    fixture.detectChanges();

    expect(app.difficulty).toEqual(defaultDifficulty);

  });

  it('shows the pause button if more than 5 seconds has elapsed', () => {
    app.elapsedTime = 5;
    fixture.detectChanges();

    expect(compiled.querySelector('.time').textContent).toEqual(new FormatTimePipe().transform(app.elapsedTime));
    expect(compiled.querySelector('.pause-button').textContent).toContain('Pause');
  });

  it('hides the sudoku puzzle when paused and reveals it when resumed', () => {
    app.elapsedTime = 5;
    fixture.detectChanges();

    const pauseButton = compiled.querySelector('.pause-button');
    pauseButton.click();
    fixture.detectChanges();

    expect(app.paused).toBeTruthy();
    expect(compiled.querySelectorAll('.sudoku-container .cell').length).toEqual(0);
    expect(compiled.querySelector('.pause-button').textContent).toContain('Resume');
    expect(compiled.querySelector('.sudoku-container').textContent).toContain('Paused');

    pauseButton.click();
    fixture.detectChanges();
    expect(app.paused).toBeFalsy();
    console.log(app.sudoku)
    const cellCount = JSON.parse(JSON.stringify(app.sudoku)).flat().length;

    expect(compiled.querySelectorAll('.sudoku-container .cell').length).toEqual(cellCount);
    expect(compiled.querySelector('.pause-button').textContent).toContain('Pause');
    expect(compiled.querySelector('.sudoku-container').textContent).not.toContain('Paused');

    const event: Event = new KeyboardEvent('keydown', { 'key': 'p' });

    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(app.paused).toBeTruthy();

    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(app.paused).toBeFalsy();
  });
});
