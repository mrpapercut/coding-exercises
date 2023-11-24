package game

import (
	"fmt"
	"sort"
)

type Rummikub struct {
	tiles []Tile
}

func (r *Rummikub) PopulateTiles() {
	for color := 1; color <= 4; color++ {
		for value := 1; value <= 13; value++ {
			r.tiles = append(r.tiles, *r.CreateTile(value, TileColor(color), 0), *r.CreateTile(value, TileColor(color), 0))
		}
	}

	// Add 2 jokers with value 0
	r.tiles = append(r.tiles, *r.CreateTile(0, TileColor(Joker), 0), *r.CreateTile(0, TileColor(Joker), 0))
}

func (r *Rummikub) CreateTile(value int, color TileColor, owner int) *Tile {
	return &Tile{
		Value: value,
		Color: color,
		Owner: owner,
	}
}

func (r *Rummikub) SetTiles(tiles []Tile) {
	r.tiles = tiles
}

func (r *Rummikub) GetTiles() []Tile {
	return r.tiles
}

func (r *Rummikub) sortTilesByColor(tiles []Tile) []Tile {
	sort.Slice(tiles, func(a, b int) bool {
		return tiles[a].Color < tiles[b].Color
	})

	return tiles
}

func (r *Rummikub) sortTilesByNumber(tiles []Tile) []Tile {
	sort.Slice(tiles, func(a, b int) bool {
		return tiles[a].Value < tiles[b].Value
	})

	return tiles
}

func (r *Rummikub) splitTilesIntoNormalAndJokers(tiles []Tile) ([]Tile, []Tile) {
	var normalTiles []Tile
	var jokers []Tile

	for _, tile := range tiles {
		if tile.Color == Joker {
			jokers = append(jokers, tile)
		} else {
			normalTiles = append(normalTiles, tile)
		}
	}

	return normalTiles, jokers
}

func (r *Rummikub) IsSet(tiles []Tile) bool {
	numberOfTiles := len(tiles)

	if numberOfTiles < 3 || numberOfTiles > 13 {
		return false
	}

	fmt.Printf("IsGroup: %v\n", r.IsGroup(tiles))
	fmt.Printf("IsRun: %v\n", r.IsRun(tiles))

	return r.IsGroup(tiles) || r.IsRun(tiles)
}

func (r *Rummikub) IsGroup(tiles []Tile) bool {
	tiles = r.sortTilesByColor(tiles)

	firstTile := tiles[0]

	uniqueColors := make(map[TileColor]struct{})

	for _, tile := range tiles {
		if tile == firstTile {
			continue
		}

		if tile.Color == Joker {
			continue
		}

		if tile.Value != firstTile.Value {
			return false
		}

		if _, exists := uniqueColors[tile.Color]; exists {
			return false
		}

		uniqueColors[tile.Color] = struct{}{}
	}

	return true
}

func (r *Rummikub) IsRun(tiles []Tile) bool {
	tiles = r.sortTilesByNumber(tiles)

	normalTiles, jokers := r.splitTilesIntoNormalAndJokers(tiles)

	jokersUsed := 0

	firstTile := normalTiles[0]
	tileIndex := 0

	for i := firstTile.Value; i < firstTile.Value+len(normalTiles); i++ {
		if normalTiles[tileIndex].Value != i {
			if len(jokers) > 0 {
				jokersUsed++

				if jokersUsed > len(jokers) {
					return false
				}
			}

			return false
		}

		if normalTiles[tileIndex].Color != firstTile.Color {
			return false
		}

		tileIndex++
	}

	return true
}
