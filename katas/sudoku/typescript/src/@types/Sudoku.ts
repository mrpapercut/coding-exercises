export type RawPuzzle = RawPuzzleRow[];
declare type RawPuzzleRow = number[];

export type Fields = Field[]
export type Field = Cell[]
export type Cell = {
    row: number,
    col: number,
    val: number
}

export abstract class SudokuPuzzle {
    abstract fields: Fields
    abstract currentField: Field
    abstract fieldsIndex: number

    abstract startTime: number
    abstract rawPuzzle: RawPuzzle

    abstract operations: string[]
    abstract madeChoices: Record<string, any>

    constructor(providedPuzzle: RawPuzzle, puzzleName: string) {}

    abstract logOperation(message: string): void

    abstract addField(): void
    abstract revertField(): void
    abstract getEmptyCells(): Cell[]
    abstract findRow(rowidx: number): Cell[]
    abstract findColumn(colidx: number): Cell[]
    abstract findBox(rowidx: number, cellidx: number): Cell[]
    abstract findNeighbours(rowidx: number, cellidx: number): { rows: Cell[], cols: Cell[], box: Cell[] }

    abstract populateFieldFromRawPuzzle(providedPuzzle: RawPuzzle): void
    abstract populateFieldFromPreviousField(): void

    abstract findPossibleNumbersInNeighbours(rowidx: number, cellidx: number): number[]
    abstract findUniqueInArraysOfArrays(array: number[][]): {value: number, idx: number}[]

    abstract findAllPossibilities(): { solved: boolean, time: number, ops: number, remaining: number}
    abstract findByNumber(): void
    abstract findByLeastChoice(): void
    abstract findByChoiceTrial(): void
}
