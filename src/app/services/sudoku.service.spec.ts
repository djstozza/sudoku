import { TestBed, inject } from '@angular/core/testing';

import { SudokuService } from './sudoku.service';

describe('SudokuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SudokuService]
    });
  });

  it('makePuzzle - makes a valid sudoku puzzle', inject([SudokuService], (service: SudokuService) => {
    const puzzle = service.makePuzzle();
    let columns = [[],[],[],[],[],[],[],[],[]];
    let squares = [[],[],[],[],[],[],[],[],[]];

    expect(puzzle.length).toBe(9);

    for (let rowIndex in puzzle) {
      const row = puzzle[rowIndex];
      const squareRow = Math.floor(parseInt(rowIndex) / 3);

      expect(row.length).toBe(9);

      for (let colIndex in row) {
        const number = puzzle[rowIndex][colIndex];
        const squareCol = Math.floor(parseInt(colIndex) / 3);
        const squareIndex = squareRow * 3 + squareCol;

        columns[colIndex].push(number);
        squares[squareIndex].push(number);

        // All rows consist of 9 unique numbers
        expect(row.filter(f => f === number).length).toBe(1);
      }
    }

    for (let colIndex in columns) {
      const column = columns[colIndex]

      for (let rowIndex in column) {
        const number = columns[colIndex][rowIndex];

        // All columns consist of 9 unique numbers
        expect(column.filter(f => f === number).length).toBe(1);
      }
    }

    for (let squareIndex in squares) {
      const square = squares[squareIndex];

      for (let cell in square) {
        const number = squares[squareIndex][cell];

        // All squares consist of 9 unique numbers;
        expect(square.filter(f => f === number).length).toBe(1);
      }
    }
  }));

  it('pluck', inject([SudokuService], (service: SudokuService) => {
    const puzzle = service.makePuzzle();
    const readOnlyCount = 20;
    const maskedPuzzle = service.pluck(puzzle, readOnlyCount);

    const flattenedPuzzle = JSON.parse(JSON.stringify(puzzle)).flat();
    const flattededMaskedPuzzle = JSON.parse(JSON.stringify(maskedPuzzle)).flat();

    expect(flattededMaskedPuzzle.filter(f => typeof(f) === 'number').length).toBe(readOnlyCount);

    for (let index in flattededMaskedPuzzle) {
      const number = flattededMaskedPuzzle[index];

      if (number) {
        expect(number).toBe(flattenedPuzzle[index]);
      }
    }
  }));
});
