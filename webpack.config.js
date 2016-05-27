
const resolve = require('path').resolve;
const bootstrap = require('bootstrap-styl');

module.exports = {

    entry: resolve(__dirname, 'src/index.js'),
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'fileselect.bundle.js'
    },
    resolve: {
        //set the default extensions
        extensions: ['', '.js', '.jsx', '.styl'],
        //set up aliases
        alias: {
            modules: resolve(__dirname, './node_modules'),
            styles: resolve(__dirname, './src/styles')
        }
    },
    module: {
        loaders: [
            //load css files
            { test: /\.css$/, loader: "style!css" },
            //load stylus files
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            //load css fonts as base64
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'url' },
            //set up babel for react
            {
                test: /.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    //load bootstrap
    stylus: {
        use: [bootstrap()]
    }
};
