import { Component, HostListener } from '@angular/core';
import { SudokuService } from './sudoku.service';
import { Sudoku } from './sudoku/sudoku';
import { Subscription, timer } from 'rxjs';

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
  private _difficulty: string = 'moderate';

  private timerSubscription: Subscription;

  private _difficultiesHash: any = {
    easy: 46,
    moderate: 36,
    hard: 29,
    expert: 23,
    insane: 17
  }

  private _difficultiesArr: string[] = Object.keys(this._difficultiesHash);

  constructor(private _sudokuService: SudokuService) { }

  ngOnInit(): void {
    this.generate();
  }

  @HostListener('window:keydown', ['$event'])

  private onKeyDown(event: KeyboardEvent) {
    if (event.key === 'p' && this.elapsedTime) {
      this.pauseTimer();
    }
  }

  public setDifficulty(difficulty): void {
    if (this._difficultiesArr.indexOf(difficulty) > -1) {
      this._difficulty = difficulty;
    } else {
      this._difficulty = 'moderate';
    }

    this.generate();
  }

  public difficultyText(difficulty): string {
    return difficulty[0].toUpperCase() + difficulty.slice(1);
  }

  public pauseTimer(): void {
    this.paused = !this.paused;

    if (this.paused) {
      this.timerSubscription.unsubscribe();
    } else {
      this.timerSubscription = timer(0, 1000).subscribe(time => time > 0 ? this.elapsedTime++ : this.elapsedTime);
    }
  }

  private generate(): void {
    const solution = this._sudokuService.makePuzzle();
    const puzzle = this._sudokuService.pluck(solution, this._difficultiesHash[this._difficulty]);

    this.sudoku = solution.map((row, rowIndex) => row.map((number, colIndex) => {
      const value = puzzle[rowIndex][colIndex];

      const squareRow = Math.floor(rowIndex / 3);
      const squareCol = Math.floor(colIndex / 3);
      const squareIndex = squareRow * 3 + squareCol;

      return {
        answer: number,
        rowIndex: rowIndex,
        colIndex: colIndex,
        squareIndex: squareIndex,
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

  public get difficulty() { return this._difficulty }
  public get difficultiesHash() { return this._difficultiesHash }
  public get difficultiesArr() { return this._difficultiesArr }
}
