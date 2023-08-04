package puzzle

import (
	"testing"
)

var easyPuzzle = RawPuzzle{
	[]int{0, 0, 2, 0, 7, 9, 0, 0, 0},
	[]int{4, 1, 3, 6, 5, 0, 9, 0, 7},
	[]int{0, 0, 0, 3, 0, 4, 5, 1, 2},
	[]int{8, 7, 0, 0, 0, 0, 0, 0, 0},
	[]int{0, 3, 0, 0, 0, 0, 0, 9, 0},
	[]int{0, 0, 0, 0, 0, 0, 0, 4, 5},
	[]int{2, 6, 9, 5, 0, 3, 0, 0, 0},
	[]int{3, 0, 7, 0, 9, 8, 6, 5, 1},
	[]int{0, 0, 0, 4, 6, 0, 2, 0, 0},
}

var expectedEmptyCellsEasy = []Cell{
	{0, 3, 0},
	{3, 3, 0},
	{3, 4, 0},
	{3, 6, 0},
	{3, 8, 0},
	{4, 3, 0},
	{4, 8, 0},
	{5, 3, 0},
	{7, 3, 0},
	{8, 7, 0},
}

var almostComplete = RawPuzzle{
	[]int{6, 8, 2, 9, 4, 1, 7, 5, 3},
	[]int{0, 7, 1, 6, 3, 8, 2, 4, 9},
	[]int{4, 9, 3, 7, 2, 5, 6, 1, 8},
	[]int{7, 5, 4, 3, 6, 2, 9, 8, 1},
	[]int{9, 3, 6, 8, 1, 7, 4, 2, 5},
	[]int{2, 1, 8, 4, 5, 9, 3, 7, 6},
	[]int{1, 4, 9, 5, 7, 3, 8, 6, 2},
	[]int{8, 6, 5, 2, 9, 4, 1, 3, 7},
	[]int{3, 2, 7, 1, 8, 6, 5, 9, 4},
}

var expectedEmptyCellsAlmostComplete = []Cell{}

var extremePuzzle = RawPuzzle{
	[]int{0, 0, 0, 5, 0, 6, 0, 0, 0},
	[]int{0, 8, 0, 0, 0, 9, 0, 0, 3},
	[]int{0, 0, 2, 8, 7, 0, 0, 0, 0},
	[]int{1, 2, 0, 0, 0, 0, 5, 0, 4},
	[]int{0, 0, 9, 0, 0, 0, 2, 0, 0},
	[]int{5, 0, 7, 0, 0, 0, 0, 6, 8},
	[]int{0, 0, 0, 0, 3, 8, 4, 0, 0},
	[]int{6, 0, 0, 9, 0, 0, 0, 2, 0},
	[]int{0, 0, 0, 7, 0, 4, 0, 0, 0},
}

var expectedEmptyCellsExtreme = []Cell{
	{0, 6, 0},
	{1, 6, 0},
	{2, 0, 0},
	{2, 6, 0},
	{3, 2, 0},
	{3, 3, 0},
	{3, 4, 0},
	{3, 5, 0},
	{4, 3, 0},
	{4, 7, 0},
	{5, 3, 0},
	{6, 0, 0},
	{6, 1, 0},
	{6, 3, 0},
	{6, 8, 0},
	{7, 4, 0},
	{7, 8, 0},
	{8, 6, 0},
}

func CreatePuzzle() Puzzle {
	return CreatePuzzleFromProvidedPuzzle(extremePuzzle)
}

func CreatePuzzleFromProvidedPuzzle(providedPuzzle RawPuzzle) Puzzle {
	puzzle := Puzzle{}
	puzzle.CreatePuzzle(providedPuzzle)

	return puzzle
}

func TestCoordinatesMatch(t *testing.T) {
	p := CreatePuzzle()

	should_be_true := p.CoordinatesMatch(2, 2, 5, 5)

	if !should_be_true {
		t.Error("CoordinatesMatch(2, 2, 5, 5) return false, expected true")
	}

	should_be_false := p.CoordinatesMatch(2, 3, 4, 5)

	if should_be_false {
		t.Error("CoordinatesMatch(2, 3, 4, 5) returned true, expected false")
	}
}

func TestGetCells(t *testing.T) {
	p := CreatePuzzle()

	cells := p.GetCells(func(cell Cell) bool {
		return cell.val == 9
	})

	if len(cells) != 3 {
		t.Errorf("GetCells() returned %d, expected %d", len(cells), 9)
	}

	for _, cell := range cells {
		if cell.val != 9 {
			t.Errorf("GetCells() returned cell with val %d, expected val 9", cell.val)
		}
	}
}

func TestGetEmptyCells(t *testing.T) {
	p := CreatePuzzle()

	empty_cells := p.GetEmptyCells()

	if len(empty_cells) != 55 {
		t.Errorf("GetEmptyCells() returned %d empty cells, expected %d empty cells", len(empty_cells), 55)
	}
}

func TestGetRow(t *testing.T) {
	p := CreatePuzzle()

	expected_row := []Cell{{0, 0, 0}, {0, 1, 0}, {0, 2, 0}, {0, 3, 5}, {0, 4, 0}, {0, 5, 6}, {0, 6, 0}, {0, 7, 0}, {0, 8, 0}}
	actual_row := p.GetRow(0)

	for index := range expected_row {
		if expected_row[index] != actual_row[index] {
			t.Errorf("GetRow(0) returned %v, expected %v", actual_row, expected_row)
			return
		}
	}
}

func TestGetColumn(t *testing.T) {
	p := CreatePuzzle()

	expected_column := []Cell{{0, 5, 6}, {1, 5, 9}, {2, 5, 0}, {3, 5, 0}, {4, 5, 0}, {5, 5, 0}, {6, 5, 8}, {7, 5, 0}, {8, 5, 4}}
	actual_column := p.GetColumn(5)

	for index := range expected_column {
		if expected_column[index] != actual_column[index] {
			t.Errorf("GetColumn(0) returned %v, expected %v", actual_column, expected_column)
			return
		}
	}
}

func TestGetBox(t *testing.T) {
	p := CreatePuzzle()

	expected_box := []Cell{{0, 0, 0}, {0, 1, 0}, {0, 2, 0}, {1, 0, 0}, {1, 1, 8}, {1, 2, 0}, {2, 0, 0}, {2, 1, 0}, {2, 2, 2}}
	actual_box := p.GetBox(1, 2)

	for index := range expected_box {
		if expected_box[index] != actual_box[index] {
			t.Errorf("GetBox(1, 2) returned %v, expected %v", actual_box, expected_box)
			return
		}
	}
}

func TestFindPossibleNumbersInNeighbours(t *testing.T) {
	p := CreatePuzzle()

	result := p.FindPossibleNumbersInNeighbours(0, 0)
	expected := []int{3, 4, 7, 9}

	for index := range expected {
		if expected[index] != result[index] {
			t.Errorf("FindPossibleNumbersInNeighbours() returned %v, expected %v", result, expected)
		}
	}
}

func TestUpdateCell(t *testing.T) {
	p := CreatePuzzleFromProvidedPuzzle(extremePuzzle)

	p.UpdateCell(Cell{row: 0, col: 0, val: 0}, 8)

	updatedCell := p.currentField[0]
	expectedValue := 8

	if updatedCell.val != expectedValue {
		t.Errorf("UpdateCell() returned %d, expected %d", updatedCell.val, expectedValue)
	}
}

func TestFindByNumber(t *testing.T) {
	puzzle := "extreme"
	// puzzle := "extreme"
	// puzzle := "almostcomplete"

	var rawPuzzle RawPuzzle
	var expectedEmptyCells []Cell
	switch puzzle {
	case "extreme":
		rawPuzzle = extremePuzzle
		expectedEmptyCells = expectedEmptyCellsExtreme
	case "almostcomplete":
		rawPuzzle = almostComplete
		expectedEmptyCells = expectedEmptyCellsAlmostComplete
	case "easy":
	default:
		rawPuzzle = easyPuzzle
		expectedEmptyCells = expectedEmptyCellsEasy
	}

	p := CreatePuzzleFromProvidedPuzzle(rawPuzzle)

	p.FindByNumber()

	remainingEmptyCells := p.GetEmptyCells()

	p.PrintOperations()
	p.PrintField(p.currentField)

	for idx, cell := range expectedEmptyCells {
		if len(remainingEmptyCells) == len(expectedEmptyCells) || remainingEmptyCells[idx].row != cell.row || remainingEmptyCells[idx].col != cell.col {
			t.Errorf("FindByNumber() \nreturned %v, \nexpected %v", remainingEmptyCells, expectedEmptyCells)
			return
		}
	}
}
