package game

type TileColor int

const (
	Red TileColor = iota + 1
	Blue
	Yellow
	Black
	Joker
)

type Tile struct {
	Value int
	Color TileColor
	Owner int
}

type SetType int

const (
	Run SetType = iota + 1
	Group
)
