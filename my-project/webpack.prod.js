const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack');
// const TerserPlugin = require("terser-webpack-plugin");
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const PATHS = {
    src: path.join(__dirname, 'src')
}

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];

            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inlineSource: '.css$',
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = smp.wrap({
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                include: path.resolve("src"),
                use: [
                    // {
                    //     loader: 'thread-loader',
                    //     options: {
                    //         workers: 3
                    //     }
                    // },
                    // 'babel-loader',
                    'happypack/loader',
                    // 'eslint-loader'
                ]
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
        //             global: 'React',
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
        //             global: 'ReactDOM',
        //         },
        //     ]
        // }),
        new FriendlyErrorsWebpackPlugin(),
        function () {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors &&
                    stats.compilation.errors.length &&
                    process.argv.indexOf('--watch') == -1) {
                    console.log('凯小默测试一下：build error');
                    process.exit(1);
                }
            })
        },
        // new BundleAnalyzerPlugin(),
        new HappyPack({
            // 3) re-add the loaders you replaced above in #1:
            // loaders: ['babel-loader?cacheDirectory=true']
            loaders: ['babel-loader']
        }),
        // new webpack.DllReferencePlugin({
        //     manifest: require("./build/library/library.json")
        // })
        // new HardSourceWebpackPlugin()
        // 路径需要的是绝对路径，多页面需要传递数组，通过 glob 找到符合路径下面的所有的都匹配出来
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
    ].concat(htmlWebpackPlugins),
    // optimization: {
    //   splitChunks: {
    //     minSize: 0,
    //     cacheGroups: {
    //       commons: {
    //         name: 'commons',
    //         chunks: 'all',
    //         minChunks: 2
    //       }
    //     }
    //   }
    // },
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             parallel: true,
    //             cache: true
    //         }),
    //     ],
    // },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
        },
        extensions: ['.js'], // 表示在 import 文件时文件后缀名可以不写
        mainFields: ['main'], // 当从 npm 包中导入模块时，此选项将决定在 package.json 中使用哪个字段导入模块。
    }
    // stats: 'errors-only'
});