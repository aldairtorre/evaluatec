const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/admin/App.jsx', 'public/js/admin').react()
    .js('resources/js/admin/auth/App.jsx', 'public/js/admin/auth').react()
    .sass('resources/sass/app.scss', 'public/css');
