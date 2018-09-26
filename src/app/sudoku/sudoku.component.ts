import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Sudoku, SudokuField } from './sudoku';
import { NumberButton } from './number-button';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss']
})
export class SudokuComponent implements OnChanges {
  @Input() sudoku: Sudoku;

  activeField?: SudokuField;
  noteMode = false;

  numberButtons: NumberButton[] = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 7 },
    { number: 8 },
    { number: 9 }
  ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sudoku) {
      this.activeField = undefined;
      this.checkNumbers();
    }
  }

  @HostListener('window:keydown.space') onSpace() {
    this.noteMode = !this.noteMode;
  }

  @HostListener('window:keydown.arrowUp') onArrowUp(): void {
    this.moveFocus(0, -1);
  }

  @HostListener('window:keydown.arrowDown') onArrowDown(): void {
    this.moveFocus(0, 1);
  }

  @HostListener('window:keydown.arrowLeft') onArrowLeft(): void {
    this.moveFocus(-1, 0);
  }

  @HostListener('window:keydown.arrowRight') onArrowRight(): void {
    this.moveFocus(1, 0);
  }

  @HostListener('window:keydown.backspace') onBackspace(): void {
    this.erase();
  }

  @HostListener('window:keydown', ['$event'])

  onKeyDown(event: KeyboardEvent) {
    const number = parseInt(event.key, 10);

    if (!this.activeField || isNaN(number) || number < 1 || number > 9) {
      return;
    }

    this.insertNumber(number);
  }

  erase() {
    if (this.activeField && !this.activeField.readonly) {
      this.activeField.notes = [];
      this.activeField.value = undefined;
      this.checkConflicts();
    }
  }

  insertNumber(number: number) {
    const field = this.activeField;

    if (!this.activeField) {
      return;
    }

    if (this.noteMode && !field.value) {
      if (!field.notes) {
        this.activeField.notes = [];
      }

      if (!field.notes.find(i => i === number)) {
        field.notes = field.notes.concat(number);
      } else {
        field.notes = field.notes.filter(i => i !== number);
      }
    } else if (!this.noteMode && !field.readonly) {
      field.value = number;

      this.cleanNotes();
      this.checkNumbers();
      this.checkFinished();
      this.checkConflicts();
    }
  }

  private moveFocus(relativeCol = 0, relativeRow = 0): void {
    if (!this.activeField) {
      return;
    }

    const newRow = this.between(this.activeField.rowIndex + relativeRow, 0, 8);
    const newCol = this.between(this.activeField.colIndex + relativeCol, 0, 8);
    this.activeField = this.sudoku[newRow][newCol];
  }

  private between(newValue: number, min: number, max: number): number {
    return Math.min(Math.max(newValue, min), max);
  }

  private cleanNotes(): void {
    if (!this.activeField) {
      return;
    }

    const removeNote = (field: SudokuField) => {
      field.notes = field.notes ? field.notes.filter(n => n !== this.activeField.value) : [];
    };

    const inputs = JSON.parse(JSON.stringify(this.sudoku)).flat();

    inputs.forEach(cell => {
      const field = this.activeField;
      const removable = (
        cell.rowIndex === field.rowIndex || cell.colIndex === field.colIndex || cell.squareIndex === field.squareIndex
      );

      if (removable) {
        removeNote(cell);
      }
    });
  }

  private checkNumbers(): void {
    const countNumber = i => this.sudoku.reduce((sum, row) => sum + row.filter(f => f.value === i).length, 0);
    this.numberButtons.forEach(button => {
      button.disabled = countNumber(button.number) >= 9;
    });
  }

  private checkFinished(): void {
    // if (this.finished) {
    //   this.finish.emit();
    // }
  }

  private get finished(): boolean {
    return this.sudoku.every(row => row.every(field => field.value === field.answer));
  }

  private duplicatesPresent(cell): boolean {
    const inputs = JSON.parse(JSON.stringify(this.sudoku)).flat();
    const duplicates = inputs.filter(input => {
      return (
        cell.value === input.value && (
        cell.rowIndex === input.rowIndex ||
        cell.colIndex === input.colIndex ||
        cell.squareIndex === input.squareIndex
      ));
    });

    return duplicates.length > 1;
  }

  private checkConflicts(): void {
    for (let rowIndex in this.sudoku) {
      for (const colIndex in this.sudoku[rowIndex]) {
        const cell = this.sudoku[rowIndex][colIndex];

        if (cell.value && !cell.readonly && this.duplicatesPresent(cell)) {
          cell.conflict = true;
        } else {
          cell.conflict = false;
        }
      }
    }
  }
}
