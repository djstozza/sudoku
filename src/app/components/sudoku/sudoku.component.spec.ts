import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from '../game/game.component';
import { SudokuComponent } from './sudoku.component';
import { CellComponent } from '../cell/cell.component';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { SudokuService } from '../../services/sudoku.service';
import {
  MatDialog,
  MatButtonModule,
  MatIconModule,
  MatOptionModule,
  MatSelectModule
 } from '@angular/material';
import { DifficultySelectComponent } from '../difficulty-select/difficulty-select.component';


describe('SudokuComponent', () => {
  let component: SudokuComponent;
  let fixture: ComponentFixture<SudokuComponent>;
  let compiled: any = null;
  let sudokuArr: any = null;
  let cells: any = null;
  let buttons: any = null;
  let button: any = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SudokuComponent,
        CellComponent,
        DifficultySelectComponent
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const game = new GameComponent(new SudokuService(), new MatDialog(), new DifficultySelectComponent());
    const difficulty = new DifficultySelectComponent().difficulties.pop();
    game.onSetDifficulty(difficulty);

    fixture = TestBed.createComponent(SudokuComponent);

    component = fixture.componentInstance;
    component.sudoku = game.sudoku;
    fixture.detectChanges();

    compiled = fixture.debugElement.nativeElement;

    sudokuArr = JSON.parse(JSON.stringify(component.sudoku)).flat();
    cells = compiled.querySelectorAll('.cell');
    buttons = compiled.querySelectorAll('.controls button');

    button = buttons[Math.floor(Math.random() * buttons.length)];
  });

  it('should render number buttons', () => {
    const numberButtons = component.numberButtons;

    for (let index in numberButtons) {
      expect(buttons[index].textContent).toContain(`${numberButtons[index].number}`);
    }
  });

  it('active field', () => {
    const index = Math.floor(Math.random() * (cells.length - 1));

    cells[index].click();
    fixture.detectChanges();
    expect(component.activeField).toEqual(sudokuArr[index]);
  });

  it('insert number', () => {
    const cell = compiled.querySelector('.cell:not(.readonly)');
    cell.click();
    button.click();

    fixture.detectChanges();

    expect(cell.textContent).toEqual(button.textContent.trim());
    expect(component.activeField.value).toEqual(parseInt(button.textContent));
  });

  it('note mode', () => {
    compiled.querySelector('.notes').click();
    fixture.detectChanges();

    expect(component.noteMode).toBeTruthy();

    const input = sudokuArr.find((f) => (!f.readonly));
    const index = sudokuArr.indexOf(input);
    const cell = compiled.querySelectorAll('.cell')[index];

    cell.click();
    button.click();

    fixture.detectChanges();

    expect(component.activeField.notes[0]).toEqual(parseInt(button.textContent));
    expect(compiled.querySelector('.note').classList.contains(`note-${button.textContent.trim()}`)).toBeTruthy();
  });

  it('check numbers', () => {
    const buttonNumber = parseInt(button.textContent);

    for (let rowIndex in component.sudoku) {
      for (let colIndex in component.sudoku[rowIndex]) {
        const index = parseInt(rowIndex) * component.sudoku.length + parseInt(colIndex);
        const input = component.sudoku[rowIndex][colIndex]

        if (input.answer === buttonNumber && !input.readonly) {
          cells[index].click();
          button.click();
        }
      }
    }
    fixture.detectChanges();

    expect(component.numberButtons.find(f => (f.number === buttonNumber)).disabled).toBeTruthy();
    expect(button.disabled).toBeTruthy();
  });

  it('erase', () => {
    const cell = compiled.querySelector('.cell:not(.readonly)');

    cell.click();
    button.click();

    fixture.detectChanges();

    expect(cell.textContent).toEqual(button.textContent.trim());
    expect(component.activeField.value).toEqual(parseInt(button.textContent));

    const erase = compiled.querySelector('.erase');
    erase.click();

    fixture.detectChanges();
    expect(cell.textContent).toBe('');
    expect(component.activeField.value).toBe(undefined);
  });

  describe('keyboard events', () => {
    let originalActiveField: any = null;

    beforeEach(() => {
      const index = Math.floor(Math.random() * cells.length);

      cells[index].click();
      fixture.detectChanges();
      originalActiveField = component.activeField;
    });

    it('move left', () => {
      const event: Event = new KeyboardEvent('keydown', { 'key': 'arrowLeft' });
      window.dispatchEvent(event);

      fixture.detectChanges();

      if (originalActiveField.colIndex > 0) {
        expect(component.activeField.colIndex).toEqual(originalActiveField.colIndex - 1);
      } else {
        expect(component.activeField).toEqual(originalActiveField);
      }
    });

    it('move right', () => {
      const event: Event = new KeyboardEvent('keydown', { 'key': 'arrowRight' });
      window.dispatchEvent(event);

      fixture.detectChanges();

      if (originalActiveField.colIndex < component.sudoku.length - 1) {
        expect(component.activeField.colIndex).toEqual(originalActiveField.colIndex + 1);
      } else {
        expect(component.activeField).toEqual(originalActiveField);
      }
    });

    it('move up', () => {
      const event: Event = new KeyboardEvent('keydown', { 'key': 'arrowUp' });
      window.dispatchEvent(event);

      fixture.detectChanges();

      if (originalActiveField.rowIndex > 0) {
        expect(component.activeField.rowIndex).toEqual(originalActiveField.rowIndex - 1);
      } else {
        expect(component.activeField).toEqual(originalActiveField);
      }
    });

    it('move down', () => {
      const event: Event = new KeyboardEvent('keydown', { 'key': 'arrowDown' });
      window.dispatchEvent(event);

      fixture.detectChanges();

      if (originalActiveField.rowIndex < component.sudoku.length - 1) {
        expect(component.activeField.rowIndex).toEqual(originalActiveField.rowIndex + 1);
      } else {
        expect(component.activeField).toEqual(originalActiveField);
      }
    });
  });
});
