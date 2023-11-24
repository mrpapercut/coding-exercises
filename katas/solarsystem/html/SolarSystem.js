class Drawable {
    getPosition() {
        return [this.x, this.y];
    }

    setPosition(coordinates = []) {
        this.x = coordinates[0];
        this.y = coordinates[1];
    }

    setColor(color = '#fff') {
        this.color = color;
    }

    clear() {}

    dot(size) {
        const origStrokeStyle = this.solarsystem.context.strokeStyle;
        const origFillStyle = this.solarsystem.context.fillStyle;

        this.solarsystem.context.strokeStyle = this.color;
        this.solarsystem.context.fillStyle = this.color;

        this.solarsystem.context.beginPath();
        this.solarsystem.context.arc(this.x, this.y, size / 2, 0, 2 * Math.PI);
        this.solarsystem.context.fill();
        this.solarsystem.context.stroke();
        this.solarsystem.context.closePath();

        this.solarsystem.context.strokeStyle = origStrokeStyle;
        this.solarsystem.context.fillStyle = origFillStyle;
    }

    distance(otherBody) {
        return Math.sqrt(
            (otherBody.x - this.x) ** 2 +
            (otherBody.y - this.y) ** 2
        );
    }

    towards(otherBody) {
        // in radians
        return Math.atan2(otherBody.y - this.y, otherBody.x - this.x);
    }
}

class SolarSystemBody extends Drawable {
    min_display_size = 20;
    display_log_base = 1.1;

    constructor(solarsystem, properties = {
        mass: 10,
        position: [0, 0],
        velocity: [0, 0],
        color: 'white',
        name: ''
    }) {
        super();
        this.solarsystem = solarsystem;

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
        const target = [
            origin[0] + this.velocity[0],
            origin[1] + this.velocity[1],
        ];

        const distance = Math.sqrt((target[0] - origin[0]) ** 2 + (target[1] - origin[1]) ** 2);

        this.distance_travelled += distance;

        this.setPosition(target);
    }
}

class Star extends SolarSystemBody {
    constructor(solarsystem, properties = {
        mass: 10,
        position: [0, 0],
        velocity: [0, 0],
        color: 'yellow',
        name: ''
    }) {
        super(solarsystem, properties);
    }
}

class Planet extends SolarSystemBody {
    constructor(solarsystem, properties = {
        mass: 10,
        position: [0, 0],
        velocity: [0, 0],
        color: 'white',
        name: ''
    }) {
        super(solarsystem, properties);
    }
}

class SolarSystem {
    isRunning = true;

    max_distance = 10000;
    max_runs = 5000;

    causeOfFailure = '';
    possibleCauses = {
        COLLISION: 'collision',
        DISTANCE_EXCEEDED: 'exceeded distance',
        NEGLIBLE_FORCE: 'not in orbit',
        MAX_RUNS_EXCEEDED: 'max runs exceeded',
    }

    totalStats = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.width = canvas.width;
        this.height = canvas.height;

        this.context.translate(this.width / 2, this.height / 2);

        this.bodies = new Set();
    }

    resetCanvas() {
        const origFillStyle = this.context.fillStyle;
        this.context.fillStyle = '#000';
        this.context.rect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        this.context.fill();
        this.context.fillStyle = origFillStyle;
    }

    reset() {
        this.bodies = new Set();
        this.causeOfFailure = '';
    }

    addBody(body) {
        this.bodies.add(body);
    }

    removeBody(body) {
        this.bodies.delete(body);
    }

    updateAll() {
        this.resetCanvas();

        this.bodies.forEach(body => {
            body.move();
            body.draw();
        });
    }

    accelerateDueToGravity(first, second) {
        const force = first.mass * second.mass / first.distance(second) ** 2;
        const angle = first.towards(second);

        if (force > 0 && force < 0.00001) {
            this.isRunning = false;
            this.causeOfFailure = this.possibleCauses.NEGLIBLE_FORCE;
            console.log(`Body "${first.name}" was ejected!`);
        }

        let reverse = 1;

        const bodies = [first, second];

        bodies.forEach(body => {
            const acceleration = force / body.mass;
            const acc_x = acceleration * Math.cos(angle);
            const acc_y = acceleration * Math.sin(angle);

            body.velocity = [
                body.velocity[0] + (reverse * acc_x),
                body.velocity[1] + (reverse * acc_y)
            ];

            reverse = -1;
        });
    }

    checkCollision(first, second) {
        if (first instanceof Planet && second instanceof Planet) {
            return
        }

        if (first.distance(second) < first.display_size/2 + second.display_size/2) {
            [first, second].forEach(body => {
                if (body instanceof Planet) {
                    this.isRunning = false;
                    this.causeOfFailure = this.possibleCauses.COLLISION;
                    console.log(`Body "${first.name}" has collided with "${second.name}"!`);
                    // this.removeBody(body);
                }
            });
        }
    }

    checkEjection(body) {
        const starBody = Array.from(this.bodies).find(body => body instanceof Star);

        if (body.distance(starBody) > this.max_distance) {
            this.isRunning = false;
            this.causeOfFailure = this.possibleCauses.DISTANCE_EXCEEDED;
            console.log(`Body "${body.name}" exceeded distance max of ${this.max_distance}!`);
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

    updateStats({fps, iterations}) {
        if (fps) {
            const statsFPS = document.getElementById('currentfps');
            statsFPS.innerHTML = fps;
        }

        if (iterations) {
            const statsIterations = document.getElementById('iterations');
            statsIterations.innerHTML = iterations;
        }

        const statsTotalRuns = document.getElementById('totalruns');
        statsTotalRuns.innerHTML = this.totalStats.length;

        function createLabelValuePair(id, title, value) {
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

        const bodiesStats = document.getElementById('bodiesstats');
        bodiesStats.innerHTML = '';
        function createBodyStatsTable({name, radius, mass, distance_travelled, distance_to_star, initialPosition, position, initialVelocity, velocity}) {
            const bodydiv = document.createElement('div');
            bodydiv.classList.add('body');
            bodydiv.appendChild(createLabelValuePair('name', 'Name', name));
            bodydiv.appendChild(createLabelValuePair('radius', 'Radius', radius));
            bodydiv.appendChild(createLabelValuePair('mass', 'Mass', mass));
            bodydiv.appendChild(createLabelValuePair('initpos', 'Initial position', `[${initialPosition[0]},${initialPosition[1]}]`));
            // bodydiv.appendChild(createLabelValuePair('curpos', 'Position', `[${position[0].toPrecision(1)},${position[1].toPrecision(1)}]`));
            bodydiv.appendChild(createLabelValuePair('initvel', 'Initial velocity', `[${initialVelocity[0]},${initialVelocity[1]}]`));
            // bodydiv.appendChild(createLabelValuePair('curvel', 'Velocity', `[${velocity[0].toPrecision(1)},${velocity[1].toPrecision(1)}]`));
            bodydiv.appendChild(createLabelValuePair('distance_travelled', 'Distance travelled', distance_travelled));
            bodydiv.appendChild(createLabelValuePair('distance_to_star', 'Distance to star', distance_to_star));

            bodiesStats.appendChild(bodydiv);
            bodiesStats.appendChild(document.createElement('hr'));
        }

        const starBody = Array.from(this.bodies).find(body => body instanceof Star);
        this.bodies.forEach(body => createBodyStatsTable({
            name: body.name,
            mass: body.mass,
            radius: Math.round(body.display_size / 2),
            position: body.getPosition(),
            initialPosition: body.initialPosition,
            velocity: body.velocity,
            initialVelocity: body.initialVelocity,
            distance_travelled: Math.floor(body.distance_travelled),
            distance_to_star: body instanceof Planet ? Math.floor(body.distance(starBody)) : 0
        }));
    }

    storeStats({fps, iterations}) {
        const runStats = {
            fps,
            iterations,
            bodies: [],
            causeOfFailure: this.causeOfFailure
        }

        const starBody = Array.from(this.bodies).find(body => body instanceof Star);
        this.bodies.forEach(body => {
            runStats.bodies.push({
                name: body.name,
                mass: body.mass,
                position: body.getPosition(),
                initialPosition: body.initialPosition,
                velocity: body.velocity,
                initialVelocity: body.initialVelocity,
                distance_travelled: body.distance_travelled,
                distance_to_star: body instanceof Planet ? Math.floor(body.distance(starBody)) : 0,
            })
        })

        this.totalStats.push(runStats);

        document.getElementById('output').value = JSON.stringify(this.totalStats);
    }

    async startRun(fps = 60) {
        this.resetCanvas();
        this.isRunning = true;

        let i = 0;
        while (this.isRunning && i < this.max_runs) {
            i++;

            this.calculateAllBodyInteractions();
            this.updateAll();
            this.updateStats({
                fps,
                iterations: i
            });

            await new Promise(resolve => setTimeout(resolve, 1000 / fps));
        }

        if (i === this.max_runs) {
            this.causeOfFailure = this.possibleCauses.MAX_RUNS_EXCEEDED;
        }

        this.storeStats({
            fps,
            iterations: i
        });
    }
}
