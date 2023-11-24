class Board {
    constructor(wrapperElement) {
        this.wrapper = wrapperElement;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.wrapper.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        this.tileWidth = this.canvas.width / 10;
        this.tileHeight = this.canvas.height / 10;

        this.tileColors = [
            '#907624',
            '#8e94a4',
            '#6f1c18',
            '#1a5e86',
            '#23652c'
        ];

        this.colorByTile = [
            0, 1, 2, 3, 4, 0, 1, 2, 3, 4,
            2, 1, 0, 4, 3, 2, 1, 0, 4, 3,
            1, 2, 3, 4, 0, 1, 2, 3, 4, 0,
            3, 2, 1, 0, 4, 3, 2, 1, 0, 4,
            2, 3, 4, 0, 1, 2, 3, 4, 0, 1,
            4, 3, 2, 1, 0, 4, 3, 2, 1, 0,
            3, 4, 0, 1, 2, 3, 4, 0, 1, 2,
            0, 4, 3, 2, 1, 0, 4, 3, 2, 1,
            4, 0, 1, 2, 3, 4, 0, 1, 2, 3,
            1, 0, 4, 3, 2, 1, 0, 4, 3, 2,
        ]
    }

    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Initial settings
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Background
        this.ctx.fillStyle = '#000';
        this.ctx.lineWidth = 1;

        this.ctx.beginPath();
        this.ctx.roundRect(0, 0, this.canvas.width, this.canvas.height, 10);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.strokeStyle = '#fff';
        for (let i = 1; i <= 100; i++) {
            const {x, y} = this.getTilePosition(i);
            this.drawTile(i, x, y);
            this.drawTileNumber(i, x, y);
        }

        const snakes = {
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

        for (const startPos in snakes) {
            this.drawSnake(this.getTilePosition(startPos), this.getTilePosition(snakes[startPos]));
        }

        // this.drawDangerousSnake(this.getTilePosition(14), this.getTilePosition(4));
        // this.drawDangerousSnake(this.getTilePosition(17), this.getTilePosition(7), true);
    }

    drawTile(tileNumber, x, y) {
        this.ctx.lineWidth = 1;

        this.ctx.beginPath();
        this.ctx.fillStyle = this.tileColors[this.colorByTile[tileNumber - 1]];
        this.ctx.rect(x, y, this.tileWidth, this.tileHeight);
        this.ctx.fill();
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
    }

    drawTileNumber(tileNumber, x, y) {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '10px sans-serif';
        this.ctx.fillText(tileNumber, x + 10, y + 10);
    }

    getTilePosition(tileNumber) {
        if (tileNumber < 1 || tileNumber > 100) {
          return { x: -1, y: -1 }; // Invalid tile number
        }

        // Calculate row and column based on the tile number
        const row = Math.floor((tileNumber - 1) / 10);
        const col = (tileNumber - 1) % 10;

        // Adjust column for zigzag pattern
        const adjustedCol = row % 2 === 0 ? col : 9 - col;

        // Calculate the position of the top-left corner
        const x = adjustedCol * this.tileWidth;
        const y = (9 - row) * this.tileHeight; // Adjust for top-left origin

        return { x, y };
    }

    drawPlayer(playerName, position, color = '#fff') {
        const {x, y} = this.getTilePosition(position);

        this.ctx.font = '30px sans-serif';

        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeText('♙', x + (this.tileWidth / 2), y + (this.tileHeight / 2));

        this.ctx.fillStyle = color;
        this.ctx.fillText('♙', x + (this.tileWidth / 2), y + (this.tileHeight / 2));

        this.ctx.font = '10px sans-serif';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(playerName, x + (this.tileWidth / 2), y + (this.tileHeight / 2) + 15)
    }

    drawSnake(fromCoor, toCoor) {
        const arrowWidth = 10;

        const pointA = {
            x: fromCoor.x + (this.tileWidth / 2),
            y: fromCoor.y + (this.tileWidth / 2),
        };

        const pointB = {
            x: toCoor.x + (this.tileWidth / 2),
            y: toCoor.y + (this.tileWidth / 2),
        };

        const angle = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x);

        this.ctx.strokeStyle = '#fff';

        this.ctx.beginPath();
        this.ctx.moveTo(pointA.x, pointA.y);
        this.ctx.lineTo(pointB.x, pointB.y);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(pointB.x, pointB.y);
        this.ctx.lineTo(
            pointB.x - arrowWidth * Math.cos(angle - Math.PI / 6),
            pointB.y - arrowWidth * Math.sin(angle - Math.PI / 6),
        );
        this.ctx.lineTo(
            pointB.x - arrowWidth * Math.cos(angle + Math.PI / 6),
            pointB.y - arrowWidth * Math.sin(angle + Math.PI / 6),
        );
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawDangerousSnake(fromCoor, toCoor, flip = false) {
        const pointA = {
            x: fromCoor.x + (this.tileWidth / 2),
            y: fromCoor.y + (this.tileWidth / 2),
        };

        const pointB = {
            x: toCoor.x + (this.tileWidth / 2),
            y: toCoor.y + (this.tileWidth / 2),
        };

        const width = Math.abs(pointB.x - pointA.x);
        const height = Math.abs(pointB.y - pointA.y);
        console.log({pointA, pointB});

        const image = new Image();
        image.onload = () => {
            this.ctx.save();
            // this.ctx.scale(1, 1);

            if (flip === true) {
                this.ctx.translate(pointA.x + 20, pointA.y - 20);

            } else {

                this.ctx.translate(pointA.x, pointA.y + 20);
            }

            this.ctx.rotate(Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x));
            this.ctx.drawImage(image, 0, 0, width, height);
            this.ctx.restore();
        }
        image.src = 'snake1.png';

    }
}
