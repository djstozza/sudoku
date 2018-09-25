export type Sudoku = SudokuField[][];

export interface SudokuField {
  answer: number;
  value?: number;
  notes?: number[];
  readonly?: boolean;
  rowIndex: number;
  colIndex: number;
  squareIndex: number;
  conflict?: boolean;
}
