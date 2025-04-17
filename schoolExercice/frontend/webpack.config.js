const path = require("path");
const { BiExclude } = require("react-icons/bi");
const webpack = require("webpack");

module.exports = {
    entry : "./src/index.js",
    output: {
        path:path.resolve(__dirname, "./static/frontend"),
        filename: "[name].js",
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },

    optimization: {
        minimize: true,
    },
    plugins:[
        new webpack.DefinePlugin({
            "process.env":{
                //this has effect on the react lib size
<<<<<<< HEAD
                // NODE_ENV: JSON.stringify("production"),
                NODE_ENV: JSON.stringify("development"),
=======
                NODE_ENV: JSON.stringify("production"),
>>>>>>> ccf2c0db (Premier commit)
            },
        }),
    ],
    };