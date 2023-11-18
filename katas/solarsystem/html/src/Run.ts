import Planet from './Planet';
import SolarSystem from './SolarSystem';
import Star from './Star';

class Run {
    private solarsystem: SolarSystem;

    public totalRuns: number = 0;
    public totalStats: Record<string, any>[] = [];

    constructor(solarsystem: SolarSystem) {
        this.solarsystem = solarsystem;
    }

    updateStats() {
        const starBody = Array.from(this.solarsystem.bodies).find(body => body instanceof Star);
        this.solarsystem.bodies.forEach(body => {
            let distanceToStar = 0;
            if (starBody && body instanceof Planet) {
                distanceToStar = Math.floor((<Planet>body).distance(starBody));
                if (distanceToStar < body.minDistanceToStar) {
                    body.minDistanceToStar = distanceToStar;
                } else if (distanceToStar > body.maxDistanceToStar) {
                    body.maxDistanceToStar = distanceToStar;
                }
            }
        });
    }

    setBrowserStats({fps, iterations}: Record<string, number>) {
        if (fps) {
            const statsFPS = <HTMLSpanElement>document.getElementById('currentfps');
            statsFPS.innerHTML = fps.toString();
        }

        if (iterations) {
            const statsIterations = <HTMLSpanElement>document.getElementById('iterations');
            statsIterations.innerHTML = iterations.toString();
        }

        const statsTotalRuns = <HTMLSpanElement>document.getElementById('totalruns');
        statsTotalRuns.innerHTML = this.totalRuns.toString();

        function createLabelValuePair(id: string, title: string, value: string) {
            const label = document.createElement('label');
            label.setAttribute('for', id);

            const spanlabel = document.createElement('span');
            spanlabel.classList.add('label');
            spanlabel.innerHTML = title;

            const spanvalue = document.createElement('span');
            spanvalue.classList.add('value');
            spanvalue.id = id;
            spanvalue.innerHTML = value;

            label.appendChild(spanlabel);
            label.appendChild(spanvalue);

            return label;
        }

        const bodiesStats = <HTMLDivElement>document.getElementById('bodiesstats');
        bodiesStats.innerHTML = '';
        function createBodyStatsTable({name, radius, mass, distance_travelled, distance_to_star, initialPosition, position, initialVelocity, velocity}) {
            const bodydiv = document.createElement('div');
            bodydiv.classList.add('body');
            bodydiv.appendChild(createLabelValuePair('name', 'Name', name));
            bodydiv.appendChild(createLabelValuePair('radius', 'Radius', radius));
            bodydiv.appendChild(createLabelValuePair('mass', 'Mass', mass));
            bodydiv.appendChild(createLabelValuePair('initpos', 'Initial position', `[${initialPosition.x},${initialPosition.y}]`));
            // bodydiv.appendChild(createLabelValuePair('curpos', 'Position', `[${position.x.toPrecision(1)},${position.y.toPrecision(1)}]`));
            bodydiv.appendChild(createLabelValuePair('initvel', 'Initial velocity', `[${initialVelocity.x},${initialVelocity.y}]`));
            // bodydiv.appendChild(createLabelValuePair('curvel', 'Velocity', `[${velocity.x.toPrecision(1)},${velocity.y.toPrecision(1)}]`));
            bodydiv.appendChild(createLabelValuePair('distance_travelled', 'Distance travelled', distance_travelled));
            bodydiv.appendChild(createLabelValuePair('distance_to_star', 'Distance to star', distance_to_star));

            bodiesStats.appendChild(bodydiv);
            bodiesStats.appendChild(document.createElement('hr'));
        }

        const starBody = Array.from(this.solarsystem.bodies).find(body => body instanceof Star);
        this.solarsystem.bodies.forEach(body => {
            /*
            let distanceToStar = 0;
            if (starBody && body instanceof Planet) {
                distanceToStar = Math.floor((<Planet>body).distance(starBody));
                if (distanceToStar < body.minDistanceToStar) {
                    body.minDistanceToStar = distanceToStar;
                } else if (distanceToStar > body.maxDistanceToStar) {
                    body.maxDistanceToStar = distanceToStar;
                }
            }
            */

            return createBodyStatsTable({
                name: body.name,
                mass: body.mass,
                radius: Math.round(body.display_size / 2),
                position: body.getPosition(),
                initialPosition: body.initialPosition,
                velocity: body.velocity,
                initialVelocity: body.initialVelocity,
                distance_travelled: Math.floor(body.distance_travelled),
                distance_to_star: starBody && body instanceof Planet ? Math.floor((<Planet>body).distance(starBody)) : 0
            })
        });
    }

    storeStats({iterations}: Record<string, number>) {
        const runStats = {
            iterations,
            bodies: [],
            causeOfFailure: this.solarsystem.causeOfFailure
        }

        const starBody = Array.from(this.solarsystem.bodies).find(body => body instanceof Star);
        this.solarsystem.bodies.forEach(body => {
            runStats.bodies.push({
                name: body.name,
                mass: body.mass,
                radius: Math.round(body.display_size / 2),
                position: body.getPosition(),
                initialPosition: body.initialPosition,
                velocity: body.velocity,
                initialVelocity: body.initialVelocity,
                distance_travelled: body.distance_travelled,
                distance_to_star: body instanceof Planet ? Math.floor(body.distance(starBody)) : 0,
                minDistanceToStar: body.minDistanceToStar,
                maxDistanceToStar: body.maxDistanceToStar
            })
        })

        this.totalStats.push(runStats);
    }

    async startBrowserRun(fps = 60) {
        this.totalRuns++;

        this.solarsystem.resetCanvas();
        this.solarsystem.isRunning = true;

        let i = 0;
        while (this.solarsystem.isRunning && i < this.solarsystem.maxIterations) {
            i++;

            this.solarsystem.calculateAllBodyInteractions();
            this.solarsystem.updateAll();
            this.updateStats()
            this.setBrowserStats({
                fps,
                iterations: i
            });

            await new Promise(resolve => setTimeout(resolve, 1000 / fps));
        }

        if (i === this.solarsystem.maxIterations) {
            this.solarsystem.causeOfFailure = this.solarsystem.possibleCauses.MAX_ITERATIONS_EXCEEDED;

            this.storeStats({
                iterations: i
            });

            (<HTMLTextAreaElement>document.getElementById('output')).value = JSON.stringify(this.totalStats);
        }
    }

    async startConsoleRun() {
        this.totalRuns++;

        this.solarsystem.isRunning = true;

        let i = 0;
        while (this.solarsystem.isRunning && i < this.solarsystem.maxIterations) {
            i++;

            this.solarsystem.calculateAllBodyInteractions();
            this.solarsystem.updateAll();
            this.updateStats();
        }

        if (i === this.solarsystem.maxIterations) {
            this.solarsystem.causeOfFailure = this.solarsystem.possibleCauses.MAX_ITERATIONS_EXCEEDED;

            this.storeStats({
                iterations: i
            });
        }
    }
}

export default Run;
