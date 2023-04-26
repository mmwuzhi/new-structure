import { DEFAULT_CONFIGS } from './constants.js'
import { Config } from './types/index.js'
import { getConfig, require } from './utils.js'

export const getPackageJson = () => require('../package.json')

export const getDefaultConfig = () => {
  const { name: moduleName } = getPackageJson()
  const config = getConfig<Config>(DEFAULT_CONFIGS, moduleName)

  return config
}
