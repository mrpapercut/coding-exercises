class RollDice {
    constructor(wrapperElement) {
        this.wrapper = wrapperElement;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 100;
        this.canvas.height = 100;
        this.wrapper.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        this.dotRadius = 5;
        this.diceSize = 80;
    }

    drawDiceFace(face) {
        const dc = this.diceSize;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw dice
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.roundRect(10, 10, dc, dc, 10);
        this.ctx.fill();

        // Pick one of 4 gradients
        const gradient = [
            this.ctx.createLinearGradient(dc, dc, 10, 10),
            this.ctx.createLinearGradient(10, dc, dc, 10),
            this.ctx.createLinearGradient(10, 10, dc, dc),
            this.ctx.createLinearGradient(dc, 10, 10, dc)
        ][Math.floor(Math.random() * 4)];
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');

        // Draw gradient for shine effect
        this.ctx.fillStyle = gradient;
        this.ctx.roundRect(10, 10, dc, dc, 10);
        this.ctx.fill();

        const faceDots = this.getFaceDots(face);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        for (let i = 0; i < faceDots.length; i++) {
            const pos = faceDots[i];
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, this.dotRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    getFaceDots(face) {
        const dotPositions = [
            { x: 30, y: 30 },  // Top left
            { x: 50, y: 30 },  // Top center
            { x: 70, y: 30 },  // Top right
            { x: 30, y: 50 },  // Middle left
            { x: 50, y: 50 },  // Middle center
            { x: 70, y: 50 },  // Middle right
            { x: 30, y: 70 },  // Bottom left
            { x: 50, y: 70 },  // Bottom center
            { x: 70, y: 70 },  // Bottom right
        ];

        const faceDots = {
            1: [dotPositions[4]],
            2: [
                [dotPositions[0], dotPositions[8]],
                [dotPositions[2], dotPositions[6]]
            ][Math.round(Math.random())],
            3: [
                [dotPositions[0], dotPositions[4], dotPositions[8]],
                [dotPositions[2], dotPositions[4], dotPositions[6]]
            ][Math.round(Math.random())],
            4: [
                dotPositions[0], dotPositions[2],
                dotPositions[6], dotPositions[8]
            ],
            5: [
                dotPositions[0], dotPositions[2],
                dotPositions[4],
                dotPositions[6], dotPositions[8]
            ],
            6: [
                [
                    dotPositions[0], dotPositions[2],
                    dotPositions[3], dotPositions[5],
                    dotPositions[6], dotPositions[8]
                ], [
                    dotPositions[0], dotPositions[1], dotPositions[2],
                    dotPositions[6], dotPositions[7], dotPositions[8]
                ]
            ][Math.round(Math.random())]
        }[face]

        return faceDots;
    }

    async rollDice(forcedOutcome) {
        let i = 0;
        let done = false;
        let speed = 100;
        let face = 1;
        let prevface = 1;

        while (done === false) {
            face = Math.floor(Math.random() * 6) + 1;
            if (face === prevface) continue;
            prevface = face;
            this.drawDiceFace(face);

            if (i === 20) done = true;
            i++;
            if (i > 18) {
                speed += 40;
            } else if (i > 15) {
                speed += 30;
            } else if (i > 10) {
                speed += 20;
            }

            await new Promise(res => window.setTimeout(res, speed));
        }

        if (forcedOutcome) this.drawDiceFace(forcedOutcome);

        return forcedOutcome || face;
    }
}
