"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Sudoku_1 = require("./@types/Sudoku");
var SudokuPuzzle = /** @class */ (function (_super) {
    __extends(SudokuPuzzle, _super);
    function SudokuPuzzle(providedPuzzle, puzzleName) {
        var _this = _super.call(this, providedPuzzle, puzzleName) || this;
        _this.fields = [];
        _this.startTime = +new Date();
        _this.operations = [];
        _this.madeChoices = {};
        _this.rawPuzzle = providedPuzzle;
        _this.addField();
        _this.populateFieldFromRawPuzzle(providedPuzzle);
        return _this;
    }
    SudokuPuzzle.prototype.logOperation = function (message) {
        this.operations.push(message);
    };
    SudokuPuzzle.prototype.addField = function () {
        this.currentField = [];
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                this.currentField.push({
                    row: i,
                    col: j,
                    val: 0
                });
            }
        }
        this.fields.push(this.currentField);
        this.fieldsIndex = this.fields.length - 1;
    };
    SudokuPuzzle.prototype.revertField = function () {
        if (this.fieldsIndex === 0 || this.fields.length <= 1)
            return;
        this.fieldsIndex--;
        this.fields = this.fields.slice(0, this.fieldsIndex + 1);
        this.currentField = this.fields[this.fieldsIndex];
    };
    SudokuPuzzle.prototype.getEmptyCells = function () {
        return this.currentField.filter(function (fc) { return fc.val === 0; });
    };
    SudokuPuzzle.prototype.findRow = function (rowidx) {
        return this.currentField.filter(function (fc) { return fc.row === rowidx; });
    };
    SudokuPuzzle.prototype.findColumn = function (cellidx) {
        return this.currentField.filter(function (fc) { return fc.col === cellidx; });
    };
    SudokuPuzzle.prototype.findBox = function (rowidx, cellidx) {
        var fields = [];
        // Find the full rows
        if (rowidx < 3)
            fields = this.currentField.filter(function (fc) { return fc.row < 3; });
        else if (rowidx < 6)
            fields = this.currentField.filter(function (fc) { return fc.row >= 3 && fc.row < 6; });
        else
            fields = this.currentField.filter(function (fc) { return fc.row >= 6; });
        // Filter included columns from full rows
        if (cellidx < 3)
            fields = fields.filter(function (fc) { return fc.col < 3; });
        else if (cellidx < 6)
            fields = fields.filter(function (fc) { return fc.col >= 3 && fc.col < 6; });
        else
            fields = fields.filter(function (fc) { return fc.col >= 6; });
        return fields;
    };
    SudokuPuzzle.prototype.findNeighbours = function (rowidx, cellidx) {
        var rows = this.findRow(rowidx);
        var cols = this.findColumn(cellidx);
        var box = this.findBox(rowidx, cellidx);
        return {
            rows: rows,
            cols: cols,
            box: box
        };
    };
    SudokuPuzzle.prototype.populateFieldFromRawPuzzle = function (rawPuzzle) {
        var _this = this;
        if (Array.isArray(rawPuzzle) && rawPuzzle.length > 0
            && rawPuzzle.every(function (row) { return Array.isArray(row) && row.length === rawPuzzle.length; })) { // Check if provided puzzle is a square
            rawPuzzle.forEach(function (row, ridx) {
                row.forEach(function (cell, cidx) {
                    if (cell !== 0) {
                        _this.fields[_this.fieldsIndex].forEach(function (fc) {
                            if (fc.row === ridx && fc.col === cidx)
                                fc.val = cell;
                        });
                    }
                });
            });
        }
    };
    SudokuPuzzle.prototype.populateFieldFromPreviousField = function () {
        var _this = this;
        var prevField = this.fields[this.fieldsIndex - 1];
        prevField.forEach(function (pfc) {
            _this.currentField.forEach(function (fc) {
                if (fc.row === pfc.row && fc.col === pfc.col)
                    fc.val = pfc.val;
            });
        });
    };
    SudokuPuzzle.prototype.findPossibleNumbersInNeighbours = function (rowidx, cellidx) {
        var possibilities = [];
        var neighbours = this.findNeighbours(rowidx, cellidx);
        var _loop_1 = function (i) {
            if (!neighbours.rows.find(function (fc) { return fc.val === i; })
                && !neighbours.cols.find(function (fc) { return fc.val === i; })
                && !neighbours.box.find(function (fc) { return fc.val === i; })) {
                possibilities.push(i);
            }
        };
        for (var i = 1; i <= 9; i++) {
            _loop_1(i);
        }
        return possibilities;
    };
    SudokuPuzzle.prototype.findUniqueInArraysOfArrays = function (array) {
        var flmap = array.flatMap(function (n) { return n; });
        // Cache checked numbers
        var checked = [];
        var results = [];
        array.forEach(function (subarr, idx) {
            subarr.forEach(function (n1) {
                if (checked.includes(n1))
                    return;
                if (flmap.filter(function (n2) { return n2 === n1; }).length === 1) {
                    results.push({
                        value: n1,
                        idx: idx
                    });
                }
            });
        });
        return results;
    };
    SudokuPuzzle.prototype.findAllPossibilities = function () {
        this.findByNumber();
        this.findByLeastChoice();
        this.findByChoiceTrial();
        var ops = this.operations.length;
        var remaining = this.currentField.filter(function (fc) { return fc.val === 0; }).length;
        if (remaining === 0) {
            return {
                solved: true,
                time: +new Date() - this.startTime,
                ops: ops,
                remaining: remaining
            };
        }
        else {
            // Revert to previous field
            // If no previous field available, puzzle is unsolvable
            if (this.fieldsIndex !== 0) {
                this.revertField();
                return this.findAllPossibilities();
            }
            else {
                console.error('Unsolvable');
                return {
                    solved: false,
                    time: +new Date() - this.startTime,
                    ops: ops,
                    remaining: remaining
                };
            }
        }
    };
    /**
     * Checks every number for possible cells
     * Sometimes there are more possibilities for one cell, but one of those can only exist in that particular cell.
     * Check if a number occurs only once in all possibilities of either row, col, or box
     */
    SudokuPuzzle.prototype.findByNumber = function () {
        var _this = this;
        // Get all boxes by calling the center cells of each box
        for (var i = 1; i < 9; i += 3) {
            var _loop_2 = function (j) {
                var box = this_1.findBox(i, j).filter(function (fc) { return fc.val === 0; });
                var possibilities = box.map(function (fc) { return _this.findPossibleNumbersInNeighbours(fc.row, fc.col); });
                var uniqValues = this_1.findUniqueInArraysOfArrays(possibilities);
                if (uniqValues.length > 0)
                    uniqValues.forEach(function (_a) {
                        var value = _a.value, idx = _a.idx;
                        var foundCell = box[idx];
                        var fidx = _this.currentField.findIndex(function (fc) { return fc.row === foundCell.row && fc.col === foundCell.col; });
                        _this.currentField[fidx].val = value;
                        _this.logOperation("Changed ".concat(foundCell.row, ":").concat(foundCell.col, " to ").concat(foundCell.val, " using unique number search"));
                        return _this.findByNumber();
                    });
            };
            var this_1 = this;
            for (var j = 1; j < 9; j += 3) {
                _loop_2(j);
            }
        }
        // Do the same for all rows and columns
        for (var i = 0; i < 9; i++) {
            var row = this.findRow(i).filter(function (fc) { return fc.val === 0; });
            var col = this.findColumn(i).filter(function (fc) { return fc.val === 0; });
            [row, col].forEach(function (set) {
                var possibilities = set.map(function (fc) { return _this.findPossibleNumbersInNeighbours(fc.row, fc.col); });
                var uniqValues = _this.findUniqueInArraysOfArrays(possibilities);
                if (uniqValues.length > 0)
                    uniqValues.forEach(function (_a) {
                        var value = _a.value, idx = _a.idx;
                        var foundCell = set[idx];
                        var fidx = _this.currentField.findIndex(function (fc) { return fc.row === foundCell.row && fc.col === foundCell.col; });
                        _this.currentField[fidx].val = value;
                        _this.logOperation("Changed ".concat(foundCell.row, ":").concat(foundCell.col, " to ").concat(foundCell.val, " using unique number search"));
                        return _this.findByNumber();
                    });
            });
        }
    };
    SudokuPuzzle.prototype.findByLeastChoice = function () {
        var _this = this;
        this.currentField.forEach(function (fc) {
            if (fc.val === 0) {
                var possibilities = _this.findPossibleNumbersInNeighbours(fc.row, fc.col);
                // document.querySelector(`.cell${fc.row}${fc.col}`)?.setAttribute('data-poss', possibilities.join(' '));
                if (possibilities.length === 1) {
                    fc.val = possibilities[0];
                    _this.logOperation("Changed ".concat(fc.row, ":").concat(fc.col, " to ").concat(fc.val, " using possibility elimination"));
                    return _this.findAllPossibilities();
                }
            }
        });
    };
    SudokuPuzzle.prototype.findByChoiceTrial = function () {
        var _loop_3 = function (i) {
            var fc = this_2.currentField[i];
            if (fc.val === 0) {
                var possibilities = this_2.findPossibleNumbersInNeighbours(fc.row, fc.col);
                // document.querySelector(`.cell${fc.row}${fc.col}`)?.setAttribute('data-poss', possibilities.join(' '));
                if (possibilities.length === 2) {
                    this_2.addField();
                    this_2.populateFieldFromPreviousField();
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
                    var choice = void 0;
                    if (!Object.keys(this_2.madeChoices).includes("".concat(fc.row).concat(fc.col))) {
                        this_2.madeChoices["".concat(fc.row).concat(fc.col)] = 0;
                        choice = possibilities[0];
                    }
                    else {
                        this_2.madeChoices["".concat(fc.row).concat(fc.col)]++;
                        choice = possibilities[this_2.madeChoices["".concat(fc.row).concat(fc.col)]];
                    }
                    if (typeof choice === 'undefined') {
                        delete this_2.madeChoices["".concat(fc.row).concat(fc.col)];
                        this_2.revertField();
                        return { value: void 0 };
                    }
                    // Change value in new field
                    var newfield = this_2.currentField.find(function (nfc) { return nfc.row === fc.row && nfc.col === fc.col; });
                    if (newfield)
                        newfield.val = choice;
                    this_2.logOperation("Changed ".concat(fc.row, ":").concat(fc.col, " to ").concat(choice, " using choice trial"));
                    this_2.findAllPossibilities();
                    return { value: void 0 };
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < this.currentField.length; i++) {
            var state_1 = _loop_3(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    return SudokuPuzzle;
}(Sudoku_1.SudokuPuzzle));
exports.default = SudokuPuzzle;
