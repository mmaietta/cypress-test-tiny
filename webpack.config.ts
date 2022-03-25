import { resolve } from 'path'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

const { VueLoaderPlugin } = require('vue-loader')

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

// tslint:disable-next-line: no-big-function
export function commonConfig (): Configuration {
  const mode = 'development'
  return {
    // devServer: {
    //   port: 9999,
    //   host: "0.0.0.0",
    //   static: __dirname,
    //   // hot: true,
    //   // https: {
    //   //   cert: "./cert.crt",
    //   //   key: "./key.pem"
    //   // }
    // } as WebpackDevServerConfiguration,
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        // this will apply to both plain `.js` files
        // AND `<script>` blocks in `.vue` files
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        // this will apply to both plain `.css` files
        // AND `<style>` blocks in `.vue` files
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader"
        }
      ]
    },
    resolve: {
      extensions: [".vue", ".js"]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  };
}

const sassLoaders = (debugMode: boolean, cssOptions: any) => {
  return [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        esModule: false,
        ...cssOptions
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: resolve(__dirname, "node_modules/@upwork/styles-base/postcss.config.js"),
        },
      }
    },
    'resolve-url-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true, // `true` needed for `resolve-url-loader`
        sassOptions: {
          compass: true,
          bundleExec: true,
          style: debugMode ? 'expanded' : 'compressed',
          sourceComments: debugMode,
          includePaths: [
            'redux/src',
            'redux/src/view',
            'node_modules/',
            'node_modules/@upwork/styles-base',
            'node_modules/@upwork/fonts-global/src',
            'node_modules/@upwork/ui-components/src/styles/globals',
            'node_modules/@upwork/ui-components/src/styles/assets',
            'node_modules/@upwork/ui-components/src/styles/themes',
            'styles/sass',
            'assets',
            'redux/assets/images',
            'node_modules/compass-mixins/lib'
          ].map(item => resolve(__dirname, item))
        }
      }
    }
  ]
}