interface Game {
    players: Players,
    rounds: number,
    gameIsOver: boolean,
    winner: number,
}

interface Player {
    isOnBoard: boolean,
    currentPosition: number,
    totalSteps: number,
    totalSnakes: number,
    name: string,
}

type Players = Player[]

class SnakesAndSnakes {
    game: Game
    snakes: Record<number, number>

    constructor() {
        this.snakes = {
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

        this.game = {
            players: [],
            rounds: 0,
            gameIsOver: false,
            winner: null
        }

        this.setPlayers(2)

        this.runGame()
    }

    private logAction(action: string) {
        console.log(action);
    }

    private setPlayers(amount: number): void {
        for (let i = 0; i < amount; i++) {
            this.game.players.push({
                isOnBoard: false,
                currentPosition: 0,
                totalSteps: 0,
                totalSnakes: 0,
                name: `Player ${i + 1}`
            });
        }
    }

    private runGame(): void {
        if (this.game.players.length === 0) {
            console.error('No players for game')
        }

        while (!this.game.gameIsOver) {
            this.playRound();
        }

        this.logAction(`\n--- Game is over! ---\n`)
        this.logAction(`Total rounds: ${this.game.rounds}`);
        this.logAction(`Winner: ${this.game.players[this.game.winner].name}!`)

        this.game.players.forEach(player => {
            this.logAction(`${player.name} moved ${player.totalSteps} total spaces and hit ${player.totalSnakes} snakes. Final position: ${player.currentPosition}`)
        });
    }

    private roll(): number {
        return Math.ceil(Math.random() * 6);
    }

    private playRound(): void {
        this.game.rounds++;

        this.logAction(`\nPlaying round ${this.game.rounds}`);

        this.game.players.forEach((player, playerIndex) => {
            if (this.game.gameIsOver) return;

            this.handlePlayerTurn(playerIndex)
        })
    }

    private handlePlayerTurn(playerIndex: number): void {
        const player = this.game.players[playerIndex];
        const roll = this.roll();

        this.logAction(`${player.name}'s turn and they rolled a ${roll}.${roll === 1 ? ' Tough.' : roll === 6 ? ' Great!' : ''}`);

        if (player.isOnBoard === false) {
            this.handlePlayerNotOnBoard(playerIndex, roll);
            return;
        }

        this.handlePlayerOnBoard(playerIndex, roll);
    }

    private handlePlayerNotOnBoard(playerIndex: number, roll: number): void {
        const player = this.game.players[playerIndex];

        if (roll === 6) {
            this.logAction(`${player.name} is on board!`);

            this.game.players[playerIndex].currentPosition = 1
            this.game.players[playerIndex].isOnBoard = true
        } else {
            this.logAction(`${player.name} failed to get on board`);
        }
    }

    private handlePlayerOnBoard(playerIndex: number, roll: number): void {
        const player = this.game.players[playerIndex];

        this.logAction(`${player.name} was on ${player.currentPosition}, will move to ${player.currentPosition + roll}`)

        let newPosition = player.currentPosition + roll;
        this.game.players[playerIndex].totalSteps += roll;

        if (newPosition === 100) {
            this.handlePlayerWon(playerIndex);
        }

        newPosition = this.checkPlayerOvershot(playerIndex, newPosition);

        this.movePlayer(playerIndex, newPosition);

        if (this.game.gameIsOver === false && roll === 6) {
            this.logAction(`${player.name} rolled a six and gets another turn!`);

            this.handlePlayerTurn(playerIndex);
        }
    }

    private handlePlayerWon(playerIndex: number): void {
        this.logAction(`${this.game.players[playerIndex].name} has won!!!`);

        this.game.players[playerIndex].currentPosition = 100;
        this.game.gameIsOver = true;
        this.game.winner = playerIndex;

        return;
    }

    private checkPlayerOvershot(playerIndex: number, position: number): number {
        if (position > 100) {
            this.logAction(`Oh no! ${this.game.players[playerIndex].name} overshot!`);

            position = 100 - (position - 100);
        }

        return position;
    }

    private movePlayer(playerIndex: number, newPosition: number): void {
        if (this.snakes[newPosition]) {
            this.handleSnake(playerIndex, newPosition);
        } else {
            this.moveToPosition(playerIndex, newPosition);
        }
    }

    private moveToPosition(playerIndex: number, newPosition: number): void {
        const player = this.game.players[playerIndex];

        this.logAction(`${player.name} is now on ${newPosition}`);

        this.game.players[playerIndex].currentPosition = newPosition;
    }

    private handleSnake(playerIndex: number, newPosition: number): void {
        const player = this.game.players[playerIndex];

        this.logAction(`Oh no! ${player.name} landed on a snake and slides to ${this.snakes[newPosition]}`);

        this.game.players[playerIndex].currentPosition = this.snakes[newPosition];
        this.game.players[playerIndex].totalSnakes++;
    }
}

export default SnakesAndSnakes;
