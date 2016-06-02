module.exports =  {
    entry : "./app/components/Main.js",
    output : {
        filename : "dist/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude : /(node_component|bower_components)/,
                query : {
                    presets:['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    }
};
