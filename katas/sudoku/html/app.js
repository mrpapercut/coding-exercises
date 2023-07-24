class Sudoku {
    constructor(puzzle = {}, puzzlename = '') {
        this.ts = +new Date();

        this.puzzle = puzzle;

        // Used to store different fields
        this.fields = [];
        this.fieldsIndex = 0;

        // Store choices made
        this.choices = {};

        this.container = document.getElementById('app');
        this.infobox = document.getElementById('infobox');
        this.textOut = document.getElementById('out');
        this.numCount = document.getElementById('numcount');
        this.puzzlename = document.getElementById('puzzlename');
        this.puzzlename.innerHTML = puzzlename;

        // Clear output
        this.clearLog();

        // Add initial field
        this.addField();

        // Populate initial field with provided puzzle
        this.populateFieldFromPuzzle(this.puzzle);

        this.writeHTML();
    }

    solve() {
        this.ts = +new Date();
        this.findAllPossibilities();

        this.writeHTML();
    }

    addField() {
        this.field = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.field.push({
                    row: i,
                    col: j,
                    val: 0
                });
            }
        }
        this.fields.push(this.field);
        this.fieldsIndex = this.fields.length - 1;
    }

    revertField() {
        if (this.fieldsIndex === 0 || this.fields.length <= 1) return;

        this.fieldsIndex--;

        this.fields = this.fields.slice(0, this.fieldsIndex + 1);
        this.field = this.fields[this.fieldsIndex];
    }

    populateFieldFromPuzzle(puzzle) {
        if (Array.isArray(puzzle) && puzzle.length > 0
            && puzzle.every(row => Array.isArray(row) && row.length === puzzle.length)) { // Check if provided puzzle is a square
            puzzle.forEach((row, ridx) => {
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

    populateFieldFromField() {
        const prevField = this.fields[this.fieldsIndex - 1];
        prevField.forEach(pfc => {
            this.field.forEach(fc => {
                if (fc.row === pfc.row && fc.col === pfc.col) fc.val = pfc.val;
            });
        });
    }

    getEmptyCells() {
        return this.field.filter(fc => fc.val === 0);
    }

    findRow(rowidx) {
        return this.field.filter(fc => fc.row === rowidx);
    }

    findColumn(cellidx) {
        return this.field.filter(fc => fc.col === cellidx);
    }

    findBox(rowidx, cellidx) {
        let fields = [];

        // Find the full rows
        if (rowidx < 3) fields = this.field.filter(fc => fc.row < 3)
        else if (rowidx < 6) fields = this.field.filter(fc => fc.row >= 3 && fc.row < 6)
        else fields = this.field.filter(fc => fc.row >= 6);

        // Filter included columns from full rows
        if (cellidx < 3) fields = fields.filter(fc => fc.col < 3)
        else if (cellidx < 6) fields = fields.filter(fc => fc.col >= 3 && fc.col < 6)
        else fields = fields.filter(fc => fc.col >= 6);

        return fields;
    }

    findNeighbours(rowidx, cellidx) {
        const rows = this.findRow(rowidx)
        const cols = this.findColumn(cellidx);
        const box = this.findBox(rowidx, cellidx);

        return {
            rows,
            cols,
            box
        }
    }

    findPossibilities(row, col) {
        const possibilities = [];
        const neighbours = this.findNeighbours(row, col);

        for (let i = 1; i <= 9; i++) {
            if (!neighbours.rows.find(fc => fc.val === i)
            && !neighbours.cols.find(fc => fc.val === i)
            && !neighbours.box.find(fc => fc.val === i)) {
                possibilities.push(i);
            }
        }

        return possibilities;
    }

    findUniqueInNArrays(array) {
        const flmap = array.flatMap(n => n);

        // Cache checked numbers
        const checked = [];

        const results = [];

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

    /**
     * Checks every number for possible cells
     * Sometimes there are more possibilities for one cell, but one of those can only exist in that particular cell.
     * Check if a number occurs only once in all possibilities of either row, col, or box
     */
    findAllPossibilitiesByNumber() {
        // Get all boxes by calling the center cells of each box
        for (let i = 1; i < 9; i += 3) {
            for (let j = 1; j < 9; j += 3) {
                const box = this.findBox(i, j).filter(fc => fc.val === 0);

                const possibilities = box.map(fc => this.findPossibilities(fc.row, fc.col));
                const uniqValues = this.findUniqueInNArrays(possibilities);

                if (uniqValues.length > 0) uniqValues.forEach(({value, idx}) => {
                    const foundCell = box[idx];
                    const fidx = this.field.findIndex(fc => fc.row === foundCell.row && fc.col === foundCell.col);
                    this.field[fidx].val = value;
                    this.logText(`Changed ${foundCell.row}:${foundCell.col} to ${foundCell.val} using unique number search`);

                    return this.findAllPossibilitiesByNumber();
                });
            }
        }

        // Do the same for all rows and columns
        for (let i = 0; i < 9; i++) {
            const row = this.findRow(i).filter(fc => fc.val === 0);
            const col = this.findColumn(i).filter(fc => fc.val === 0);

            [row, col].forEach(set => {
                const possibilities = set.map(fc => this.findPossibilities(fc.row, fc.col));
                const uniqValues = this.findUniqueInNArrays(possibilities);

                if (uniqValues.length > 0) uniqValues.forEach(({value, idx}) => {
                    const foundCell = set[idx];
                    const fidx = this.field.findIndex(fc => fc.row === foundCell.row && fc.col === foundCell.col);
                    this.field[fidx].val = value;
                    this.logText(`Changed ${foundCell.row}:${foundCell.col} to ${foundCell.val} using unique number search`);

                    return this.findAllPossibilitiesByNumber();
                });
            });
        }
    }

    /**
     * Checks every cell for all possible values. If a cell has only 1 possibility, use that.
     * If a cell has more than 1 possibility, try each possibility and revert back to previous fields if unsuccessful
     */
    findAllPossibilitiesByLeastChoice() {
        this.field.forEach(fc => {
            if (fc.val === 0) {
                const possibilities = this.findPossibilities(fc.row, fc.col);

                document.querySelector(`.cell${fc.row}${fc.col}`)?.setAttribute('data-poss', possibilities.join(' '));

                if (possibilities.length === 1) {
                    fc.val = possibilities[0];
                    this.logText(`Changed ${fc.row}:${fc.col} to ${fc.val} using possibility elimination`);

                    return this.findAllPossibilities();
                }
            }
        });
    }

    findAllPossibilitiesByChoiceTrial() {
        // this.field.forEach(fc => {
        for (let i = 0; i < this.field.length; i++) {
            const fc = this.field[i];
            if (fc.val === 0) {
                const possibilities = this.findPossibilities(fc.row, fc.col);

                document.querySelector(`.cell${fc.row}${fc.col}`)?.setAttribute('data-poss', possibilities.join(' '));

                if (possibilities.length === 2) {
                    this.addField();
                    this.populateFieldFromField();
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
                    if (!Object.keys(this.choices).includes(`${fc.row}${fc.col}`)) {
                        this.choices[`${fc.row}${fc.col}`] = 0;
                        choice = possibilities[0];
                    } else {
                        this.choices[`${fc.row}${fc.col}`]++;
                        choice = possibilities[this.choices[`${fc.row}${fc.col}`]];
                    }

                    if (typeof choice === 'undefined') {
                        delete this.choices[`${fc.row}${fc.col}`];
                        this.revertField();
                        return;
                    }

                    // Change value in new field
                    this.field.find(nfc => nfc.row === fc.row && nfc.col === fc.col).val = choice;
                    this.logText(`Changed ${fc.row}:${fc.col} to ${choice} using choice trial`);

                    this.findAllPossibilities();
                    return;
                }
            }
        }//);
    }

    findAllPossibilities(forceChoice = 0) {
        this.findAllPossibilitiesByNumber();
        this.findAllPossibilitiesByLeastChoice();
        this.findAllPossibilitiesByChoiceTrial();

        const numcount = {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0}
        this.field.forEach(fc => numcount[fc.val]++);
        this.setNumCount(numcount);

        const ops = this.textOut.value.split('\n').length - 1;
        const remaining = this.field.filter(fc => fc.val === 0).length;

        if (remaining === 0) {
            this.updateInfobox(`Puzzle solved! ${ops} operations, took ${+new Date() - this.ts}ms`);
            return {
                solved: true,
                time: +new Date() - this.ts,
                ops,
                remaining
            }
        } else {
            // Revert to previous field
            // If no previous field available, puzzle is unsolvable
            if (this.fieldsIndex !== 0) {
                this.logText('Stuck, reverting');
                this.revertField();
                return this.findAllPossibilities();
            } else {
                console.error('Unsolvable');
                this.updateInfobox(`Puzzle unsolvable, ${remaining} cells left`);
                return {
                    solved: false,
                    time: +new Date() - this.ts,
                    ops,
                    remaining
                }
            }
        }
    }

    updateInfobox(msg) {
        this.infobox.innerHTML = msg;
    }

    logText(msg) {
        this.textOut.value = `${this.textOut.value}\n${msg}`;
    }

    clearLog() {
        this.textOut.value = '';
    }

    setNumCount(numcount) {
        // Clear div
        [...this.numCount.children].forEach(c => c.parentElement.removeChild(c));

        for (const num in numcount) {
            if (num === '0') continue;

            const nc = document.createElement('div');
            nc.setAttribute('data-count', numcount[num]);
            nc.setAttribute('data-val', num);

            if (numcount[num] === 9) nc.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';

            this.numCount.appendChild(nc);
        }
    }

    handleCellHover(cell) {
        let [, rowidx, cellidx] = cell.classList[1].match(/^cell(\d)(\d)$/);
        [rowidx, cellidx] = [rowidx, cellidx].map(_ => parseInt(_, 10));
        const fieldcell = this.field.find(fc => fc.row === rowidx && fc.col === cellidx);

        [...document.querySelectorAll('.cell')].forEach(c => c.style.backgroundColor = null);

        const neighbours = this.findNeighbours(rowidx, cellidx);

        neighbours.rows.forEach(rc => document.querySelector(`.cell${rc.row}${rc.col}`).style.backgroundColor = 'rgba(255, 0, 0, 0.1)');
        neighbours.cols.forEach(rc => document.querySelector(`.cell${rc.row}${rc.col}`).style.backgroundColor = 'rgba(0, 255, 0, 0.1)');
        neighbours.box.forEach(rc => document.querySelector(`.cell${rc.row}${rc.col}`).style.backgroundColor = 'rgba(0, 0, 255, 0.1)');

        const possibilities = [];
        if (fieldcell.val === 0) {
            for (let i = 1; i <= 9; i++) {
                if (!neighbours.rows.find(fc => fc.val === i) && !neighbours.cols.find(fc => fc.val === i) && !neighbours.box.find(fc => fc.val === i)) {
                    possibilities.push(i);
                }
            }
        }

        this.updateInfobox(`${rowidx}:${cellidx}<br>Possibilities: ${possibilities.join(', ')}`);

        cell.setAttribute('data-poss', possibilities.join(' '));
    }

    writeHTML() {
        // Reset container
        this.container.parentElement.removeChild(this.container);
        this.container = document.createElement('div');
        this.container.id = 'app';
        document.body.appendChild(this.container);

        for (let row = 0; row < 9; row++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');

            for (let cell = 0; cell < 9; cell++) {
                const fieldcell = this.field.find(fc => fc.row === row && fc.col === cell);

                const cellDiv = document.createElement('div');
                cellDiv.classList.add(`cell`);
                cellDiv.classList.add(`cell${row}${cell}`);

                cellDiv.addEventListener('mouseover', e => this.handleCellHover(e.target));

                cellDiv.setAttribute('data-val', fieldcell.val === 0 ? ' ' : fieldcell.val);

                rowDiv.appendChild(cellDiv);
            }

            this.container.appendChild(rowDiv);
        }
    }
}

window.addEventListener('load', e => {
    const easy = [
        [[0,0,2,0,7,9,0,0,0],[4,1,3,6,5,0,9,0,7],[0,0,0,3,0,4,5,1,2],[8,7,0,0,0,0,0,0,0],[0,3,0,0,0,0,0,9,0],[0,0,0,0,0,0,0,4,5],[2,6,9,5,0,3,0,0,0],[3,0,7,0,9,8,6,5,1],[0,0,0,4,6,0,2,0,0]],
        [[2,0,9,0,0,5,3,0,0],[6,0,0,0,9,7,8,0,0],[4,0,7,0,0,0,9,2,0],[1,3,0,0,0,0,6,0,9],[0,6,4,0,0,0,1,7,0],[9,0,5,0,0,0,0,4,3],[0,2,6,0,0,0,4,0,1],[0,0,1,3,4,0,0,0,8],[0,0,8,1,0,0,7,0,2]],
        [[1,2,0,0,6,8,7,4,5],[6,3,7,4,0,5,0,0,0],[0,0,0,1,2,0,0,0,3],[0,0,0,0,0,0,2,9,0],[0,0,1,0,0,0,5,0,0],[0,6,4,0,0,0,0,0,0],[3,0,0,0,8,4,0,0,0],[0,0,0,5,0,6,8,3,1],[8,7,6,9,1,0,0,5,2]],
        [[0,2,3,0,0,0,0,8,7],[0,5,7,0,0,3,0,6,0],[0,0,6,0,2,4,0,3,0],[2,0,4,0,0,0,9,1,0],[5,3,0,0,0,0,0,2,8],[0,8,9,0,0,0,3,0,4],[0,6,0,5,9,0,8,0,0],[0,4,0,1,0,0,7,9,0],[7,9,0,0,0,0,2,5,0]],
        [[8,5,4,9,2,0,0,1,6],[3,0,0,0,8,7,0,0,0],[0,0,0,1,0,4,8,3,2],[0,4,7,0,0,0,0,0,0],[0,0,2,0,0,0,1,0,0],[0,0,0,0,0,0,6,9,0],[4,3,5,7,0,1,0,0,0],[0,0,0,2,6,0,0,0,3],[2,6,0,0,4,8,5,7,1]],
        [[6,3,9,5,7,0,0,2,4],[1,0,0,0,6,8,0,0,0],[0,0,0,2,0,9,6,1,7],[0,9,8,0,0,0,0,0,0],[0,0,7,0,0,0,2,0,0],[0,0,0,0,0,0,4,5,0],[9,1,3,8,0,2,0,0,0],[0,0,0,7,4,0,0,0,1],[7,4,0,0,9,6,3,8,2]],
        [[9,4,0,0,3,8,5,1,6],[0,0,0,4,9,0,0,7,0],[7,3,5,6,0,1,0,0,0],[0,0,0,0,0,0,9,0,2],[0,0,4,0,0,0,1,0,0],[3,0,6,0,0,0,0,0,0],[0,0,0,1,0,3,8,4,7],[0,7,0,0,8,6,0,0,0],[5,8,3,2,4,0,0,9,1]],
        [[0,9,4,0,0,0,0,3,8],[0,5,0,8,0,0,0,6,4],[0,8,0,2,3,0,0,0,5],[7,1,0,0,0,0,3,0,2],[0,3,9,0,0,0,6,8,0],[8,0,2,0,0,0,0,9,7],[9,0,0,0,7,6,0,5,0],[4,7,0,0,0,1,0,2,0],[3,6,0,0,0,0,4,7,0]],
        [[0,0,8,0,9,0,0,0,2],[3,9,2,4,0,6,8,0,0],[0,0,0,0,0,8,9,4,3],[0,0,4,0,8,0,3,7,0],[0,7,0,9,0,4,0,8,0],[0,2,1,0,7,0,6,0,0],[2,8,9,7,0,0,0,0,0],[0,0,5,8,0,1,4,2,9],[4,0,0,0,3,0,7,0,0]],
        [[0,0,0,0,2,1,3,0,4],[3,0,2,0,0,0,8,1,9],[0,0,1,0,0,9,0,5,0],[9,0,8,0,0,4,0,0,0],[0,6,0,5,0,3,0,9,0],[0,0,0,2,0,0,7,0,3],[0,5,0,1,0,0,9,0,0],[8,1,4,0,0,0,6,0,7],[7,0,9,6,3,0,0,0,0]],
        [[6,3,1,5,0,9,0,0,0],[0,0,0,2,6,0,3,0,0],[0,9,8,0,1,7,6,4,5],[0,0,0,0,0,0,0,5,2],[9,0,0,0,0,0,0,0,1],[8,7,0,0,0,0,0,0,0],[4,2,9,6,5,0,1,8,0],[0,0,3,0,8,1,0,0,0],[0,0,0,9,0,2,5,3,4]],
        [[9,6,0,0,3,2,1,4,7],[5,3,4,1,0,9,0,0,0],[0,0,0,8,4,0,0,5,0],[0,0,0,0,0,0,8,0,1],[0,0,9,0,0,0,3,0,0],[2,0,6,0,0,0,0,0,0],[0,5,0,0,6,3,0,0,0],[0,0,0,9,0,8,7,1,5],[8,9,7,4,1,0,0,3,6]],
        [[5,1,0,0,0,0,9,7,0],[0,6,0,4,0,0,5,1,0],[0,2,0,7,1,0,3,0,0],[0,3,1,0,0,0,8,0,6],[7,8,0,0,0,0,0,9,3],[9,0,6,0,0,0,1,4,0],[0,0,2,0,9,6,0,8,0],[0,7,5,0,0,8,0,2,0],[0,9,8,0,0,0,0,3,5]],
        [[5,0,0,2,4,0,3,0,0],[6,0,0,8,0,0,9,0,4],[4,9,0,0,0,0,7,0,2],[3,0,4,0,0,0,1,6,0],[1,2,0,0,0,0,0,3,7],[0,7,6,0,0,0,4,0,8],[7,0,1,0,0,0,0,9,3],[2,0,9,0,0,1,0,0,5],[0,0,5,0,7,6,0,0,1]],
        [[0,0,0,9,0,1,3,2,5],[0,3,0,0,5,6,0,0,0],[1,5,8,4,2,0,9,7,0],[6,0,1,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,9],[0,0,0,0,0,0,4,0,7],[0,2,7,0,1,5,6,9,8],[0,0,0,2,7,0,0,3,0],[8,1,3,6,0,9,0,0,0]],
        [[0,8,7,0,0,4,2,0,0],[0,6,0,0,7,3,1,0,0],[0,5,3,0,0,0,7,0,8],[2,9,0,0,0,0,6,7,0],[6,0,5,0,0,0,9,0,3],[0,7,4,0,0,0,0,2,5],[8,0,6,0,0,0,5,9,0],[0,0,9,2,5,0,0,1,0],[0,0,1,9,0,0,3,8,0]],
        [[9,0,5,0,1,8,6,7,3],[0,0,0,4,6,0,2,0,0],[2,6,1,7,0,9,0,0,0],[0,0,0,0,0,0,0,4,7],[0,9,0,0,0,0,0,1,0],[8,5,0,0,0,0,0,0,0],[0,0,0,9,0,4,7,3,2],[0,0,2,0,5,1,0,0,0],[4,3,9,6,7,0,1,0,5]],
        [[0,0,0,9,8,0,0,7,0],[0,9,8,0,1,5,4,6,2],[2,1,7,4,0,6,0,0,0],[0,0,0,0,0,0,3,0,8],[9,0,0,0,0,0,0,0,6],[4,0,1,0,0,0,0,0,0],[0,0,0,6,0,1,7,9,5],[1,5,2,3,9,0,6,8,0],[0,7,0,0,5,4,0,0,0]],
        [[6,4,0,0,7,2,9,5,3],[7,1,9,5,0,3,0,0,0],[0,0,0,6,4,0,0,0,1],[0,0,0,0,0,0,4,8,0],[0,0,6,0,0,0,3,0,0],[0,7,5,0,0,0,0,0,0],[1,0,0,0,2,5,0,0,0],[0,0,0,3,0,7,2,1,6],[2,9,7,8,6,0,0,3,4]],
        [[0,0,0,7,1,0,4,0,0],[4,1,3,8,0,9,0,0,0],[9,0,6,0,3,5,1,8,2],[0,0,0,0,0,0,0,7,8],[0,9,0,0,0,0,0,3,0],[5,6,0,0,0,0,0,0,0],[7,2,9,1,8,0,3,0,6],[0,0,0,9,0,7,8,2,4],[0,0,4,0,6,3,0,0,0]],
        [[0,2,0,5,6,0,9,0,0],[1,6,0,0,0,0,7,5,0],[0,3,0,4,0,0,1,6,0],[0,9,6,0,0,0,8,0,3],[5,8,0,0,0,0,0,7,9],[7,0,3,0,0,0,6,4,0],[0,5,1,0,0,8,0,2,0],[0,7,8,0,0,0,0,9,1],[0,0,2,0,7,3,0,8,0]],
        [[0,0,4,0,9,5,0,0,0],[0,0,0,3,0,6,8,4,7],[7,6,3,2,8,0,5,9,0],[9,1,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,5],[0,0,0,0,0,0,0,8,6],[0,3,9,0,5,1,2,7,8],[2,4,5,8,0,3,0,0,0],[0,0,0,6,2,0,4,0,0]]
    ];

    const medium = [
        [[0,7,0,0,0,0,0,0,5],[0,0,0,1,0,0,2,8,0],[2,9,0,0,7,8,4,0,0],[9,0,2,7,0,0,0,5,0],[0,0,5,4,0,6,9,0,0],[0,6,0,0,0,9,7,0,4],[0,0,9,8,6,0,0,4,2],[0,8,3,0,0,2,0,0,0],[6,0,0,0,0,0,0,1,0]],
        [[0,0,6,4,8,0,0,2,1],[0,4,9,0,0,1,0,0,0],[8,0,0,0,0,0,0,3,0],[0,8,0,0,0,6,7,0,2],[0,0,5,2,0,8,6,0,0],[6,0,1,7,0,0,0,5,0],[0,7,0,0,0,0,0,0,5],[0,0,0,3,0,0,1,4,0],[1,6,0,0,7,4,2,0,0]],
        [[8,0,5,0,4,3,0,7,0],[0,0,9,0,0,0,0,0,4],[0,0,0,8,0,0,3,6,0],[5,2,0,7,0,0,4,0,0],[0,7,0,4,0,5,0,1,0],[0,0,1,0,0,2,0,8,7],[0,8,3,0,0,9,0,0,0],[1,0,0,0,0,0,2,0,0],[0,5,0,3,2,0,7,0,8]],
        [[8,9,0,0,0,2,0,0,0],[4,0,0,9,1,0,2,3,0],[0,0,1,0,0,0,0,6,0],[0,1,0,0,0,4,3,0,5],[7,0,0,3,0,1,0,0,4],[2,0,4,5,0,0,0,7,0],[0,5,0,0,0,0,7,0,0],[0,4,2,0,5,9,0,0,3],[0,0,0,6,0,0,0,9,2]],
        [[3,0,0,0,0,0,0,6,0],[4,2,0,0,6,5,9,0,0],[0,0,0,2,0,0,7,0,5],[0,4,1,9,0,0,0,0,6],[0,0,9,6,0,4,8,0,0],[8,0,0,0,0,1,2,9,0],[5,0,2,0,0,3,0,0,0],[0,0,4,5,1,0,0,2,9],[0,8,0,0,0,0,0,0,1]],
        [[0,0,0,8,0,9,0,0,4],[6,9,0,0,0,4,0,0,0],[1,8,0,0,0,0,0,3,0],[0,0,5,0,6,0,3,4,0],[0,0,0,2,0,5,0,0,0],[0,3,2,0,4,0,5,0,0],[0,6,0,0,0,0,0,7,8],[0,0,0,7,0,0,0,2,1],[7,0,0,4,0,6,0,0,0]],
        [[3,0,0,0,0,0,0,2,0],[0,0,0,9,0,0,5,0,8],[6,9,0,0,2,8,1,0,0],[0,6,7,1,0,0,0,0,2],[0,0,1,2,0,6,4,0,0],[4,0,0,0,0,7,9,1,0],[0,0,6,8,7,0,0,9,1],[8,0,9,0,0,3,0,0,0],[0,4,0,0,0,0,0,0,7]],
        [[0,0,0,3,5,0,0,2,4],[4,0,9,0,0,8,0,1,0],[2,0,0,4,0,0,8,0,0],[0,2,0,5,7,0,0,0,1],[7,0,0,0,0,0,0,0,3],[1,0,0,0,4,3,0,9,0],[0,0,7,0,0,5,0,0,2],[0,1,0,7,0,0,3,0,5],[5,6,0,0,8,2,0,0,0]],
        [[0,1,4,0,0,7,0,0,0],[0,0,3,1,8,0,0,5,4],[9,0,0,0,0,0,0,8,0],[0,9,0,0,0,8,4,0,5],[0,0,5,6,0,3,9,0,0],[3,0,8,5,0,0,0,6,0],[0,7,0,0,0,0,0,0,6],[4,3,0,0,6,1,5,0,0],[0,0,0,4,0,0,2,1,0]],
        [[0,0,0,2,9,0,5,6,0],[0,0,6,5,0,0,0,0,1],[7,0,5,0,0,1,0,3,0],[0,6,0,9,4,0,3,0,0],[0,0,4,0,0,0,2,0,0],[0,0,3,0,5,2,0,7,0],[0,3,0,4,0,0,9,0,2],[4,0,0,0,0,9,6,0,0],[0,8,9,0,1,6,0,0,0]],
        [[0,5,1,0,3,4,0,0,0],[7,0,0,0,0,5,0,1,0],[0,0,2,7,0,0,0,5,8],[0,2,0,0,6,3,1,0,0],[0,4,0,0,0,0,0,6,0],[0,0,8,4,5,0,0,2,0],[4,3,0,0,0,6,2,0,0],[0,1,0,3,0,0,0,0,6],[0,0,0,1,7,0,9,3,0]],
        [[0,0,7,3,0,0,0,2,4],[3,0,0,0,0,2,0,5,0],[0,2,5,0,1,9,0,0,0],[0,7,0,0,6,1,5,0,0],[0,9,0,0,0,0,0,6,0],[0,0,4,9,2,0,0,7,0],[0,0,0,5,3,0,8,1,0],[0,5,0,1,0,0,0,0,6],[9,1,0,0,0,6,7,0,0]],
        [[5,9,0,0,8,4,0,0,0],[1,0,0,2,0,0,7,9,0],[0,0,2,0,0,9,0,4,0],[0,1,0,0,3,7,0,0,6],[0,2,0,0,0,0,0,7,0],[4,0,0,9,2,0,0,1,0],[0,4,0,3,0,0,8,0,0],[0,3,6,0,0,8,0,0,1],[0,0,0,7,9,0,0,3,4]],
        [[0,0,0,1,0,0,0,6,5],[0,8,1,0,4,6,0,0,7],[0,9,0,0,0,0,4,0,0],[3,0,8,7,0,0,0,4,0],[7,0,0,4,0,8,0,0,2],[0,2,0,0,0,3,7,0,1],[0,0,2,0,0,0,0,3,0],[8,0,0,6,3,0,1,7,0],[1,6,0,0,0,9,0,0,0]],
        [[0,0,0,9,0,0,2,0,4],[6,2,0,0,1,4,7,0,0],[1,0,0,0,0,0,0,3,0],[0,6,2,1,0,0,0,0,3],[0,0,3,7,0,8,6,0,0],[8,0,0,0,0,6,1,7,0],[0,8,0,0,0,0,0,0,9],[0,0,6,4,8,0,0,2,7],[4,0,5,0,0,2,0,0,0]],
        [[0,0,0,2,6,0,0,8,1],[0,8,9,0,0,4,0,0,7],[0,2,0,8,0,0,4,0,0],[3,0,0,9,5,0,0,7,0],[0,9,0,0,0,0,0,4,0],[0,7,0,0,4,8,0,0,2],[0,0,6,0,0,5,0,2,0],[7,0,0,6,0,0,3,5,0],[2,5,0,0,8,9,0,0,0]],
        [[8,3,0,0,0,4,0,0,0],[2,0,0,3,1,0,4,5,0],[0,0,1,0,0,0,0,6,0],[0,1,0,0,0,2,5,0,9],[7,0,0,5,0,1,0,0,2],[4,0,2,9,0,0,0,7,0],[0,9,0,0,0,0,7,0,0],[0,2,4,0,9,3,0,0,5],[0,0,0,6,0,0,0,3,4]],
        [[5,7,0,0,1,2,0,0,0],[4,0,0,3,0,0,9,7,0],[0,0,3,0,0,7,0,2,0],[0,4,0,0,8,9,0,0,6],[0,3,0,0,0,0,0,9,0],[2,0,0,7,3,0,0,4,0],[0,2,0,8,0,0,1,0,0],[0,8,6,0,0,1,0,0,4],[0,0,0,9,7,0,0,8,2]],
        [[2,6,0,0,0,1,4,0,0],[0,0,0,7,8,0,5,6,0],[0,5,0,6,0,0,0,0,1],[0,0,5,8,9,0,0,4,0],[0,9,0,0,0,0,0,7,0],[0,4,0,0,6,7,2,0,0],[9,0,0,0,0,8,0,5,0],[0,8,3,0,1,5,0,0,0],[0,0,4,9,0,0,0,8,7]],
        [[0,0,7,2,0,0,0,4,0],[0,0,0,9,1,0,2,0,7],[0,3,2,0,0,4,0,0,5],[7,0,0,1,8,0,5,0,0],[0,0,8,0,0,0,9,0,0],[0,0,5,0,2,9,0,0,3],[5,0,0,8,0,0,1,9,0],[6,0,1,0,4,7,0,0,0],[0,8,0,0,0,1,7,0,0]],
        [[6,0,0,0,0,1,9,0,0],[0,3,0,6,0,0,1,0,2],[0,9,1,0,4,8,0,0,0],[0,0,3,0,7,4,0,9,0],[0,0,8,0,0,0,7,0,0],[0,2,0,8,1,0,3,0,0],[0,0,0,9,6,0,4,5,0],[8,0,4,0,0,7,0,3,0],[0,0,9,4,0,0,0,0,7]],
        [[6,1,0,0,0,3,8,0,0],[0,5,0,1,0,0,0,0,3],[0,0,0,2,9,0,5,1,0],[0,0,5,9,4,0,0,8,0],[0,4,0,0,0,0,0,2,0],[0,8,0,0,1,2,6,0,0],[0,9,7,0,3,5,0,0,0],[4,0,0,0,0,9,0,5,0],[0,0,8,4,0,0,0,9,2]],
        [[0,0,5,0,0,2,0,0,3],[0,1,0,5,0,0,9,0,2],[2,3,0,0,4,7,0,0,0],[1,0,0,0,6,4,0,3,0],[7,0,0,0,0,0,0,0,6],[0,9,0,7,2,0,0,0,1],[0,0,0,3,5,0,0,8,4],[4,0,7,0,0,6,0,1,0],[3,0,0,4,0,0,6,0,0]],
        [[0,0,0,5,0,0,0,6,4],[0,1,0,0,0,0,3,0,0],[0,8,5,0,3,6,0,0,9],[2,0,8,9,0,0,0,3,0],[9,0,0,3,0,8,0,0,7],[0,7,0,0,0,2,9,0,5],[8,0,0,6,2,0,5,9,0],[0,0,7,0,0,0,0,2,0],[5,6,0,0,0,1,0,0,0]],
        [[6,0,4,0,0,3,0,0,0],[9,0,0,4,7,0,2,6,0],[0,8,0,0,0,0,7,0,0],[0,0,8,0,0,7,0,2,6],[2,0,0,5,0,9,0,0,8],[7,9,0,2,0,0,5,0,0],[0,0,3,0,0,0,0,5,0],[0,6,9,0,5,4,0,0,2],[0,0,0,6,0,0,4,0,1]],
        [[0,0,3,7,6,0,0,5,1],[6,0,0,0,0,0,0,8,0],[0,7,9,0,0,1,0,0,0],[0,6,0,0,0,3,2,0,5],[0,0,4,5,0,6,3,0,0],[3,0,1,2,0,0,0,4,0],[0,0,0,8,0,0,1,7,0],[0,2,0,0,0,0,0,0,4],[1,3,0,0,2,7,5,0,0]]
    ];

    const hard = [
        [[0,0,0,0,0,3,0,9,4],[0,0,0,4,6,0,0,0,1],[0,0,2,0,0,7,0,0,3],[9,5,0,0,0,0,8,0,0],[6,0,7,0,0,0,1,0,5],[0,0,4,0,0,0,0,7,9],[8,0,0,2,0,0,4,0,0],[1,0,0,0,5,4,0,0,0],[4,2,0,1,0,0,0,0,0]],
        [[7,0,0,5,0,0,0,6,0],[6,0,5,2,0,0,0,0,0],[2,0,0,0,1,6,0,0,0],[0,6,0,0,0,0,8,0,9],[4,8,0,0,0,0,0,2,1],[9,0,1,0,0,0,0,7,0],[0,0,0,6,4,0,0,0,2],[0,0,0,0,0,3,9,0,6],[0,5,0,0,0,8,0,0,3]],
        [[1,3,4,0,8,9,0,0,0],[6,0,0,0,0,2,0,0,0],[0,0,0,1,7,0,6,0,0],[3,0,6,0,0,0,0,1,0],[0,2,0,0,0,0,0,8,0],[0,1,0,0,0,0,7,0,5],[0,0,1,0,3,4,0,0,0],[0,0,0,7,0,0,0,0,9],[0,0,0,9,2,0,5,3,1]],
        [[4,0,8,0,0,3,0,0,0],[0,0,0,0,0,4,7,0,9],[3,0,0,5,0,0,0,0,0],[0,1,0,0,0,7,4,0,0],[0,6,0,0,0,0,0,2,0],[0,0,2,3,0,0,0,7,0],[0,0,0,0,0,5,0,0,1],[9,0,4,8,0,0,0,0,0],[0,0,0,2,0,0,6,0,3]],
        [[6,0,0,0,3,5,0,0,0],[0,0,0,9,2,0,6,3,4],[0,0,0,7,0,0,9,0,0],[0,6,0,0,0,0,4,0,7],[0,2,0,0,0,0,0,1,0],[8,0,3,0,0,0,0,6,0],[0,0,8,0,0,2,0,0,0],[5,3,6,0,1,9,0,0,0],[0,0,0,6,7,0,0,0,8]],
        [[0,3,0,0,9,2,0,0,0],[0,0,0,4,1,0,7,6,2],[0,0,0,5,0,0,0,0,3],[0,0,2,0,0,0,0,3,7],[0,0,1,0,0,0,5,0,0],[8,9,0,0,0,0,2,0,0],[4,0,0,0,0,9,0,0,0],[2,8,7,0,5,4,0,0,0],[0,0,0,6,7,0,0,2,0]],
        [[3,0,0,0,2,1,0,0,0],[0,0,0,6,5,0,1,7,4],[0,0,0,8,0,0,3,0,0],[0,1,0,0,0,0,7,0,3],[0,5,0,0,0,0,0,8,0],[2,0,9,0,0,0,0,1,0],[0,0,6,0,0,2,0,0,0],[9,7,1,0,8,6,0,0,0],[0,0,0,4,7,0,0,0,1]],
        [[0,0,0,0,0,9,0,6,4],[0,0,6,0,0,4,0,3,0],[0,0,0,6,2,0,0,9,0],[8,5,0,0,0,0,6,0,0],[0,2,9,0,0,0,8,1,0],[0,0,3,0,0,0,0,5,2],[0,9,0,0,1,6,0,0,0],[0,7,0,8,0,0,4,0,0],[5,6,0,7,0,0,0,0,0]],
        [[0,0,0,3,0,0,0,0,2],[0,0,0,2,5,0,8,7,4],[0,4,0,0,8,9,0,0,0],[0,0,4,0,0,0,0,3,7],[0,0,5,0,0,0,1,0,0],[8,6,0,0,0,0,4,0,0],[0,0,0,4,3,0,0,6,0],[4,9,8,0,1,2,0,0,0],[6,0,0,0,0,5,0,0,0]],
        [[0,0,0,8,7,0,3,5,1],[0,1,0,0,3,9,0,0,0],[0,0,0,6,0,0,0,0,8],[0,0,1,0,0,0,0,6,5],[0,0,7,0,0,0,2,0,0],[3,4,0,0,0,0,1,0,0],[4,0,0,0,0,7,0,0,0],[0,0,0,1,6,0,0,4,0],[1,9,3,0,2,8,0,0,0]],
        [[4,8,6,0,7,5,0,0,0],[0,0,0,6,2,0,0,0,9],[0,0,9,0,0,1,0,0,0],[9,0,8,0,0,0,0,6,0],[0,1,0,0,0,0,0,7,0],[0,6,0,0,0,0,3,0,2],[0,0,0,2,0,0,5,0,0],[6,0,0,0,8,4,0,0,0],[0,0,0,5,1,0,6,8,3]]
    ];

    const extreme = [
        [[6,0,0,9,0,0,0,0,0],[0,9,0,0,4,5,0,0,0],[0,0,0,7,0,2,0,0,1],[0,6,2,0,0,0,5,0,4],[0,5,0,0,0,0,0,8,0],[4,0,1,0,0,0,3,6,0],[8,0,0,3,0,6,0,0,0],[0,0,0,2,9,0,0,3,0],[0,0,0,0,0,1,0,0,9]],
        [[0,2,0,4,0,0,0,0,7],[0,0,0,0,6,1,5,0,0],[0,0,0,3,0,5,0,0,0],[0,9,3,0,0,0,0,1,2],[0,0,4,0,0,0,7,0,0],[7,8,0,0,0,0,9,5,0],[0,0,0,9,0,2,0,0,0],[0,0,7,1,3,0,0,0,0],[1,0,0,0,0,4,0,6,0]],
        [[0,0,0,4,5,0,0,8,0],[0,0,6,8,0,3,0,0,0],[0,0,0,0,0,9,5,0,0],[9,0,2,0,0,0,0,3,8],[0,7,0,0,0,0,0,6,0],[4,3,0,0,0,0,2,0,7],[0,0,3,5,0,0,0,0,0],[0,0,0,1,0,4,9,0,0],[0,5,0,0,2,7,0,0,0]],
        [[2,0,0,9,8,0,0,0,0],[0,0,0,2,0,1,0,0,0],[0,6,0,0,0,7,3,0,0],[0,3,9,0,0,0,4,0,1],[6,0,0,0,0,0,0,0,7],[4,0,2,0,0,0,5,6,0],[0,0,8,7,0,0,0,9,0],[0,0,0,3,0,4,0,0,0],[0,0,0,0,1,9,0,0,6]],
        [[0,0,0,3,0,9,0,0,0],[0,0,0,0,6,8,0,5,0],[0,0,1,7,0,0,0,0,8],[0,9,4,0,0,0,2,0,5],[0,5,0,0,0,0,0,7,0],[3,0,8,0,0,0,9,6,0],[5,0,0,0,0,7,3,0,0],[0,4,0,8,1,0,0,0,0],[0,0,0,4,0,6,0,0,0]],
        [[0,0,0,1,2,0,8,0,0],[0,9,0,4,0,7,0,0,0],[0,0,0,0,0,8,0,6,0],[1,2,0,0,0,0,6,0,4],[0,0,5,0,0,0,1,0,0],[3,0,6,0,0,0,0,2,9],[0,8,0,9,0,0,0,0,0],[0,0,0,6,0,3,0,5,0],[0,0,3,0,8,4,0,0,0]],
        [[0,0,0,5,0,6,0,0,0],[0,8,0,0,0,9,0,0,3],[0,0,2,8,7,0,0,0,0],[1,2,0,0,0,0,5,0,4],[0,0,9,0,0,0,2,0,0],[5,0,7,0,0,0,0,6,8],[0,0,0,0,3,8,4,0,0],[6,0,0,9,0,0,0,2,0],[0,0,0,7,0,4,0,0,0]],
        [[0,0,0,5,0,8,1,0,0],[0,0,7,3,0,0,0,0,0],[8,0,0,0,7,6,0,0,0],[5,8,0,0,0,0,9,3,0],[1,0,0,0,0,0,0,0,4],[0,4,9,0,0,0,0,6,5],[0,0,0,4,9,0,0,0,7],[0,0,0,0,0,7,5,0,0],[0,0,3,6,0,2,0,0,0]],
        [[0,0,0,0,0,2,4,0,0],[0,0,5,6,0,7,0,0,0],[0,0,0,8,4,0,0,0,6],[0,2,3,0,0,0,0,6,7],[1,0,0,0,0,0,0,0,5],[7,8,0,0,0,0,3,1,0],[4,0,0,0,3,1,0,0,0],[0,0,0,9,0,8,2,0,0],[0,0,7,4,0,0,0,0,0]],
        [[4,0,0,0,0,0,3,0,0],[0,0,0,0,5,9,0,2,0],[2,0,0,0,7,0,0,0,4],[0,0,9,1,0,6,8,4,0],[0,0,0,0,0,0,0,0,0],[0,5,1,9,0,4,7,0,0],[6,0,0,0,4,0,0,0,3],[0,3,0,2,9,0,0,0,0],[0,0,4,0,0,0,0,0,8]],
        [[0,0,0,2,0,9,0,1,0],[0,4,0,5,0,0,0,0,0],[0,0,5,0,7,6,0,0,0],[9,0,4,0,0,0,0,7,6],[0,0,6,0,0,0,8,0,0],[1,7,0,0,0,0,4,0,3],[0,0,0,9,5,0,3,0,0],[0,0,0,0,0,1,0,5,0],[0,8,0,3,0,4,0,0,0]],
        [[0,0,7,4,0,0,0,0,0],[0,5,0,0,7,8,0,0,0],[0,0,0,9,0,5,2,0,0],[5,9,0,0,0,0,6,0,4],[0,2,0,0,0,0,0,1,0],[1,0,6,0,0,0,0,9,8],[0,0,4,8,0,3,0,0,0],[0,0,0,1,6,0,0,7,0],[0,0,0,0,0,7,9,0,0]],
        [[0,0,0,2,0,7,0,0,0],[0,0,0,0,3,6,0,0,7],[0,0,8,4,0,0,0,1,0],[2,0,5,0,0,0,6,8,0],[4,0,0,0,0,0,0,0,1],[0,1,9,0,0,0,7,0,5],[0,6,0,0,0,4,3,0,0],[1,0,0,6,2,0,0,0,0],[0,0,0,5,0,8,0,0,0]],
        [[0,0,0,1,4,0,6,0,0],[0,2,0,8,0,5,0,0,0],[0,0,0,0,0,6,0,7,0],[1,4,0,0,0,0,7,0,8],[0,0,9,0,0,0,1,0,0],[3,0,7,0,0,0,0,4,2],[0,6,0,2,0,0,0,0,0],[0,0,0,7,0,3,0,9,0],[0,0,3,0,6,8,0,0,0]],
        [[0,8,0,6,0,0,0,0,0],[0,0,6,0,1,7,0,0,0],[0,0,0,4,0,3,0,2,0],[3,0,8,0,0,0,0,1,7],[0,0,7,0,0,0,5,0,0],[2,1,0,0,0,0,8,0,9],[0,5,0,9,0,8,0,0,0],[0,0,0,3,6,0,9,0,0],[0,0,0,0,0,2,0,6,0]],
        [[9,0,0,2,3,0,0,0,0],[0,2,0,0,0,5,6,0,0],[0,0,0,1,0,7,0,0,0],[0,9,8,0,0,0,4,0,1],[5,0,0,0,0,0,0,0,9],[3,0,1,0,0,0,2,7,0],[0,0,0,3,0,4,0,0,0],[0,0,7,5,0,0,0,9,0],[0,0,0,0,6,2,0,0,4]],
        [[0,8,0,5,6,0,0,0,0],[0,0,0,8,0,1,0,0,0],[0,0,3,0,0,4,0,0,2],[5,0,2,0,0,0,0,1,9],[0,3,0,0,0,0,0,4,0],[8,9,0,0,0,0,3,0,7],[6,0,0,4,0,0,5,0,0],[0,0,0,2,0,9,0,0,0],[0,0,0,0,1,5,0,3,0]],
        [[4,2,0,1,0,0,3,0,0],[0,0,3,0,0,0,0,0,9],[0,0,0,6,3,0,0,0,0],[0,4,0,0,0,0,8,0,0],[0,0,2,8,5,9,4,0,0],[0,0,5,0,0,0,0,6,0],[0,0,0,0,1,3,0,0,0],[2,0,0,0,0,0,5,0,0],[0,0,1,0,0,8,0,2,6]],
        [[0,0,0,0,2,0,0,7,0],[0,0,0,0,0,1,0,3,0],[0,0,0,3,0,0,9,1,8],[0,0,8,0,0,5,6,0,0],[0,0,6,0,8,0,4,0,0],[0,0,9,4,0,0,1,0,0],[9,2,1,0,0,7,0,0,0],[0,5,0,2,0,0,0,0,0],[0,6,0,0,9,0,0,0,0]],
        [[0,0,0,0,0,7,1,0,0],[0,3,0,0,0,6,0,8,0],[0,9,4,0,0,0,6,0,0],[0,0,0,0,1,2,0,5,9],[0,0,0,0,3,0,0,0,0],[6,2,0,9,8,0,0,0,0],[0,0,8,0,0,0,5,2,0],[0,5,0,2,0,0,0,1,0],[0,0,7,3,0,0,0,0,0]],
        [[0,3,0,0,0,6,1,4,0],[0,0,9,0,0,0,5,0,0],[6,0,0,8,0,0,0,0,0],[0,2,0,0,7,0,0,0,0],[7,0,0,6,8,1,0,0,2],[0,0,0,0,4,0,0,1,0],[0,0,0,0,0,2,0,0,5],[0,0,3,0,0,0,2,0,0],[0,8,5,3,0,0,0,7,0]],
        [[3,0,0,0,1,9,0,0,6],[5,7,0,4,0,0,0,2,0],[0,0,0,0,0,0,0,0,0],[9,0,0,3,0,0,0,6,0],[0,3,0,1,0,8,0,4,0],[0,2,0,0,0,5,0,0,3],[0,0,0,0,0,0,0,0,0],[0,8,0,0,0,7,0,9,4],[4,0,0,5,8,0,0,0,7]],
        [[0,0,0,7,0,6,2,0,0],[7,0,0,0,0,0,0,3,5],[0,0,0,1,0,0,9,0,0],[0,0,1,6,0,0,0,0,4],[0,2,0,5,0,8,0,9,0],[8,0,0,0,0,2,5,0,0],[0,0,3,0,0,1,0,0,0],[9,4,0,0,0,0,0,0,7],[0,0,6,8,0,4,0,0,0]]
    ];

    const getPuzzle = level => level[Math.floor(Math.random() * level.length)];

    // const s = new Sudoku(getPuzzle(hard));

    const processList = puzzles => {
        let idx = 0;
        window.intv = window.setInterval(() => {
            let puzzlename = '';
            if (easy.includes(puzzles[idx])) puzzlename = `Easy ${easy.indexOf(puzzles[idx]) + 1}`;
            else if (medium.includes(puzzles[idx])) puzzlename = `Medium ${medium.indexOf(puzzles[idx]) + 1}`;
            else if (hard.includes(puzzles[idx])) puzzlename = `Hard ${hard.indexOf(puzzles[idx]) + 1}`;
            else if (extreme.includes(puzzles[idx])) puzzlename = `Extreme ${extreme.indexOf(puzzles[idx]) + 1}`;

            const s = new Sudoku(puzzles[idx], puzzlename);
            console.log(idx, s.findAllPossibilities());
            idx++;
            if (idx >= puzzles.length) window.clearInterval(window.intv);
        }, 500);
    }

    /* Process all puzzles */
    // processList(easy.concat(medium).concat(hard).concat(extreme));

    /* Solve difficult puzzle
    const s = new Sudoku(extreme[6], 'Extreme 6');
    s.solve();
    // console.log(s.findAllPossibilities());
    // console.log(s.fields.length, s.fieldsIndex);
    */

    /* Solve by button-press */
    const s = new Sudoku(extreme[6], 'Extreme 6');
    const btn = document.querySelector('#solve');
    btn.addEventListener('click', e => {
        e.preventDefault();
        s.solve();
    });
    /**/
});
