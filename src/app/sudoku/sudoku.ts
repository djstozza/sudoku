export type Sudoku = SudokuField[][];

export interface SudokuField {
  answer: number;
  value?: number;
  notes?: number[];
  readonly?: boolean;
  rowIndex: number;
  colIndex: number;
  squareRows: number[];
  squareCols: number[];
  conflict?: boolean;
}
