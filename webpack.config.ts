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
