let mix = require('laravel-mix')

mix.js('resources/js/tool.js', 'dist/js')
.sass('resources/sass/tool.scss', 'dist/css');

mix.js('resources/js/field.js', 'dist/js')
   .webpackConfig({
        resolve: {
            symlinks: false
        }
    })
