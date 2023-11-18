import SolarSystem from './SolarSystem';
import SolarSystemBody from './SolarSystemBody';

class Planet extends SolarSystemBody {
    constructor(solarsystem: SolarSystem, properties = {
        mass: 10,
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        color: 'white',
        name: ''
    }) {
        super(solarsystem, properties);
    }
}

export default Planet;
