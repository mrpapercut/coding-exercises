package main

import (
	"fmt"
	game "rummikub/game"
)

func main() {
	r := game.Rummikub{}
	// r.PopulateTiles()
	// fmt.Print(len(r.GetTiles()))

	grouptileset := []game.Tile{
		{
			Value: 7,
			Color: game.Red,
			Owner: 0,
		},
		{
			Value: 7,
			Color: game.Blue,
			Owner: 0,
		},
		{
			Value: 7,
			Color: game.Yellow,
			Owner: 0,
		},
	}

	fmt.Println("Group set")
	r.IsSet(grouptileset)

	runtileset := []game.Tile{
		{
			Value: 3,
			Color: game.Red,
			Owner: 0,
		},
		{
			Value: 1,
			Color: game.Red,
			Owner: 0,
		},
		{
			Value: 2,
			Color: game.Red,
			Owner: 0,
		},
	}

	fmt.Println("Run set")
	r.IsSet(runtileset)
}
