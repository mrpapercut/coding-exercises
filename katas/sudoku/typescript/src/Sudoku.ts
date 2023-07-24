import {
    RawPuzzle,
    Fields,
    Field,
    Cell,
    SudokuPuzzle as SudokuPuzzleC
} from './@types/Sudoku'

class SudokuPuzzle extends SudokuPuzzleC {
    fields: Fields = []
    currentField: Field
    fieldsIndex: number

    startTime = +new Date()
    rawPuzzle: RawPuzzle

    operations: string[] = []
    madeChoices: Record<string, any> = {}

    constructor(providedPuzzle: RawPuzzle, puzzleName: string) {
        super(providedPuzzle, puzzleName);

        this.rawPuzzle = providedPuzzle;

        this.addField();

        this.populateFieldFromRawPuzzle(providedPuzzle)
    }

    logOperation(message: string): void {
        this.operations.push(message);
    }

    addField(): void {
        this.currentField = [];

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.currentField.push({
                    row: i,
                    col: j,
                    val: 0
                });
            }
        }

        this.fields.push(this.currentField);
        this.fieldsIndex = this.fields.length - 1;
    }

    revertField(): void {
        if (this.fieldsIndex === 0 || this.fields.length <= 1) return;

        this.fieldsIndex--;

        this.fields = this.fields.slice(0, this.fieldsIndex + 1);
        this.currentField = this.fields[this.fieldsIndex];
    }

    getEmptyCells(): Cell[] {
        return this.currentField.filter(fc => fc.val === 0);
    }

    findRow(rowidx: number): Cell[] {
        return this.currentField.filter(fc => fc.row === rowidx);
    }

    findColumn(cellidx: number): Cell[] {
        return this.currentField.filter(fc => fc.col === cellidx);
    }

    findBox(rowidx: number, cellidx: number): Cell[] {
        let fields: Cell[] = [];

        // Find the full rows
        if (rowidx < 3) fields = this.currentField.filter(fc => fc.row < 3)
        else if (rowidx < 6) fields = this.currentField.filter(fc => fc.row >= 3 && fc.row < 6)
        else fields = this.currentField.filter(fc => fc.row >= 6);

        // Filter included columns from full rows
        if (cellidx < 3) fields = fields.filter(fc => fc.col < 3)
        else if (cellidx < 6) fields = fields.filter(fc => fc.col >= 3 && fc.col < 6)
        else fields = fields.filter(fc => fc.col >= 6);

        return fields;
    }

    findNeighbours(rowidx: number, cellidx: number): { rows: Cell[], cols: Cell[], box: Cell[] } {
        const rows = this.findRow(rowidx)
        const cols = this.findColumn(cellidx);
        const box = this.findBox(rowidx, cellidx);

        return {
            rows,
            cols,
            box
        }
    }

    populateFieldFromRawPuzzle(rawPuzzle: RawPuzzle): void {
        if (Array.isArray(rawPuzzle) && rawPuzzle.length > 0
            && rawPuzzle.every(row => Array.isArray(row) && row.length === rawPuzzle.length)) { // Check if provided puzzle is a square
                rawPuzzle.forEach((row, ridx) => {
                row.forEach((cell, cidx) => {
                    if (cell !== 0) {
                        this.fields[this.fieldsIndex].forEach(fc => {
                            if (fc.row === ridx && fc.col === cidx) fc.val = cell;
                        });
                    }
                });
            });
        }
    }

    populateFieldFromPreviousField(): void {
        const prevField = this.fields[this.fieldsIndex - 1];

        prevField.forEach(pfc => {
            this.currentField.forEach(fc => {
                if (fc.row === pfc.row && fc.col === pfc.col) fc.val = pfc.val;
            });
        });
    }

    findPossibleNumbersInNeighbours(rowidx: number, cellidx: number): number[] {
        const possibilities: number[] = [];
        const neighbours = this.findNeighbours(rowidx, cellidx);

        for (let i = 1; i <= 9; i++) {
            if (!neighbours.rows.find(fc => fc.val === i)
            && !neighbours.cols.find(fc => fc.val === i)
            && !neighbours.box.find(fc => fc.val === i)) {
                possibilities.push(i);
            }
        }

        return possibilities;
    }

    findUniqueInArraysOfArrays(array: number[][]): {value: number, idx: number}[] {
        const flmap = array.flatMap(n => n);

        // Cache checked numbers
        const checked: number[] = [];
        const results: {value: number, idx: number}[] = [];

        array.forEach((subarr, idx) => {
            subarr.forEach(n1 => {
                if (checked.includes(n1)) return;
                if (flmap.filter(n2 => n2 === n1).length === 1) {
                    results.push({
                        value: n1,
                        idx
                    });
                }
            });
        });

        return results;
    }

    findAllPossibilities(): { solved: boolean, time: number, ops: number, remaining: number} {
        this.findByNumber();
        this.findByLeastChoice();
        this.findByChoiceTrial();

        const ops = this.operations.length;
        const remaining = this.currentField.filter(fc => fc.val === 0).length;

        if (remaining === 0) {
            return {
                solved: true,
                time: +new Date() - this.startTime,
                ops,
                remaining
            }
        } else {
            // Revert to previous field
            // If no previous field available, puzzle is unsolvable
            if (this.fieldsIndex !== 0) {
                this.revertField();

                return this.findAllPossibilities();
            } else {
                console.error('Unsolvable');

                return {
                    solved: false,
                    time: +new Date() - this.startTime,
                    ops,
                    remaining
                }
            }
        }
    }

    /**
     * Checks every number for possible cells
     * Sometimes there are more possibilities for one cell, but one of those can only exist in that particular cell.
     * Check if a number occurs only once in all possibilities of either row, col, or box
     */
    findByNumber(): void {
        // Get all boxes by calling the center cells of each box
        for (let i = 1; i < 9; i += 3) {
            for (let j = 1; j < 9; j += 3) {
                const box = this.findBox(i, j).filter(fc => fc.val === 0);

                const possibilities = box.map(fc => this.findPossibleNumbersInNeighbours(fc.row, fc.col));
                const uniqValues = this.findUniqueInArraysOfArrays(possibilities);

                if (uniqValues.length > 0) uniqValues.forEach(({value, idx}) => {
                    const foundCell = box[idx];
                    const fidx = this.currentField.findIndex(fc => fc.row === foundCell.row && fc.col === foundCell.col);
                    this.currentField[fidx].val = value;

                    this.logOperation(`Changed ${foundCell.row}:${foundCell.col} to ${foundCell.val} using unique number search`);

                    return this.findByNumber();
                });
            }
        }

        // Do the same for all rows and columns
        for (let i = 0; i < 9; i++) {
            const row = this.findRow(i).filter(fc => fc.val === 0);
            const col = this.findColumn(i).filter(fc => fc.val === 0);

            [row, col].forEach(set => {
                const possibilities = set.map(fc => this.findPossibleNumbersInNeighbours(fc.row, fc.col));
                const uniqValues = this.findUniqueInArraysOfArrays(possibilities);

                if (uniqValues.length > 0) uniqValues.forEach(({value, idx}) => {
                    const foundCell = set[idx];
                    const fidx = this.currentField.findIndex(fc => fc.row === foundCell.row && fc.col === foundCell.col);
                    this.currentField[fidx].val = value;

                    this.logOperation(`Changed ${foundCell.row}:${foundCell.col} to ${foundCell.val} using unique number search`);

                    return this.findByNumber();
                });
            });
        }
    }

    findByLeastChoice(): void {
        this.currentField.forEach(fc => {
            if (fc.val === 0) {
                const possibilities = this.findPossibleNumbersInNeighbours(fc.row, fc.col);

                if (possibilities.length === 1) {
                    fc.val = possibilities[0];

                    this.logOperation(`Changed ${fc.row}:${fc.col} to ${fc.val} using possibility elimination`);

                    return this.findAllPossibilities();
                }
            }
        });
    }

    findByChoiceTrial(): void {
        for (let i = 0; i < this.currentField.length; i++) {
            const fc = this.currentField[i];
            if (fc.val === 0) {
                const possibilities = this.findPossibleNumbersInNeighbours(fc.row, fc.col);

                // document.querySelector(`.cell${fc.row}${fc.col}`)?.setAttribute('data-poss', possibilities.join(' '));

                if (possibilities.length === 2) {
                    this.addField();
                    this.populateFieldFromPreviousField();
                    /**
                     * 1. Choose the first possibility
                     * 2. Create new field with this possibility filled in
                     * 3. Try to keep finding possibilities
                     * 4. If none found:
                     * 4a. Return to previous field
                     * 4b. Choose second possibility
                     * 4c. Repeat
                     */

                    // If doesn't yet exist in this.choices, choose 0
                    // Else, up one from recorded idx in choices
                    let choice;
                    if (!Object.keys(this.madeChoices).includes(`${fc.row}${fc.col}`)) {
                        this.madeChoices[`${fc.row}${fc.col}`] = 0;
                        choice = possibilities[0];
                    } else {
                        this.madeChoices[`${fc.row}${fc.col}`]++;
                        choice = possibilities[this.madeChoices[`${fc.row}${fc.col}`]];
                    }

                    if (typeof choice === 'undefined') {
                        delete this.madeChoices[`${fc.row}${fc.col}`];
                        this.revertField();
                        return;
                    }

                    // Change value in new field
                    const newfield = this.currentField.find(nfc => nfc.row === fc.row && nfc.col === fc.col);
                    if (newfield) newfield.val = choice;

                    this.logOperation(`Changed ${fc.row}:${fc.col} to ${choice} using choice trial`);

                    this.findAllPossibilities();
                    return;
                }
            }
        }
    }
}

export default SudokuPuzzle;
