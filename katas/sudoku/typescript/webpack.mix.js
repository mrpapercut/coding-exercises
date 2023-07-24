const mix = require('laravel-mix');

mix
    // .ts('./src/Sudoku.ts', './public')
    .ts('./src/test-app.ts', './public')
    .sass('./src/style.scss', './public');
