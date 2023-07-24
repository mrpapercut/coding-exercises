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
        // console.log(action);
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

        this.logAction(`Total rounds: ${this.game.rounds}`);
        this.logAction(`Winner: ${this.game.players[this.game.winner].name}!`)

        this.game.players.forEach(player => {
            this.logAction(`${player.name} moved ${player.totalSteps} total spaces and hit ${player.totalSnakes} snakes. Final position: ${player.currentPosition}`)
        });

        const totalSnakes = this.game.players.reduce((prev, curr) => {
            return prev + curr.totalSnakes;
        }, 0);
        console.log({ rounds: this.game.rounds, winner: this.game.winner, totalSnakes })
    }

    private roll(): number {
        return Math.ceil(Math.random() * 6);
    }

    private playRound(): void {
        this.game.rounds++;

        this.logAction(`\nPlaying round ${this.game.rounds}`);

        this.game.players.forEach((player, playerIndex) => {
            if (this.game.gameIsOver) return;

            this.logAction(`${player.name}'s turn`);

            const roll = this.roll();

            this.logAction(`${player.name} rolled a ${roll}`);

            this.handleMove(playerIndex, roll)
        })
    }

    private handleMove(playerIndex: number, roll: number): void {
        const player = this.game.players[playerIndex];

        if (player.isOnBoard === false) {
            if (roll === 6) {
                this.logAction(`${player.name} is on board!`);

                this.game.players[playerIndex].currentPosition = 1
                this.game.players[playerIndex].isOnBoard = true
            } else {
                this.logAction(`${player.name} failed to get on board`);
            }
        } else {
            this.logAction(`${player.name} was on ${player.currentPosition}, will move to ${player.currentPosition + roll}`)

            let newPosition = player.currentPosition + roll;
            this.game.players[playerIndex].totalSteps += roll

            if (newPosition === 100) {
                this.logAction(`${player.name} has won!!!`);

                this.game.players[playerIndex].currentPosition = newPosition
                this.game.gameIsOver = true;
                this.game.winner = playerIndex;

                return;
            }

            if (newPosition > 100) {
                this.logAction(`Oh no! ${player.name} overshot!`);

                newPosition = 100 - (newPosition - 100);
            }

            if (this.snakes[newPosition]) {
                this.logAction(`Oh no! ${player.name} landed on a snake and slides to ${this.snakes[newPosition]}`);

                this.game.players[playerIndex].currentPosition = this.snakes[newPosition];
                this.game.players[playerIndex].totalSnakes++
            } else {
                this.logAction(`${player.name} is now on ${newPosition}`);

                this.game.players[playerIndex].currentPosition = newPosition;
            }
        }
    }
}

export default SnakesAndSnakes;
