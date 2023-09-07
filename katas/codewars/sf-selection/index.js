class SF {
    constructor(fighters, initialPos, moves) {
        this.fighters = fighters;
        this.curPos = initialPos;
        this.moves = moves;
        this.moveIdx = 0;
    }

    getPosition(coor) {
        return this.fighters[coor[0]][coor[1]];
    }

    isBlankSpace(coor) {
        return this.getPosition(coor) === '';
    }

    movePosition(move) {
        let newPos = [this.curPos[0], this.curPos[1]];

        switch (move) {
            case 'up':
                if (this.curPos[0] === 0) break;
                newPos[0] = this.curPos[0] - 1;

                if (this.isBlankSpace(newPos)) {
                    newPos = this.curPos;
                }

                break;
            case 'down':
                if (this.curPos[0] === this.fighters.length - 1) break;
                newPos[0] = this.curPos[0] + 1;

                if (this.isBlankSpace(newPos)) {
                    newPos = [this.curPos[0], this.curPos[1]];
                }

                break;
            case 'left':
                if (this.curPos[1] === 0) {
                    newPos[1] = this.fighters[this.curPos[0]].length - 1;
                } else {
                    newPos[1] = this.curPos[1] - 1;
                }

                if (this.isBlankSpace(newPos)) {
                    this.curPos = [newPos[0], newPos[1]];
                    return this.movePosition(move);
                }

                break;
            case 'right':
                if (this.curPos[1] === this.fighters[this.curPos[0]].length - 1) {
                    newPos[1] = 0;
                } else {
                    newPos[1] = this.curPos[1] + 1
                }

                if (this.isBlankSpace(newPos)) {
                    this.curPos = [newPos[0], newPos[1]];
                    return this.movePosition(move);
                }

                break;
        }

        this.curPos = [newPos[0], newPos[1]]
        return this.getPosition(newPos);
    }

    processMoves() {
        const allMoves = [];
        console.log('initial', this.getPosition(this.curPos));
        for (let i in this.moves) {
            console.log(moves[i], this.movePosition(moves[i]));

        }

        return allMoves;
    }
}

const sf2fighters = [
    ["Ryu", "E.Honda", "Blanka",  "Guile",   "Balrog", "Vega"],
    ["Ken", "Chun Li", "Zangief", "Dhalsim", "Sagat",  "M.Bison"]
]

const ssf2fighters = [
    ['',       'Ryu',    'E.Honda',  'Blanka',  'Guile',   ''],
    ['Balrog', 'Ken',    'Chun Li',  'Zangief', 'Dhalsim', 'Sagat'],
    ['Vega',   'T.Hawk', 'Fei Long', 'Deejay',  'Cammy',   'M.Bison'],
]

shouldBe = ['Guile', 'Ryu', 'Ken', 'Balrog', 'Sagat', 'Sagat', 'Dhalsim', 'Zangief', 'Dhalsim'];

const initial_position = [0, 1];
const moves = ['left', 'right', 'down', 'left', 'left', 'up', 'left', 'left', 'right'];
// const moves = ['left', 'down']

const sf = new SF(ssf2fighters, initial_position, moves);
console.log(sf.processMoves());

