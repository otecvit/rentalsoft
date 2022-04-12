var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[hash]-[name].[ext]',
                        },
                    },
                ],
            },

        ]
    },
    output: {
        publicPath: '/'
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'dist'),
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://crm.mirprokata.by/api_v2'
        })
    }
}