
const resolve = require('path').resolve;

module.exports = {

    entry: resolve(__dirname, 'src/index.js'),
    output: {
        path: resolve(__dirname, 'dist'),
        filanem: 'fileselect.bundle.js'
    },
    resolve: {
        //set the default extensions
        extensions: ['', '.js', '.jsx', '.styl']
    },
    module: {
        loaders: [
            //load css files
            { test: /\.css$/, loader: "style!css" },
            //load stylus files
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
        ]
    }


};
