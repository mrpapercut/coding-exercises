const mix = require('laravel-mix');

mix
    .ts('./src/browser.ts', './dist')
    .ts('./src/console.ts', './dist')
