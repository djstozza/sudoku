import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { CellComponent } from './cell.component';
import { FormatTimePipe } from '../format-time.pipe';
import { SudokuService } from '../sudoku.service';
import { MatDialog } from '@angular/material';

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
    const app = new AppComponent(new SudokuService(), new MatDialog());
    app.setDifficulty('insane');
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    component.sudoku = app.sudoku;

    rowIndex = Math.floor(Math.random() * (component.sudoku.length -1));
    colIndex = Math.floor(Math.random() * (component.sudoku.length - 1));
    cellIndex = rowIndex * 9 + colIndex;
    squareIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);

    component.activeField = app.sudoku[rowIndex][colIndex];
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
