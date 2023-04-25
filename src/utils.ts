import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { cosmiconfigSync } from 'cosmiconfig'
import { createRequire } from 'module'

export const getDirname = () => dirname(fileURLToPath(import.meta.url))

export const require = createRequire(import.meta.url)

export const getConfig = <T extends object>(
  defaultConfig: T,
  moduleName: string,
): T => {
  const config: T | undefined = cosmiconfigSync(moduleName).search()?.config

  return { ...defaultConfig, ...config }
}
