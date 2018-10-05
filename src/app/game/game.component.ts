import { Component, HostListener, OnInit, Input, Output } from '@angular/core';
import { SudokuService } from '../sudoku.service';
import { Sudoku } from '../sudoku/sudoku';
import { Subscription, timer } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CompletionDialogComponent } from '../completion-dialog/completion-dialog.component';
import { Difficulty } from '../difficulty.model';
import { DifficultySelectComponent } from '../difficulty-select/difficulty-select.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  sudoku: Sudoku;
  elapsedTime: number;
  paused = false;

  private timerSubscription: Subscription;
  private _difficulty: Difficulty;

  constructor(
    private _sudokuService: SudokuService,
    private dialog: MatDialog,
    private difficultySelect: DifficultySelectComponent
  ) {
    this._difficulty = this.difficultySelect.difficulties[1];

    this.generate();
  }

  ngOnInit(): void {
    this.generate();
  }

  @HostListener('window:keydown', ['$event'])

  private onKeyDown(event: KeyboardEvent) {
    if (event.key === 'p' && this.elapsedTime) {
      this.pauseTimer();
    }
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

  onSetDifficulty(difficulty) {
    this._difficulty = difficulty;
    this.generate();
  }

  private generate(): void {
    const solution = this._sudokuService.makePuzzle();
    const puzzle = this._sudokuService.pluck(solution, this._difficulty.value);

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
        readonly: typeof(value) === "number"
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

    this.timerSubscription = timer(0, 1000).subscribe(time => this.elapsedTime = time);
  }

  onGameFinished() {
    this.timerSubscription.unsubscribe();

    this.dialog
      .open(
        CompletionDialogComponent,
        {
          disableClose: true,
          data: { time: this.elapsedTime, difficulty: this._difficulty.name },
        }
      )
      .afterClosed()
      .subscribe(() => this.generate());
  }

  public get difficulty() { return this._difficulty }
}
