import SolarSystem from './SolarSystem';
import SolarSystemBody from './SolarSystemBody';

export type XY = {
    x: number,
    y: number
}

class Drawable {
    public min_display_size: number = 10;
    public display_log_base: number = 1.1;

    protected x: number = 0;
    protected y: number = 0;

    protected color: string = '#fff';

    public display_size: number = 0;
    public distance_travelled: number = 0;

    public minDistanceToStar: number = Number.MAX_SAFE_INTEGER;
    public maxDistanceToStar: number = 0;

    public solarsystem: SolarSystem;

    public name: string = '';
    public mass: number = 0;
    public initialPosition: XY = {x: 0, y: 0};
    public position: XY = {x: 0, y: 0};
    public initialVelocity: XY = {x: 0, y: 0};
    public velocity: XY = {x: 0, y: 0};

    constructor(solarsystem: SolarSystem) {
        this.solarsystem = solarsystem;
    }

    getPosition(): XY {
        return {
            x: this.x,
            y: this.y
        };
    }

    setPosition(coordinates: XY) {
        this.x = coordinates.x;
        this.y = coordinates.y;
    }

    setColor(color: string = '#fff') {
        this.color = color;
    }

    clear() {}

    dot(size: number) {
        const origStrokeStyle = this.solarsystem.context.strokeStyle;
        const origFillStyle = this.solarsystem.context.fillStyle;

        this.solarsystem.context.strokeStyle = this.color;
        this.solarsystem.context.fillStyle = this.color;

        this.solarsystem.context.beginPath();
        this.solarsystem.context.arc(this.x, this.y, size / 2, 0, 2 * Math.PI);
        this.solarsystem.context.fill();
        this.solarsystem.context.stroke();
        this.solarsystem.context.closePath();

        this.solarsystem.context.font = '12px Arial';
        this.solarsystem.context.fillStyle = '#fff';
        this.solarsystem.context.fillText(this.name, this.x + 15, this.y + 5);

        this.solarsystem.context.strokeStyle = origStrokeStyle;
        this.solarsystem.context.fillStyle = origFillStyle;
    }

    distance(otherBody: SolarSystemBody): number {
        return Math.sqrt(
            (otherBody.x - this.x) ** 2 +
            (otherBody.y - this.y) ** 2
        );
    }

    towards(otherBody: SolarSystemBody): number {
        // in radians
        return Math.atan2(otherBody.y - this.y, otherBody.x - this.x);
    }
}

export default Drawable;
