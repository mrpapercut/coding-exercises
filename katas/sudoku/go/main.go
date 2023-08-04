package main

import (
	// "fmt"

	puzzle "sudoku/puzzle"
)

func main() {
	// line := sudoku.Field("world!")

	rawPuzzle := puzzle.RawPuzzle{
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

	p := puzzle.Puzzle{}
	p.CreatePuzzle(rawPuzzle)

	// fmt.Println(line)
}
