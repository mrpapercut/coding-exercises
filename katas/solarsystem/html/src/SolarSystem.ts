import Planet from './Planet';
import SolarSystemBody from './SolarSystemBody';
import Star from './Star';

export enum RunMode {
    Browser = 'browser',
    Console = 'console',
}

class SolarSystem {
    public isRunning = true;

    public runMode: RunMode = RunMode.Browser;

    public maxDistance = 10000;
    public maxIterations = 10000;

    public causeOfFailure = '';
    public possibleCauses = {
        COLLISION: 'collision',
        DISTANCE_EXCEEDED: 'exceeded distance',
        NEGLIBLE_FORCE: 'not in orbit',
        MAX_ITERATIONS_EXCEEDED: 'max iterations exceeded',
        PLANETS_IN_SAME_POSITION: 'planets spawned in same position',
    }

    private canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    private width: number;
    private height: number;

    public bodies: Set<SolarSystemBody>

    constructor(runMode: RunMode, canvas?: HTMLCanvasElement) {
        this.runMode = runMode;

        if (runMode === RunMode.Browser) {
            this.canvas = canvas;
            this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');

            this.width = this.canvas.width;
            this.height = this.canvas.height;

            this.context.translate(this.width / 2, this.height / 2);
        }

        this.bodies = new Set();
    }

    log(...messages) {
        if (this.runMode === RunMode.Browser) {
            console.log(...messages);
        }
    }

    reset() {
        this.bodies = new Set();
        this.causeOfFailure = '';
    }

    resetCanvas() {
        const origFillStyle = this.context.fillStyle;
        this.context.fillStyle = '#000';
        this.context.rect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        this.context.fill();
        this.context.fillStyle = origFillStyle;
    }

    addBody(body: SolarSystemBody) {
        this.bodies.add(body);
    }

    removeBody(body: SolarSystemBody) {
        this.bodies.delete(body);
    }

    updateAll() {
        if (this.runMode === RunMode.Browser) {
            this.resetCanvas();

            this.bodies.forEach(body => {
                body.move();
                body.draw();
            });
        } else {
            this.bodies.forEach(body => {
                body.move();
            });
        }
    }

    accelerateDueToGravity(first: SolarSystemBody, second: SolarSystemBody) {
        const force = first.mass * second.mass / first.distance(second) ** 2;
        const angle = first.towards(second);

        if (force > 0 && force < 0.00001) {
            this.isRunning = false;
            this.causeOfFailure = this.possibleCauses.NEGLIBLE_FORCE;

            this.log(`Body "${first.name}" was ejected!`);
        }

        let reverse = 1;

        const bodies = [first, second];

        bodies.forEach(body => {
            const acceleration = force / body.mass;
            const acc_x = acceleration * Math.cos(angle);
            const acc_y = acceleration * Math.sin(angle);

            body.velocity = {
                x: body.velocity.x + (reverse * acc_x),
                y: body.velocity.y + (reverse * acc_y)
            };

            reverse = -1;
        });
    }

    checkCollision(first: SolarSystemBody, second: SolarSystemBody) {
        if (first instanceof Planet && second instanceof Planet) {
            if (first.name === second.name) return;

            if (first.initialPosition.x === second.initialPosition.x && first.initialPosition.y === second.initialPosition.y) {
                this.isRunning = false;
                this.causeOfFailure = this.possibleCauses.PLANETS_IN_SAME_POSITION;
            }

            return
        }

        if (first.distance(second) < first.display_size/2 + second.display_size/2) {
            [first, second].forEach(body => {
                if (body instanceof Planet) {
                    this.isRunning = false;
                    this.causeOfFailure = this.possibleCauses.COLLISION;
                    this.log(`Body "${first.name}" has collided with "${second.name}"!`);
                    // this.removeBody(body);
                }
            });
        }
    }

    checkEjection(body: SolarSystemBody) {
        const starBody = Array.from(this.bodies).find(body => body instanceof Star);

        if (starBody && body.distance(starBody) > this.maxDistance) {
            this.isRunning = false;
            this.causeOfFailure = this.possibleCauses.DISTANCE_EXCEEDED;
            this.log(`Body "${body.name}" exceeded distance max of ${this.maxDistance}!`);
        }
    }

    calculateAllBodyInteractions() {
        let bodiesArray = Array.from(this.bodies);

        for (let i = 0; i < bodiesArray.length; i++) {
            for (let j = i + 1; j < bodiesArray.length; j++) {
                this.accelerateDueToGravity(bodiesArray[i], bodiesArray[j]);
                this.checkCollision(bodiesArray[i], bodiesArray[j]);
            }
            this.checkEjection(bodiesArray[i]);
        }
    }
}

export default SolarSystem;
