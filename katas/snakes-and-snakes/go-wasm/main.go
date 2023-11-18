package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"syscall/js"
	"time"
)

func LogAction(action string) {
	document := js.Global().Get("document")
	gamelog := document.Call("getElementById", "gamelog")

	gamelog.Set("value", gamelog.Get("value").String()+"\n"+js.ValueOf(action).String())
}

type Game struct {
	Players    Players
	Rounds     int
	GameIsOver bool
	Winner     Player
}

type Player struct {
	Id              int
	Name            string
	IsOnBoard       bool
	CurrentPosition int
	TotalSteps      int
	TotalSnakes     int
	TotalLadders    int
}

type Players = []Player

type SnakesAndSnakes struct {
	snakes  map[int]int
	ladders map[int]int
	Game    Game
}

func (s *SnakesAndSnakes) updateState() {
	jsonData, err := json.Marshal(s.Game)
	if err != nil {
		LogAction("Error creating JSON from Game")
		return
	}

	jsonString := string(jsonData)

	js.Global().Call("updateState", jsonString)
}

func (s *SnakesAndSnakes) SetSnakes(snakes map[int]int) {
	s.snakes = snakes
}

func (s *SnakesAndSnakes) SetLadders(ladders map[int]int) {
	s.ladders = ladders
}

func (s *SnakesAndSnakes) NewGame(this js.Value, args []js.Value) interface{} {
	playerNames := []string{
		"Sully",
		"Luke",
		"Laurie",
		"Dom",
		"Tempest",
		"Oli",
		"Holly",
		"Tilly",
		"Blair",
		"Dan",
		"Jon",
		"Rosie",
		"Pete",
		"Sat",
		"Mischa",
		"Jade",
		"GJ",
		"Koen",
		"Eli",
		"Charlotte",
	}

	LogAction(fmt.Sprintf("New game started for %d players!", len(playerNames)))

	s.Game = Game{}

	s.SetPlayers(playerNames)

	return js.Undefined()
}

func (s *SnakesAndSnakes) SetPlayers(playerNames []string) {
	for playerId, playerName := range playerNames {
		s.Game.Players = append(s.Game.Players, Player{
			Id:   playerId,
			Name: playerName,
		})
	}
}

func (s *SnakesAndSnakes) Roll() int {
	rand.New(rand.NewSource(time.Now().UnixNano()))

	randomInt := rand.Intn(6) + 1

	return randomInt
}

func (s *SnakesAndSnakes) PlayRound(this js.Value, args []js.Value) interface{} {
	s.Game.Rounds++

	if len(args) > 0 && args[0].Type() == js.TypeNumber {
		roll := int(args[0].Float())
		LogAction(fmt.Sprintf("Received %d from JS", roll))
	}

	LogAction(fmt.Sprintf("\nPlaying round %d", s.Game.Rounds))

	for _, player := range s.Game.Players {
		if s.Game.GameIsOver {
			return js.Undefined()
		}

		roll := s.Roll()
		s.handlePlayerTurn(player.Id, roll)
	}

	s.updateState()

	return js.Undefined()
}

func (s *SnakesAndSnakes) getPlayerById(player_id int) Player {
	for _, player := range s.Game.Players {
		if player.Id == player_id {
			return player
		}
	}

	return Player{}
}

func (s *SnakesAndSnakes) handlePlayerTurn(player_id int, roll int) {
	player := s.getPlayerById(player_id)

	turnMsg := fmt.Sprintf("%s's turn and they rolled a %d.", player.Name, roll)
	if roll == 1 {
		turnMsg = fmt.Sprintf("%s Tough.", turnMsg)
	} else if roll == 6 {
		turnMsg = fmt.Sprintf("%s Great!", turnMsg)
	}
	LogAction(turnMsg)

	if !player.IsOnBoard {
		s.handlePlayerNotOnBoard(player, roll)
		return
	}

	s.handlePlayerOnBoard(player, roll)
}

func (s *SnakesAndSnakes) handlePlayerNotOnBoard(player Player, roll int) {
	if roll == 6 {
		LogAction(fmt.Sprintf("%s is on board!", player.Name))

		s.Game.Players[player.Id].CurrentPosition = 1
		s.Game.Players[player.Id].IsOnBoard = true
	} else {
		LogAction(fmt.Sprintf("%s failed to get on board", player.Name))
	}
}

func (s *SnakesAndSnakes) handlePlayerOnBoard(player Player, roll int) {
	LogAction(fmt.Sprintf("%s was on %d, will move to %d", player.Name, player.CurrentPosition, player.CurrentPosition+roll))

	newPosition := player.CurrentPosition + roll
	s.Game.Players[player.Id].TotalSteps += roll

	if newPosition == 100 {
		s.handlePlayerWon(player)
		return
	}

	newPosition = s.checkPlayerOvershot(player, newPosition)

	s.movePlayer(player, newPosition)

	if !s.Game.GameIsOver && roll == 6 {
		LogAction(fmt.Sprintf("%s rolled a six and gets another turn!", player.Name))

		s.handlePlayerTurn(player.Id, s.Roll())
	}
}

func (s *SnakesAndSnakes) handlePlayerWon(player Player) {
	LogAction(fmt.Sprintf("%s has won!!!", player.Name))

	s.Game.Players[player.Id].CurrentPosition = 100
	s.Game.Winner = s.Game.Players[player.Id]
	s.Game.GameIsOver = true

	s.updateState()
}

func (s *SnakesAndSnakes) checkPlayerOvershot(player Player, position int) int {
	if position > 100 {
		LogAction(fmt.Sprintf("Oh no! %s overshot!", player.Name))

		position = 100 - (position - 100)
	}

	return position
}

func (s *SnakesAndSnakes) movePlayer(player Player, position int) {
	if val, found := s.snakes[position]; found {
		s.handleSnake(player, val)
	} else if val, found = s.ladders[position]; found {
		s.handleLadder(player, val)
	} else {
		s.moveToPosition(player, position)
	}
}

func (s *SnakesAndSnakes) handleSnake(player Player, position int) {
	LogAction(fmt.Sprintf("Oh no! %s landed on a snake and slides to %d", player.Name, position))

	s.Game.Players[player.Id].CurrentPosition = position
	s.Game.Players[player.Id].TotalSnakes++
}

func (s *SnakesAndSnakes) handleLadder(player Player, position int) {
	LogAction(fmt.Sprintf("Woo! %s landed on a ladder and climbs to %d!", player.Name, position))

	s.Game.Players[player.Id].CurrentPosition = position
	s.Game.Players[player.Id].TotalLadders++
}

func (s *SnakesAndSnakes) moveToPosition(player Player, position int) {
	LogAction(fmt.Sprintf("%s is now on %d", player.Name, position))

	s.Game.Players[player.Id].CurrentPosition = position
}

func init() {
	console := js.Global().Get("console")
	console.Call("log", "WebAssembly module loaded")
}

func main() {
	c := make(chan struct{})

	sas := &SnakesAndSnakes{}

	allSnakes := true

	if allSnakes {
		snakes := map[int]int{
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
		sas.SetSnakes(snakes)
	} else {
		snakes := map[int]int{
			17: 7,
			54: 34,
			62: 19,
			64: 60,
			87: 24,
			93: 73,
			95: 75,
			99: 78,
		}
		sas.SetSnakes(snakes)

		ladders := map[int]int{
			4:  14,
			9:  31,
			20: 38,
			28: 84,
			40: 59,
			51: 67,
			63: 81,
			71: 91,
		}
		sas.SetLadders(ladders)
	}

	js.Global().Set("newGame", js.FuncOf(sas.NewGame))
	js.Global().Set("playRound", js.FuncOf(sas.PlayRound))

	// for !sas.Game.GameIsOver {
	// 	sas.PlayRound()
	// }

	// LogAction(fmt.Sprintf("\n---\nTotal rounds: %d", sas.Game.Rounds))
	// LogAction(fmt.Sprintf("Winner: Player %d", sas.Game.winner+1))
	// for player_index, player := range sas.Game.Players {
	// 	LogAction(fmt.Sprintf("Player %d moved %d total spaces and hit %d snakes. Final position: %d",
	// 		player_index+1, player.TotalSteps, player.TotalSnakes, player.CurrentPosition))
	// }

	<-c
}
