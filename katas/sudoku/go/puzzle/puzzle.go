package puzzle

import (
	"fmt"
	"sort"
	utils "sudoku/utils"
)

type Cell struct {
	row int
	col int
	val int
}

type Field []Cell
type Fields []Field

type RawPuzzleRow []int
type RawPuzzle []RawPuzzleRow

type BoxCoordinates struct {
	top    int
	bottom int
	left   int
	right  int
}

type Neighbours struct {
	row []Cell
	col []Cell
	box []Cell
}

func log(message string) {
	fmt.Println(message)
}

type Puzzle struct {
	fields       Fields
	fieldIndex   int
	currentField Field
	operations   []string
}

func (p *Puzzle) LogOperation(message string) {
	p.operations = append(p.operations, fmt.Sprintf("%s\n", message))
}

func (p *Puzzle) PrintOperations() {
	for _, operation := range p.operations {
		log(operation)
	}
}

func (p *Puzzle) PrintField(field Field) {
	for idx, cell := range field {
		if idx > 0 && idx%9 == 0 {
			fmt.Println()
		}

		if cell.val == 0 {
			fmt.Print(". ")
		} else {
			fmt.Printf("%d ", cell.val)
		}
	}
}

func (p *Puzzle) CreatePuzzle(providedPuzzle RawPuzzle) {
	p.fields = make(Fields, 0)
	p.fieldIndex = 0

	p.AddField()

	p.PopulateFieldFromRawPuzzle(providedPuzzle)
}

func (p *Puzzle) AddField() {
	p.currentField = make(Field, 0)

	for i := 0; i < 9; i++ {
		for j := 0; j < 9; j++ {
			p.currentField = append(p.currentField, Cell{row: i, col: j, val: 0})
		}
	}

	p.fields = append(p.fields, p.currentField)
	p.fieldIndex = len(p.fields) - 1
}

func (p *Puzzle) RevertField() {
	if p.fieldIndex == 0 || len(p.fields) < 1 {
		return
	}

	p.fieldIndex--

	p.fields = p.fields[0:(p.fieldIndex + 1)]
	p.currentField = p.fields[p.fieldIndex]
}

func (p *Puzzle) CoordinatesMatch(x1, x2, y1, y2 int) bool {
	return x1 == x2 && y1 == y2
}

func (p *Puzzle) PopulateFieldFromRawPuzzle(rawPuzzle RawPuzzle) {
	for rawRowIndex, rawRow := range rawPuzzle {
		for rawColIndex, rawCell := range rawRow {
			if rawCell == 0 {
				continue
			}

			for fieldCellIndex, fieldCell := range p.fields[p.fieldIndex] {
				if p.CoordinatesMatch(fieldCell.row, rawRowIndex, fieldCell.col, rawColIndex) {
					p.fields[p.fieldIndex][fieldCellIndex].val = rawCell
				}
			}
		}
	}
}

func (p *Puzzle) PopulateFieldFromPreviousField() {
	previous_field := p.fields[p.fieldIndex-1]

	for previousFieldIndex, previousFieldCell := range previous_field {
		for currentFieldIndex, currentFieldCell := range p.currentField {
			if p.CoordinatesMatch(previousFieldCell.row, currentFieldCell.row, previousFieldCell.col, currentFieldCell.col) {
				p.currentField[currentFieldIndex].val = previous_field[previousFieldIndex].val
			}
		}
	}
}

func (p *Puzzle) GetCells(condition func(cell Cell) bool) []Cell {
	cells := make([]Cell, 0)

	for _, cell := range p.currentField {
		if condition(cell) {
			cells = append(cells, cell)
		}
	}

	return cells
}

func (p *Puzzle) GetEmptyCells() []Cell {
	emptyCells := p.GetCells(func(cell Cell) bool {
		return cell.val == 0
	})

	return emptyCells
}

func (p *Puzzle) GetEmptyCellsFromSlice(cells []Cell) []Cell {
	emptyCells := []Cell{}

	for _, cell := range cells {
		if cell.val == 0 {
			emptyCells = append(emptyCells, cell)
		}
	}

	return emptyCells
}

func (p *Puzzle) GetRow(rowIndex int) []Cell {
	row := p.GetCells(func(cell Cell) bool {
		return cell.row == rowIndex
	})

	return row
}

func (p *Puzzle) GetColumn(columnIndex int) []Cell {
	column := p.GetCells(func(cell Cell) bool {
		return cell.col == columnIndex
	})

	return column
}

func (p *Puzzle) GetBox(rowIndex, cellIndex int) []Cell {
	// Get coordinates of left-top corner of box
	boxTop := int((rowIndex-1)/3) * 3
	boxLeft := int((cellIndex-1)/3) * 3

	// Only get the corners of the box
	boxCorners := BoxCoordinates{
		top:    boxTop,
		bottom: boxTop + 2,
		left:   boxLeft,
		right:  boxLeft + 2,
	}

	// Get cells within coordinates
	box := p.GetCells(func(cell Cell) bool {
		if cell.row < boxCorners.top || cell.row > boxCorners.bottom {
			return false
		}

		if cell.col < boxCorners.left || cell.col > boxCorners.right {
			return false
		}

		return true
	})

	return box
}

func (p *Puzzle) GetNeighbours(rowIndex, cellIndex int) Neighbours {
	neighbours := Neighbours{
		row: p.GetRow(rowIndex),
		col: p.GetColumn(cellIndex),
		box: p.GetBox(rowIndex, cellIndex),
	}

	return neighbours
}

// Find the numbers that don't occur in any of the neighbours of a cell
func (p *Puzzle) FindPossibleNumbersInNeighbours(rowIndex, cellIndex int) []int {
	neighbours := p.GetNeighbours(rowIndex, cellIndex)

	rowValues := []int{}
	for _, cell := range neighbours.row {
		rowValues = append(rowValues, cell.val)
	}
	sort.Ints(rowValues)

	colValues := []int{}
	for _, cell := range neighbours.col {
		colValues = append(colValues, cell.val)
	}
	sort.Ints(colValues)

	boxValues := []int{}
	for _, cell := range neighbours.box {
		boxValues = append(boxValues, cell.val)
	}
	sort.Ints(boxValues)

	nonOccuringNumbers := [][]int{
		utils.FindNonOccuringNumbersInSlice(rowValues),
		utils.FindNonOccuringNumbersInSlice(colValues),
		utils.FindNonOccuringNumbersInSlice(boxValues),
	}

	possibilities := utils.FindNumbersThatOccurNTimes(len(nonOccuringNumbers), nonOccuringNumbers)

	return possibilities
}

func (p *Puzzle) FindByNumber() {
	// First look at all possibilities within each box
	for i := 1; i < 9; i += 3 {
		for j := 1; j < 9; j += 3 {
			box := p.GetBox(i, j)
			slice := p.GetEmptyCellsFromSlice(box)

			p.FindByNumberInSlice(slice)
		}
	}

	p.LogOperation("Found no more available numbers in box, switching to row/column search")

	// Then check all possibilities in each row and each column
	for i := 1; i < 9; i++ {
		row := p.GetRow(i)
		emptyRowCells := p.GetEmptyCellsFromSlice(row)

		p.FindByNumberInSlice(emptyRowCells)

		column := p.GetColumn(i)
		emptyColumnCells := p.GetEmptyCellsFromSlice(column)

		p.FindByNumberInSlice(emptyColumnCells)
	}

	p.LogOperation("Found no more available numbers in row/col")
}

func (p *Puzzle) UpdateCell(cell Cell, newValue int) {
	for fieldIndex, fieldCell := range p.currentField {
		if fieldCell.val == 0 && fieldCell.row == cell.row && fieldCell.col == cell.col {
			p.currentField[fieldIndex].val = newValue

			p.LogOperation(fmt.Sprintf("Changed %d:%d from %d to %d using unique number search", cell.row, cell.col, fieldCell.val, newValue))
			break
		}
	}
}

func (p *Puzzle) FindByNumberInSlice(slice []Cell) {
	allPossibilities := [][]int{}

	for _, cell := range slice {
		allPossibilities = append(allPossibilities, p.FindPossibleNumbersInNeighbours(cell.row, cell.col))
	}

	uniquePossibilities := utils.FindUniqueNumbers(allPossibilities)

	if len(uniquePossibilities) > 0 {
		for _, unique := range uniquePossibilities {
			uniqueNumber := unique[0]
			arrayIndex := unique[1]
			foundCell := slice[arrayIndex]

			p.UpdateCell(foundCell, uniqueNumber)

			p.FindByNumber()
			return
		}
	}
}
