import { Component, HostListener } from '@angular/core';
import { SudokuService } from './sudoku.service';
import { Sudoku } from './sudoku/sudoku';
import { Subscription, timer, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sudoku';
  sudoku: Sudoku;
  elapsedTime: number;
  paused = false;

  private timerSubscription: Subscription;

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

  @HostListener('window:keydown', ['$event'])

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'p' && this.elapsedTime) {
      this.pauseTimer();
    }
  }

  pauseTimer(): void {
    this.paused = !this.paused;
    if (this.paused) {
      this.timerSubscription.unsubscribe();
    } else {
      this.timerSubscription = timer(0, 1000).subscribe(time => {
        if (time > 0) {
          this.elapsedTime += time / time;
        } else {
          this.elapsedTime;
        }
      });
    }
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

    this.startTimer();
  }

  private startTimer(): void {
    if (this.timerSubscription) {
      this.paused = false;
      this.elapsedTime = null;
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = timer(5000, 1000).subscribe(time => this.elapsedTime = time);
  }
}
