import Drawable from './Drawable';
import SolarSystem from './SolarSystem';

class SolarSystemBody extends Drawable {
    constructor(solarsystem: SolarSystem, properties = {
        mass: 10,
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        color: 'white',
        name: ''
    }) {
        super(solarsystem);

        this.name = properties.name;
        this.mass = properties.mass;

        this.initialVelocity = properties.velocity;
        this.velocity = properties.velocity;

        this.initialPosition = properties.position;
        this.setPosition(properties.position);

        this.setColor(properties.color);

        this.display_size = Math.max(
            Math.log(this.mass) / Math.log(this.display_log_base),
            this.min_display_size
        );

        this.distance_travelled = 0;

        solarsystem.addBody(this);
    }

    draw() {
        this.clear();
        this.dot(this.display_size);
    }

    move() {
        const origin = this.getPosition();
        const target = {
            x: origin.x + this.velocity.x,
            y: origin.y + this.velocity.y,
        };

        const distance = Math.sqrt((target.x - origin.x) ** 2 + (target.y - origin.y) ** 2);

        this.distance_travelled += distance;

        this.setPosition(target);
    }
}

export default SolarSystemBody;
