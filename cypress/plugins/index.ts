import { startDevServer } from '@cypress/webpack-dev-server'
import * as webpack from '../../webpack.config'
import webpackPreprocessor from '@cypress/webpack-preprocessor'
import { Configuration } from 'webpack'
const webpackConfig: Configuration = webpack.commonConfig()

export default (on: any, config: any) => {
  on('dev-server:start', (options: any) =>
    startDevServer({
      options,
      webpackConfig,
    })
  )
  on('file:preprocessor', webpackPreprocessor({
      webpackOptions: webpackConfig
    })
  )

  return config
}
