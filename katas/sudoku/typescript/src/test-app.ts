import { RawPuzzle } from './@types/Sudoku';
import SudokuPuzzle from './Sudoku';

const rawPuzzle: RawPuzzle = [
    [0,0,0,5,0,6,0,0,0],
    [0,8,0,0,0,9,0,0,3],
    [0,0,2,8,7,0,0,0,0],
    [1,2,0,0,0,0,5,0,4],
    [0,0,9,0,0,0,2,0,0],
    [5,0,7,0,0,0,0,6,8],
    [0,0,0,0,3,8,4,0,0],
    [6,0,0,9,0,0,0,2,0],
    [0,0,0,7,0,4,0,0,0]
];

const sudoku = new SudokuPuzzle(rawPuzzle, 'extreme6');
console.log(sudoku.findAllPossibilities());
