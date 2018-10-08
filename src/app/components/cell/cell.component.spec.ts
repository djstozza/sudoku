import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from '../game/game.component';
import { CellComponent } from './cell.component';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { SudokuService } from '../../services/sudoku.service';
import { MatDialog } from '@angular/material';
import { DifficultySelectComponent } from '../difficulty-select/difficulty-select.component';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;
  let compiled: any = null;
  let cells: any = null;
  let cell: any = null;
  let rowIndex: number = null;
  let colIndex: number = null;
  let cellIndex: number = null;
  let squareIndex: number = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const game = new GameComponent(new SudokuService(), new MatDialog(), new DifficultySelectComponent());
    const difficulty = new DifficultySelectComponent().difficulties.pop();
    game.onSetDifficulty(difficulty)
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    component.sudoku = game.sudoku;

    rowIndex = Math.floor(Math.random() * (component.sudoku.length -1));
    colIndex = Math.floor(Math.random() * (component.sudoku.length - 1));
    cellIndex = rowIndex * 9 + colIndex;
    squareIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);

    component.activeField = game.sudoku[rowIndex][colIndex];
    fixture.detectChanges();

    compiled = fixture.debugElement.nativeElement;
    cells = compiled.querySelectorAll('.cell');
    cell = cells[cellIndex];
  });

  it('should highlight the active cell', () => {
    expect(cell.classList.contains('active')).toBeTruthy();
  });

  it('should highlight cells in the same row, column and square', () => {
    const sudokuArr = JSON.parse(JSON.stringify(component.sudoku)).flat();

    for (let index in sudokuArr) {
      if (sudokuArr[index].rowIndex === rowIndex) {
        expect(cells[index].classList.contains('highlight-row')).toBeTruthy();
      }

      if (sudokuArr[index].colIndex === colIndex) {
        expect(cells[index].classList.contains('highlight-col')).toBeTruthy();
      }

      if (sudokuArr[index].squareIndex === squareIndex) {
        expect(cells[index].classList.contains('highlight-square')).toBeTruthy();
      }
    }
  });
});
