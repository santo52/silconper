const mix = require('laravel-mix');
const TerserPlugin = require('terser-webpack-plugin');
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
    entry: {
        app: path.join(__dirname, 'resources/js/index.js'),
        views: [...recursiveRoutes("resources/views")],
    },
    output: {
        libraryTarget: 'umd',
        filename: 'js/[name].bundle.js',
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    }
})

mix.sass('resources/sass/app.scss', 'public/css');