import FloodFillMaze from './FloodFillMaze';

const maze = [
    [0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
]

const x = 0;
const y = 3;

const ffm = new FloodFillMaze();
ffm.setMaze(maze);
ffm.fill(x, y);

const visited = ffm.getVisited();

visited.sort((a, b) => a.distance - b.distance).forEach(cell => {
    console.log(cell);
})
