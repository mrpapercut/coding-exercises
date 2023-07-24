"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sudoku_1 = require("./Sudoku");
var rawPuzzle = [
    [0, 0, 0, 5, 0, 6, 0, 0, 0],
    [0, 8, 0, 0, 0, 9, 0, 0, 3],
    [0, 0, 2, 8, 7, 0, 0, 0, 0],
    [1, 2, 0, 0, 0, 0, 5, 0, 4],
    [0, 0, 9, 0, 0, 0, 2, 0, 0],
    [5, 0, 7, 0, 0, 0, 0, 6, 8],
    [0, 0, 0, 0, 3, 8, 4, 0, 0],
    [6, 0, 0, 9, 0, 0, 0, 2, 0],
    [0, 0, 0, 7, 0, 4, 0, 0, 0]
];
var sudoku = new Sudoku_1.default(rawPuzzle, 'extreme6');
console.log(sudoku.findAllPossibilities());
