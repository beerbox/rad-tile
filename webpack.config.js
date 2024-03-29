const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'rad-tile-bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    }
 
}