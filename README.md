# MEAN Sudoku

A sudoku puzzle generator built using a MEAN (MongoDB Express Angular Node) stack. Users can generate and attempt to solve sudoku puzzles of varying difficulty ranging from easy (46 clues given) to insane (17 clues given - [the minimum amount of clues for a unique sudoku puzzle](https://www.technologyreview.com/s/426554/mathematicians-solve-minimum-sudoku-problem/).

The `SudokuService`, which was appropriated from [here](https://gist.github.com/goldensunliu/039c1b9a05c5396f5515695b05f66660#file-makeboard-js), is responsible for generating puzzles, which are then compiled on to a 9x9 grid by the `GameComponent` and its child components. Once a puzzle has been completed, the user has the opportunity to submit their time along with their name and the difficulty of the puzzle, which is subsequently stored in MongoDB.

[Ng-sudoku](https://github.com/dirkluijk/ng-sudoku) formed the basis for the front-end structure.

## Development server

Run `npm run dev` for the full-stack dev server. Navigate to `http://localhost:4000/`.

## Build

Run `ng build` to build the Angular front end. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
