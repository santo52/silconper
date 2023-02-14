const mix = require('laravel-mix');
const path = require('path')
const fs = require('fs')

function recursiveRoutes(folderName) {
    const basePath = !folderName.includes(__dirname)
        ? path.join(__dirname, folderName)
        : folderName;

    return fs.readdirSync(basePath).reduce((initial, file) => {
        const fullName = path.join(basePath, file);
        const stat = fs.lstatSync(fullName);
        if (stat.isDirectory()) {
            const res = recursiveRoutes(fullName);
            return [...initial, ...res]
        }

        if(!file.includes('.blade.js')) return initial
        return initial.concat([fullName])
    }, [])
}


mix.webpackConfig({
    optimization: {
        minimize: true
    }
})

mix.babel(['resources/js/app.js', ...recursiveRoutes("resources/views")], 'public/js/app.js')
.sass('resources/sass/app.scss', 'public/css');