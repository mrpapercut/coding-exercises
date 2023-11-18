import SolarSystem, { RunMode } from './SolarSystem';
import Star from './Star';
import Planet from './Planet';
import Run from './Run';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const solarsystem = new SolarSystem(RunMode.Browser, canvas);
    const run = new Run(solarsystem);

    const starProps = {
        mass: 10000,
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        color: 'yellow',
        name: 'A'
    }

    const planetsProps = [{
        mass: 20,
        position: {x: 50, y: 200},
        velocity: {x: 10, y: 1},
        color: 'red',
        name: '1'
    }, {
        mass: 9,
        position: {x: -70, y: 100},
        velocity: {x: 4, y: 9},
        color: 'green',
        name: '2'
    }, {
        mass: 14,
        position: {x: 300, y: -50},
        velocity: {x: -2, y: -5},
        color: 'orange',
        name: '3'
    }];

    const createStarBtn = <HTMLButtonElement>document.getElementById('createstar');
    createStarBtn.addEventListener('click', e => {
        e.preventDefault();

        createStarBtn.disabled = true;

        new Star(solarsystem, starProps)
    });

    const createPlanetBtn = <HTMLButtonElement>document.getElementById('createplanet');
    let planetIndex = 0;
    createPlanetBtn.addEventListener('click', e => {
        e.preventDefault();

        if (planetIndex >= planetsProps.length) {
            createPlanetBtn.disabled = true;
        }

        const props = planetsProps[planetIndex];

        new Planet(solarsystem, props);

        planetIndex++;
    });

    const fpsInput = <HTMLInputElement>document.getElementById('fps');
    const startBtn = <HTMLButtonElement>document.getElementById('start');

    startBtn.addEventListener('click', async e => {
        e.preventDefault();

        const fps = parseInt(fpsInput.value, 10) || 10;

        await run.startBrowserRun(fps);
    });

    /*
    const singleStarSystem = [
        new Star(solarsystem, starProps.mass, starProps.initialPosition, starProps.initialVelocity, starProps.color, starProps.name),
        new Planet(solarsystem, 20, [50, 200], [7, 1], 'red', '1'),
        new Planet(solarsystem, 9, [-70, 100], [4, 9], 'green', '2'),
        new Planet(solarsystem, 14, [300, -50], [-2, -5], 'blue', '3'),
    ];
    */

    const binaryStarProperties = [{
        name: 'A',
        mass: 10000,
        color: 'yellow',
        position: { x: -200, y: 0 },
        velocity: { x: 0, y: 3.5 },
    }, {
        name: 'B',
        mass: 10000,
        color: 'yellow',
        position: { x: 200, y: 0 },
        velocity: { x: 0, y: -3.5 },
    }];

    const binaryPlanetProperties = [{
        name: '1',
        mass: 20,
        color: 'red',
        position: { x: 50, y: 0 },
        velocity: { x: 0, y: 11 },
    }, {
        name: '2',
        mass: 1,
        color: 'green',
        position: { x: -70, y: 10 },
        velocity: { x: 0, y: 13 },
    }, {
        name: '3',
        mass: 14,
        color: 'blue',
        position: { x: 300, y: -50 },
        velocity: { x: -4, y: -12 },
    }];

    /*
    const binaryStarSystem = [
        new Star(solarsystem, 10000, { x: -200, y: 0 }, { x: 0, y: 3.5 }, 'yellow', 'A'),
        new Star(solarsystem, 10000, { x: 200, y: 0 }, { x: 0, y: -3.5 }, 'yellow', 'B'),

        new Planet(solarsystem, 20, { x: 50, y: 0 }, { x: 0, y: 11 }, 'red', '1'),
        new Planet(solarsystem, 1, { x: -70, y: 10 }, { x: 0, y: 13 }, 'green', '2'),
        new Planet(solarsystem, 14, { x: 300, y: -50 }, { x: -4, y: -12 }, 'blue', '3'),
    ];

    (async () => {
        solarsystem.reset();

        const binaryStarSystem = [
            new Star(solarsystem, binaryStarProperties[0]),
            new Star(solarsystem, binaryStarProperties[1]),

            new Planet(solarsystem, binaryPlanetProperties[0]),
            new Planet(solarsystem, binaryPlanetProperties[1]),
            new Planet(solarsystem, binaryPlanetProperties[2]),
        ];

        await run.startRun(120);
    })();
    */

    const minMaxValues = {
        mass: {
            min: 5,
            max: 20,
            step: 1
        },
        position: {
            min: -250,
            max: 250,
            step: 10
        },
        velocity: {
            min: -10,
            max: 10,
            step: 1
        }
    };

    const colors = [
        'red',
        'purple',
        'green',
        'blue',
        'orange',
        'magenta',
        'maroon',
        'cyan'
    ];

    (async () => {
        const maxruns = 1000;
        const max_iterations = 1000;
        const max_distance = 5000;
        const fps = 120;

        run.totalRuns = 0;

        while (run.totalRuns < maxruns) {
            solarsystem.reset();
            solarsystem.maxIterations = max_iterations;
            solarsystem.maxDistance = max_distance;

            new Star(solarsystem, starProps);

            new Planet(solarsystem, {
                name: 'Planet 1',
                color: colors[Math.floor(Math.random() * colors.length)],
                mass: Math.floor(Math.random() * (minMaxValues.mass.max - minMaxValues.mass.min)) + minMaxValues.mass.min,
                position: {
                    x: Math.floor(Math.floor(Math.random() * (minMaxValues.position.max - minMaxValues.position.min)) / 10) * 10 + minMaxValues.position.min,
                    y: Math.floor(Math.floor(Math.random() * (minMaxValues.position.max - minMaxValues.position.min)) / 10) * 10 + minMaxValues.position.min,
                },
                velocity: {
                    x: Math.floor(Math.random() * (minMaxValues.velocity.max - minMaxValues.velocity.min) / 2) + minMaxValues.velocity.min,
                    y: Math.floor(Math.random() * (minMaxValues.velocity.max - minMaxValues.velocity.min) / 2) + minMaxValues.velocity.min,
                }
            });

            new Planet(solarsystem, {
                name: 'Planet 2',
                color: colors[Math.floor(Math.random() * colors.length)],
                mass: Math.floor(Math.random() * (minMaxValues.mass.max - minMaxValues.mass.min)) + minMaxValues.mass.min,
                position: {
                    x: Math.floor(Math.floor(Math.random() * (minMaxValues.position.max - minMaxValues.position.min)) / 10) * 10 + minMaxValues.position.min,
                    y: Math.floor(Math.floor(Math.random() * (minMaxValues.position.max - minMaxValues.position.min)) / 10) * 10 + minMaxValues.position.min,
                },
                velocity: {
                    x: Math.floor(Math.random() * (minMaxValues.velocity.max - minMaxValues.velocity.min) / 2) + minMaxValues.velocity.min,
                    y: Math.floor(Math.random() * (minMaxValues.velocity.max - minMaxValues.velocity.min) / 2) + minMaxValues.velocity.min,
                }
            });

            await run.startBrowserRun(fps);
        }
    })();
});
