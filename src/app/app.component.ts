import { Component } from '@angular/core';
import { SudokuService } from './sudoku.service';
import { Sudoku } from './sudoku/sudoku';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sudoku';
  sudoku: Sudoku;

  private difficulties: any = {
    easy: 46,
    moderate: 36,
    hard: 29,
    expert: 23,
    insane: 17
  }

  constructor(private _sudokuService: SudokuService) { }

  ngOnInit(): void {
    this.generate('moderate');
  }

  private generate(difficulty): void {
    const solution = this._sudokuService.makePuzzle();
    const puzzle = this._sudokuService.pluck(solution, this.difficulties[difficulty]);

    this.sudoku = solution.map((row, rowIndex) => row.map((number, colIndex) => {
      const value = puzzle[rowIndex][colIndex];

      const rowRemainder = rowIndex - rowIndex % 3;
      const columnRemainder = colIndex - colIndex % 3;

      const squareRows = Array.from({ length: 3 }, (x, i) => rowRemainder + i);
      const squareCols = Array.from({ length: 3 }, (x, i) => columnRemainder + i);

      return {
        answer: number,
        rowIndex: rowIndex,
        colIndex: colIndex,
        squareRows: squareRows,
        squareCols: squareCols,
        value: value,
        readonly: value
      }
    }));
  }
}
