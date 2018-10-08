import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sudoku, SudokuField } from '../../models/sudoku.model';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() sudoku: Sudoku;
  @Input() activeField?: SudokuField;
  @Output() activeFieldChange = new EventEmitter<SudokuField>();

  onFieldClick(field: SudokuField): void {
    this.activeField = this.activeField === field ? undefined : field;
    this.activeFieldChange.emit(this.activeField);
  }
}
