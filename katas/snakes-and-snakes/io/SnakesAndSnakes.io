SnakesAndSnakes := Object clone do (
    version := "0.1"

    snakes := Map clone do (
        atPut("14", 4)
        atPut("17", 7)
        atPut("31", 9)
        atPut("38", 20)
        atPut("54", 34)
        atPut("59", 40)
        atPut("62", 19)
        atPut("64", 60)
        atPut("67", 51)
        atPut("81", 63)
        atPut("84", 28)
        atPut("87", 24)
        atPut("91", 71)
        atPut("93", 73)
        atPut("95", 75)
        atPut("99", 78)
    )

    players := List clone
    rounds := 0
    gameOver := false
    winner := nil

    logAction := method(action,
        action println
    )

    addPlayer := method(playerName,
        player := Object clone do(
            name := nil
            isOnBoard := false
            currentPosition := 0
            totalSteps := 0
            totalSnakes := 0
        )

        player name = playerName

        self players append(player)
    )

    roll := method(
        return Random bytes(1) at(0) %(6) + 1
    )

    runGame := method(
        if(self players size == 0, return)

        i := 0

        while(self gameOver == false,
            self playRound()
        )

        self logAction("\n--- Game is over! ---\n")
        self logAction("Total rounds: " .. self rounds)
        self logAction("Winner: " .. self players at(self winner) name .. "!!")
    )

    playRound := method(
        self rounds = self rounds + 1

        self logAction("\nPlaying round " .. self rounds)

        self players foreach(index, player,
            if(self gameOver == true, return)

            self handlePlayerTurn(index)
        )
    )

    handlePlayerTurn := method(playerIndex,
        player := self players at(playerIndex)
        dieRoll := self roll()

        if(dieRoll == 6,
            logAction(player name .. "'s turn and they rolled a 6! Great stuff"),
            if (dieRoll == 1,
                logAction(player name .. "'s turn and they rolled a 1! Tough"),
                logAction(player name .. "'s turn and they rolled a " .. dieRoll)
            )
        )

        if(player isOnBoard == false,
            self handlePlayerNotOnBoard(playerIndex, dieRoll),
            self handlePlayerOnBoard(playerIndex, dieRoll)
        )
    )

    handlePlayerNotOnBoard := method(playerIndex, dieRoll,
        player := self players at(playerIndex)

        if(dieRoll == 6,
            self logAction(player name .. " is on board!")

            player currentPosition = 1
            player isOnBoard = true
            ,
            self logAction(player name .. " failed to get on board")
        )
    )

    handlePlayerOnBoard := method(playerIndex, dieRoll,
        player := self players at(playerIndex)

        newPosition := player currentPosition + dieRoll

        self logAction(player name .. " was on " .. player currentPosition .. " and moves to " .. newPosition)

        player totalSteps = player totalSteps + dieRoll

        if(newPosition == 100,
            self handlePlayerWon(playerIndex)
        )

        newPosition = self checkPlayerOvershot(playerIndex, newPosition)

        self movePlayer(playerIndex, newPosition)

        if(self gameOver == false and dieRoll == 6,
            self logAction(player name .. " rolled a six and gets another turn!")
            self handlePlayerTurn(playerIndex)
        )
    )

    handlePlayerWon := method(playerIndex,
        player := self players at(playerIndex)

        logAction(player name .. " has won!!!")

        player currentPosition = 100
        self gameOver = true
        self winner = playerIndex
    )

    checkPlayerOvershot := method(playerIndex, position,
        player := self players at(playerIndex)

        if(position > 100,
            self logAction("Oh no! " .. player name .. " overshot!")

            position = 100 - (position - 100)
        )

        return position
    )

    movePlayer := method(playerIndex, position,
        if(self snakes at(position asString) != nil,
            self handleSnake(playerIndex, position),
            self moveToPosition(playerIndex, position)
        )
    )

    moveToPosition := method(playerIndex, position,
        player := self players at(playerIndex)

        self logAction(player name .. " is now on " .. position)

        player currentPosition = position
    )

    handleSnake := method(playerIndex, position,
        player := self players at(playerIndex)
        snakeTarget := self snakes at(position asString)

        self logAction("Oh no! " .. player name .. " landed on a snake and slides to " .. snakeTarget)

        player currentPosition = snakeTarget
        player totalSnakes = player totalSnakes + 1
    )
)

sas := SnakesAndSnakes clone

playerNames := list("sully", "laurie", "dom", "tilly", "holly", "jon")

playerNames foreach(idx, playerName,
    sas addPlayer(playerName)
)

sas runGame()
