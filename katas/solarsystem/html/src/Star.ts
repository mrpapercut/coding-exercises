import SolarSystem from './SolarSystem';
import SolarSystemBody from './SolarSystemBody';

class Star extends SolarSystemBody {
    constructor(solarsystem: SolarSystem, properties = {
        mass: 10,
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        color: 'yellow',
        name: ''
    }) {
        super(solarsystem, properties);
    }

    move() {
        /*
        const origin = this.getPosition();
        const target = {
            x: origin.x + this.velocity.x,
            y: origin.y + this.velocity.y,
        };

        const distance = Math.sqrt((target.x - origin.x) ** 2 + (target.y - origin.y) ** 2);

        this.distance_travelled += distance;

        this.setPosition(target);
        */
    }
}

export default Star;
