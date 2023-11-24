// import fs from 'fs';
// import path from 'path';

import SolarSystem, { RunMode } from './SolarSystem';
import Star from './Star';
import Planet from './Planet';
import Run from './Run';

const solarsystem = new SolarSystem(RunMode.Console);
const run = new Run(solarsystem);

const starProps = {
    mass: 10000,
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0},
    color: 'yellow',
    name: 'A'
}

const minMaxValues = {
    mass: {
        min: 5,
        max: 20,
        step: 1
    },
    position: {
        min: -400,
        max: 400,
        step: 10
    },
    velocity: {
        min: -10,
        max: 10,
        step: 0.1
    }
};

type RunOptions = {
    maxRuns: number,
    maxIterations: number,
    maxDistance: number,
    numberOfPlanets: number
}

function getRandomPlanetProps(name: string = '') {
    const mass = Math.floor(Math.random() * (minMaxValues.mass.max - minMaxValues.mass.min)) + minMaxValues.mass.min;

    const positionX = Math.floor(Math.floor(Math.random() * (minMaxValues.position.max - minMaxValues.position.min)) / 10) * 10 + minMaxValues.position.min;
    const positionY = Math.floor(Math.floor(Math.random() * (minMaxValues.position.max - minMaxValues.position.min)) / 10) * 10 + minMaxValues.position.min;

    const velocityX = Math.floor(Math.random() * (minMaxValues.velocity.max - minMaxValues.velocity.min) / 2) + minMaxValues.velocity.min;
    const velocityY = Math.floor(Math.random() * (minMaxValues.velocity.max - minMaxValues.velocity.min) / 2) + minMaxValues.velocity.min;

    return {
        name: `Planet ${name}`,
        color: '#fff',
        mass: mass,
        position: {
            x: (Math.random() > 0.5 ? -1 : 1) * positionX,
            y: (Math.random() > 0.5 ? -1 : 1) * positionY,
        },
        velocity: {
            x: (Math.random() > 0.5 ? -1 : 1) * velocityX,
            y: (Math.random() > 0.5 ? -1 : 1) * velocityY,
        }
    }
}

async function performRun(options: RunOptions, previousRun: Record<string, any>[] = []) {
    run.totalRuns = 0;
    run.totalStats = [];

    if (previousRun.length > 0) {
        previousRun.forEach(async prevRun => {
            solarsystem.reset();
            solarsystem.maxIterations = options.maxIterations;
            solarsystem.maxDistance = options.maxDistance;

            new Star(solarsystem, starProps);

            for (let i = 0; i < prevRun.bodies.length; i++) {
                const body = prevRun.bodies[i];

                if (body.name === 'A') continue;

                new Planet(solarsystem, {
                    name: body.name,
                    color: '#fff',
                    mass: body.mass,
                    position: body.initialPosition,
                    velocity: body.initialVelocity,
                });
            }

            await run.startConsoleRun();
        });
    } else {
        while (run.totalRuns < options.maxRuns) {
            solarsystem.reset();
            solarsystem.maxIterations = options.maxIterations;
            solarsystem.maxDistance = options.maxDistance;

            new Star(solarsystem, starProps);

            for (let i = 0; i < options.numberOfPlanets; i++) {
                new Planet(solarsystem, getRandomPlanetProps(String(i + 1)));
            }

            await run.startConsoleRun();
        }
    }

    return run.totalStats;
}

(async () => {
    const options = {
        maxRuns: 10000000,
        maxIterations: 1000,
        maxDistance: 10000,
        numberOfPlanets: 5
    }

    let stats = [];

    for (let i = 0; i < 5; i++) {
        stats = await performRun(options, stats);

        // options.maxRuns *= 2;
        options.maxIterations *= 2;
        options.maxDistance *= 2;
    }

    console.log(JSON.stringify(stats));
    /*
    const outputFilename = path.resolve(__dirname, `./results/planets${options.numberOfPlanets}-runs${options.maxRuns}-results.json`);
    fs.writeFile(outputFilename, JSON.stringify(stats), (err) => {
        if (err) console.error(err);
        console.log(`Written ${stats.length} results to ${outputFilename}`);
    });
    */
})();
