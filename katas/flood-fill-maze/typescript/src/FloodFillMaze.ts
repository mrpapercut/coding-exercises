type Maze = number[][]

type Visited = Cell[]

type Cell = {
    x: number,
    y: number,
    distance: number
}

class FloodFillMaze {
    private maze: Maze = [];
    private visited: Visited = [];

    constructor() {

    }

    setMaze(maze: Maze): void {
        this.maze = maze;
    }

    getMaze(): Maze {
        return this.maze;
    }

    getVisited(): Visited {
        return this.visited;
    }

    fill(x: number, y: number, currentDistance: number = 0): void {
        // If outside maze
        if (x < 0 || x > this.maze.length - 1 || y < 0 || y > this.maze[x].length - 1) {
            return;
        }

        // If already visited
        if (this.visited.filter(cell => cell.x === x && cell.y === y).length > 0) {
            return;
        }

        // If is wall
        if (this.maze[x][y] === 1) {
            return;
        }

        const cell: Cell = {
            x,
            y,
            distance: currentDistance
        }

        this.visited.push(cell);

        this.fill(x + 1, y, currentDistance + 1);
        this.fill(x - 1, y, currentDistance + 1);
        this.fill(x, y + 1, currentDistance + 1);
        this.fill(x, y - 1, currentDistance + 1);
    }
}

export default FloodFillMaze;
