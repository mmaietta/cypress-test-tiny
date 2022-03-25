import { startDevServer } from '@cypress/webpack-dev-server'
import * as webpack from '../../webpack.config'
import webpackPreprocessor from '@cypress/webpack-preprocessor'
import { Configuration } from 'webpack'
const newLocal = webpack.commonConfig()

const webpackConfig: Configuration = {
  ...newLocal,
  devServer: {
    ...newLocal,
    https: false
  }
}

export default (on: any, config: any) => {
  on('dev-server:start', (options: any) =>
    startDevServer({
      options,
      webpackConfig,
      // template: './template.html'
    })
  )
  on('file:preprocessor', webpackPreprocessor({
      webpackOptions: webpackConfig
    })
  )
  on('before:browser:launch', (browser: any, launchOptions: any) => {
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--disable-gpu')
      return launchOptions
    }
  })

  return config
}
