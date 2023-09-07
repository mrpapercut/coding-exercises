class Cell {
    x;
    y;
    distance;

    constructor(x, y, distance) {
        this.x = x;
        this.y = y;
        this.distance = distance;
    }
}

class FloodFillMaze {
    maze = [];
    visited = [];

    setMaze(maze) {
        this.maze = maze;
    }

    getMaze() {
        return this.maze;
    }

    getVisited() {
        return this.visited;
    }

    clearVisited() {
        this.visited = [];
    }

    fill(x, y, currentDistance = 0) {
        // If outside maze
        if (x < 0 || x > this.maze.length - 1 || y < 0 || y > this.maze[x].length - 1) {
            return;
        }

        // If is wall
        if (this.maze[x][y] === 1) {
            return;
        }

        // If already visited
        const existingCell = this.visited.find(cell => cell.x === x && cell.y === y);
        if (existingCell) {
            if (existingCell.distance < currentDistance) {
                return;
            } else {
                existingCell.distance = currentDistance;
            }
        } else {
            const cell = new Cell(x, y, currentDistance);
            this.visited.push(cell);
        }


        this.fill(x + 1, y, currentDistance + 1);
        this.fill(x - 1, y, currentDistance + 1);
        this.fill(x, y + 1, currentDistance + 1);
        this.fill(x, y - 1, currentDistance + 1);
    }

    getCell(x, y) {
        return this.visited.find(cell => cell.x === x && cell.y === y);
    }
}

const maze5x5 = [
    [0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
]

const maze7x7 = [
    [0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 0, 0],
];

const maze10x10 = [
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
];

const maze10x20 = [
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const maze = maze10x20;

const startCell = new Cell(0, 0);
const targetCell = new Cell(7, 12);

const ffm = new FloodFillMaze();
ffm.setMaze(maze);
ffm.clearVisited();
ffm.fill(startCell.x, startCell.y);

const cellWidth = 80;

const mazeDiv = document.getElementById('maze');
mazeDiv.setAttribute('style', `grid-template-columns: repeat(${maze[0].length}, 1fr); width: ${maze[0].length * cellWidth}px`);

maze.forEach((rows, x) => {
    rows.forEach((cell, y) => {
        const foundCell = ffm.getCell(x, y);
        if (!foundCell) {
            const wall = document.createElement('div');
            wall.classList.add('wall');
            mazeDiv.appendChild(wall);
        } else {
            const cellDiv = document.createElement('div');
            cellDiv.innerHTML = foundCell.distance;

            if (foundCell.distance === 0) {
                cellDiv.classList.add('start');
            }

            if (x === targetCell.x && y === targetCell.y) {
                cellDiv.classList.add('highlight');
            }

            mazeDiv.appendChild(cellDiv);
        }
    });
});

const getNeighbourCoors = (x, y) => {
    return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
    ];
}

console.log(targetCell.distance);
const neighCoors = getNeighbourCoors(targetCell.x, targetCell.y);
const neighbours = new Array(4).fill(false).map((_, i) => {
    const foundCell = ffm.getCell(neighCoors[i][0], neighCoors[i][1]);
    if (foundCell && foundCell.distance === ffm.getCell(targetCell.x, targetCell.y).distance - 1) {
        return foundCell;
    }
});

console.log(neighbours);
