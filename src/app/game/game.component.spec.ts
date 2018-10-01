import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { SudokuComponent } from '../sudoku/sudoku.component';
import { CellComponent } from '../cell/cell.component';
import { CompletionDialogComponent } from '../completion-dialog/completion-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatDialog } from '@angular/material';
import { FormatTimePipe } from '../format-time.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { GameComponent } from './game.component';

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
        CompletionDialogComponent
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render difficulty buttons', () => {
    const difficultyButtons = compiled.querySelectorAll('.difficulty-button');
    const difficultiesArr = component.difficultiesArr;

    for (let index in difficultiesArr) {
      const difficulty = difficultiesArr[index];
      const text = component.difficultyText(difficulty);
      const button = difficultyButtons[index];

      expect(button.textContent).toContain(text);
    }
  });

  it('should render the sudoku board', () => {
    const defaultDifficulty = 'moderate';
    const cells = compiled.querySelectorAll('.sudoku-container .cell');
    const values = compiled.querySelectorAll('.sudoku-container .cell .value');

    expect(component.difficulty).toEqual(defaultDifficulty);

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
    const difficulty = 'insane';

    component.setDifficulty(difficulty);
    fixture.detectChanges();

    expect(component.difficulty).toEqual(difficulty);

    const inputs = JSON.parse(JSON.stringify(component.sudoku)).flat();
    const cells = compiled.querySelectorAll('.sudoku-container .cell .value');

    for (let index in inputs) {
      const cell = cells[index];
      const input = inputs[index];

      expect(cell.textContent).toEqual(`${input.value}`);
    }

    expect(inputs.filter(f => typeof(f.value) === 'number').length).toBe(component.difficultiesHash[difficulty]);
  });

  it('sets the difficulty to moderate if invalid', () => {
    const defaultDifficulty = 'moderate';

    component.setDifficulty('foo');
    fixture.detectChanges();

    expect(component.difficulty).toEqual(defaultDifficulty);

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
