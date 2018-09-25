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

  it('should create the app', () => {
    expect(app).toBeTruthy();
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

    const inputs = JSON.parse(JSON.stringify(app.sudoku)).flat();
    const cells = compiled.querySelectorAll('.sudoku-container .cell .value');

    expect(app.difficulty).toEqual(defaultDifficulty);

    for (let index in inputs) {
      const cell = cells[index];
      const input = inputs[index];

      expect(cell.textContent).toEqual(`${input.value}`);
    }

    expect(inputs.filter(f => typeof(f.value) === 'number').length).toBe(app.difficultiesHash[defaultDifficulty]);
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

  it('hides the sudoku puzzlie when paused and reveals it when resumed', () => {
    app.elapsedTime = 5;
    fixture.detectChanges();

    const pauseButton = compiled.querySelector('.pause-button');
    pauseButton.click();
    fixture.detectChanges();

    expect(app.paused).toEqual(true);
    expect(compiled.querySelectorAll('.sudoku-container .cell').length).toEqual(0);
    expect(compiled.querySelector('.pause-button').textContent).toContain('Resume');
    expect(compiled.querySelector('.sudoku-container').textContent).toContain('Paused');

    pauseButton.click();
    fixture.detectChanges();
    expect(app.paused).toEqual(false);

    const cellCount = JSON.parse(JSON.stringify(app.sudoku)).flat().length;

    expect(compiled.querySelectorAll('.sudoku-container .cell').length).toEqual(cellCount);
    expect(compiled.querySelector('.pause-button').textContent).toContain('Pause');
    expect(compiled.querySelector('.sudoku-container').textContent).not.toContain('Paused');

    const event: Event = new KeyboardEvent('keydown', { 'key': 'p' });

    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(app.paused).toEqual(true);

    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(app.paused).toEqual(false);
  });
});
