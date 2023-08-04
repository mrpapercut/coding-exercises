package types

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
