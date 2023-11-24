package game

import (
	"testing"
)

var validGroup = []Tile{
	{
		Value: 7,
		Color: Red,
	},
	{
		Value: 7,
		Color: Blue,
	},
	{
		Value: 7,
		Color: Yellow,
	},
}

var validGroupWithJoker = []Tile{
	{
		Value: 0,
		Color: Joker,
	},
	{
		Value: 7,
		Color: Blue,
	},
	{
		Value: 7,
		Color: Yellow,
	},
}

var invalidGroupNumbers = []Tile{
	{
		Value: 7,
		Color: Red,
	},
	{
		Value: 8,
		Color: Blue,
	},
	{
		Value: 7,
		Color: Yellow,
	},
}

var invalidGroupColors = []Tile{
	{
		Value: 7,
		Color: Red,
	},
	{
		Value: 7,
		Color: Yellow,
	},
	{
		Value: 7,
		Color: Yellow,
	},
}

var invalidGroupWithJoker = []Tile{
	{
		Value: 0,
		Color: Joker,
	},
	{
		Value: 7,
		Color: Blue,
	},
	{
		Value: 8,
		Color: Yellow,
	},
}

var validRun = []Tile{
	{
		Value: 5,
		Color: Red,
	},
	{
		Value: 4,
		Color: Red,
	},
	{
		Value: 6,
		Color: Red,
	},
}

var validRunWithJoker = []Tile{
	{
		Value: 0,
		Color: Joker,
	},
	{
		Value: 4,
		Color: Red,
	},
	{
		Value: 6,
		Color: Red,
	},
}

var invalidRunColors = []Tile{
	{
		Value: 5,
		Color: Red,
	},
	{
		Value: 4,
		Color: Red,
	},
	{
		Value: 6,
		Color: Yellow,
	},
}

var invalidRunNumbers = []Tile{
	{
		Value: 5,
		Color: Red,
	},
	{
		Value: 4,
		Color: Red,
	},
	{
		Value: 7,
		Color: Red,
	},
}

var invalidRunWithJoker = []Tile{
	{
		Value: 5,
		Color: Red,
	},
	{
		Value: 0,
		Color: Joker,
	},
	{
		Value: 8,
		Color: Red,
	},
}

func CreateGame() *Rummikub {
	return &Rummikub{}
}

func TestValidGroup(t *testing.T) {
	r := CreateGame()

	should_be_true := r.IsGroup(validGroup)

	if !should_be_true {
		t.Error("IsGroup(validGroup) returned false, expected true")
	}
}

func TestValidGroupWithJoker(t *testing.T) {
	r := CreateGame()

	should_be_true := r.IsGroup(validGroupWithJoker)

	if !should_be_true {
		t.Error("IsGroup(validGroupWithJoker) returned false, expected true")
	}
}

func TestInvalidGroupNumbers(t *testing.T) {
	r := CreateGame()

	should_be_false := r.IsGroup(invalidGroupNumbers)

	if should_be_false {
		t.Error("IsGroup(invalidGroupNumbers) returned true, expected false")
	}
}

func TestInvalidGroupColors(t *testing.T) {
	r := CreateGame()

	should_be_false := r.IsGroup(invalidGroupColors)

	if should_be_false {
		t.Error("IsGroup(invalidGroupColors) returned true, expected false")
	}
}

func TestInvalidGroupWithJoker(t *testing.T) {
	r := CreateGame()

	should_be_false := r.IsGroup(invalidGroupWithJoker)

	if should_be_false {
		t.Error("IsGroup(invalidGroupWithJoker) returned true, expected false")
	}
}

func TestValidRun(t *testing.T) {
	r := CreateGame()

	should_be_true := r.IsRun(validRun)

	if !should_be_true {
		t.Error("IsRun(validRun) returned false, expected true")
	}
}

func TestValidRunWithJoker(t *testing.T) {
	r := CreateGame()

	should_be_true := r.IsRun(validRunWithJoker)

	if !should_be_true {
		t.Error("IsRun(validRunWithJoker) returned false, expected true")
	}
}

func TestInvalidRunNumbers(t *testing.T) {
	r := CreateGame()

	should_be_false := r.IsRun(invalidRunNumbers)

	if should_be_false {
		t.Error("IsRun(invalidRunNumbers) returned true, expected false")
	}
}

func TestInvalidRunColors(t *testing.T) {
	r := CreateGame()

	should_be_false := r.IsRun(invalidRunColors)

	if should_be_false {
		t.Error("IsRun(invalidRunColors) returned true, expected false")
	}
}

func TestInvalidRunWithJoker(t *testing.T) {
	r := CreateGame()

	should_be_false := r.IsRun(invalidRunWithJoker)

	if should_be_false {
		t.Error("IsRun(invalidRunWithJoker) returned true, expected false")
	}
}
