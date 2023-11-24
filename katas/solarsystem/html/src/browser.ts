import SolarSystem, { RunMode } from './SolarSystem';
import Star from './Star';
import Planet from './Planet';
import Run from './Run';
import { XY } from './Drawable';

import threeplanetresults from './results/3planetresults.json';
import fourplanetresults from './results/4planetresults.json';
import fiveplanetresults from './results/5planetresults.json';
import sixplanetresults from './results/6planetresults.json';

type BodyProps = {
    name: string,
    color: string,
    mass: number,
    position: XY,
    velocity: XY,
}

class BrowserRun {
    private solarsystem: SolarSystem;
    private run: Run;

    private starProps: BodyProps = {
        mass: 10000,
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        color: 'yellow',
        name: 'A'
    }

    private minMaxValues = {
        mass: {
            min: 5,
            max: 25,
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
            step: 1
        }
    };

    private colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Cyan', 'Magenta', 'Orange', 'Pink', 'Aqua', 'LemonChiffon', 'LavenderBlush', 'LimeGreen', 'HotPink', 'DeepSkyBlue', 'Gold', 'Orchid', 'DodgerBlue', 'Tomato', 'Chartreuse', 'MediumVioletRed', 'DeepPink', 'SpringGreen', 'DarkOrange', 'RoyalBlue', 'MediumPurple', 'MediumAquamarine', 'DarkViolet', 'CornflowerBlue', 'YellowGreen'];

    constructor(solarsystem: SolarSystem) {
        this.solarsystem = solarsystem;
        this.run = new Run(solarsystem);

        this.attachListeners();
    }

    attachListeners() {
        const createStarBtn = <HTMLButtonElement>document.getElementById('createstar');
        createStarBtn.addEventListener('click', e => {
            e.preventDefault();

            createStarBtn.disabled = true;

            new Star(this.solarsystem, this.starProps);
        });

        const createPlanetBtn = <HTMLButtonElement>document.getElementById('createplanet');
        let planetIndex = 0;
        createPlanetBtn.addEventListener('click', e => {
            e.preventDefault();

            const props = this.getRandomPlanetProps((this.solarsystem.bodies.size + 1).toString());

            new Planet(this.solarsystem, props);

            planetIndex++;
        });

        const fpsInput = <HTMLInputElement>document.getElementById('fps');
        const startBtn = <HTMLButtonElement>document.getElementById('start');

        startBtn.addEventListener('click', async e => {
            e.preventDefault();

            const fps = parseInt(fpsInput.value, 10) || 10;

            await this.run.startBrowserRun(fps);
        });

        const randomRunBtn = <HTMLButtonElement>document.getElementById('randomrun');
        randomRunBtn.addEventListener('click', async e => {
            e.preventDefault();

            await this.start();
        });

        const runFromFileBtn = <HTMLButtonElement>document.getElementById('runfromfile');
        runFromFileBtn.addEventListener('click', async e => {
            await this.runFromFile();
        })
    }

    getRandomPlanetProps(name: string = '') {
        const mass = Math.floor(Math.random() * (this.minMaxValues.mass.max - this.minMaxValues.mass.min)) + this.minMaxValues.mass.min;

        const positionX = Math.floor(Math.floor(Math.random() * (this.minMaxValues.position.max - this.minMaxValues.position.min)) / 10) * 10 + this.minMaxValues.position.min;
        const positionY = Math.floor(Math.floor(Math.random() * (this.minMaxValues.position.max - this.minMaxValues.position.min)) / 10) * 10 + this.minMaxValues.position.min;

        const velocityX = Math.floor(Math.random() * (this.minMaxValues.velocity.max - this.minMaxValues.velocity.min) / 2) + this.minMaxValues.velocity.min;
        const velocityY = Math.floor(Math.random() * (this.minMaxValues.velocity.max - this.minMaxValues.velocity.min) / 2) + this.minMaxValues.velocity.min;

        return {
            name: `Planet ${name}`,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
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

    async start() {
        const maxruns = 1000;
        const max_iterations = 1000;
        const max_distance = 5000;
        const numberOfPlanets = 4;

        this.run.totalRuns = 0;

        while (this.run.totalRuns < maxruns) {
            this.solarsystem.reset();
            this.solarsystem.maxIterations = max_iterations;
            this.solarsystem.maxDistance = max_distance;

            new Star(this.solarsystem, this.starProps);

            for (let i = 0; i < numberOfPlanets; i++) {
                new Planet(this.solarsystem, this.getRandomPlanetProps((i + 1).toString()));
            }

            await this.run.startBrowserRun();

            // if (this.solarsystem.causeOfFailure === this.solarsystem.possibleCauses.COLLISION) {
            //     await new Promise(resolve => setTimeout(resolve, 250));
            // }
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async runFromFile(results = fiveplanetresults) {
        if (!results || results.length === 0) {
            return;
        }

        this.shuffleArray(results);

        this.run.totalRuns = 0;
        for (let i = 0; i < results.length; i++) {
            this.solarsystem.reset();
            this.solarsystem.maxIterations = 2500;
            this.solarsystem.maxDistance = 10000;

            const result = results[i];

            new Star(this.solarsystem, this.starProps);

            for (let j = 0; j < result.bodies.length; j++) {
                const body = result.bodies[j];

                if (body.name === 'A') continue;

                new Planet(this.solarsystem, {
                    name: body.name,
                    color: this.colors[Math.floor(Math.random() * this.colors.length)],
                    mass: body.mass,
                    position: body.initialPosition,
                    velocity: body.initialVelocity,
                });
            }

            await this.run.startBrowserRun();
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const solarsystem = new SolarSystem(RunMode.Browser, canvas);
    const browserRun = new BrowserRun(solarsystem);
    // await browserRun.start();

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
});
