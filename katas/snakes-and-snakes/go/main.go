package main

import (
	"fmt"
	"math/rand"
	"time"
)

type Game struct {
	players    Players
	rounds     int
	GameIsOver bool
	winner     int
}

type Player struct {
	IsOnBoard       bool
	CurrentPosition int
	TotalSteps      int
	TotalSnakes     int
}

type Players = []Player

var game Game
var snakes map[int]int

func Roll() int {
	rand.Seed(time.Now().UnixNano())

	randomInt := rand.Intn(6) + 1

	return randomInt
}

func PlayRound() {
	game.rounds++

	// fmt.Printf("\n---\nPlaying round %d\n", game.rounds)

	for player_id, player := range game.players {
		// player_name := fmt.Sprintf("Player %d", player_id+1)

		// fmt.Printf("%s's turn\n", player_name)

		roll := Roll()
		// fmt.Printf("%s rolled a %d\n", player_name, roll)

		if player.IsOnBoard == false {
			if roll == 6 {
				// fmt.Printf("%s is on board!\n", player_name)
				game.players[player_id].CurrentPosition = 1
				game.players[player_id].IsOnBoard = true
			} else {
				// fmt.Printf("%s failed to get on board\n", player_name)
			}
		} else {
			// fmt.Printf("%s was on %d and will move to %d\n", player_name, player.CurrentPosition, player.CurrentPosition+roll)

			newPosition := player.CurrentPosition + roll
			game.players[player_id].TotalSteps += roll

			if newPosition == 100 {
				// fmt.Printf("%s has won!!!", player_name)
				game.players[player_id].CurrentPosition = newPosition
				game.winner = player_id
				game.GameIsOver = true
				return
			}

			if newPosition > 100 {
				newPosition = 100 - (newPosition - 100)
				// fmt.Printf("Oh no! %s overshot!\n", player_name)
			}

			if val, found := snakes[newPosition]; found {
				game.players[player_id].CurrentPosition = val
				game.players[player_id].TotalSnakes++
				// fmt.Printf("Oh no! %s landed on a snake and slides to %d\n", player_name, game.players[player_id].CurrentPosition)
			} else {
				game.players[player_id].CurrentPosition = newPosition
				// fmt.Printf("%s is now on %d\n", player_name, game.players[player_id].CurrentPosition)
			}
		}
	}
}

func main() {
	snakes = map[int]int{
		14: 4,
		17: 7,
		31: 9,
		38: 20,
		54: 34,
		59: 40,
		62: 19,
		64: 60,
		67: 51,
		81: 63,
		84: 28,
		87: 24,
		91: 71,
		93: 73,
		95: 75,
		99: 78,
	}

	game = Game{
		players: make(Players, 2),
	}

	for !game.GameIsOver {
		PlayRound()
	}

	fmt.Printf("\n---\nTotal rounds: %d\n", game.rounds)
	fmt.Printf("Winner: Player %d\n", game.winner+1)
	for player_index, player := range game.players {
		fmt.Printf("Player %d moved %d total spaces and hit %d snakes. Final position: %d\n", player_index+1, player.TotalSteps, player.TotalSnakes, player.CurrentPosition)
	}
}
