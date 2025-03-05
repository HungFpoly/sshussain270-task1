const path = require("path");

module.exports = {
    entry: "./app.ts",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    mode: "development",
    devServer: {
        static: "./",
        open: true
    },
    watchOptions: {
        ignored: /node_modules/, // Bỏ qua node_modules
        aggregateTimeout: 300, // Giảm số lần theo dõi
        poll: 1000 // Kiểm tra file mỗi giây
      }
      
};
