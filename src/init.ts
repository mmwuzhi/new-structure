import { Command } from 'commander'
import { copyFileSync } from 'fs'
import { getDirname } from './utils.js'
import { join } from 'path'

const init = (program: Command) => {
  program
    .command('init')
    .description('create a default config file.')
    .alias('i')
    .action(copyConfigFile)

  return program
}

const copyConfigFile = () => {
  try {
    const dirname = getDirname()
    const configFilePath = join(dirname, '../templates/new-structure.config.js')

    copyFileSync(configFilePath, './new-structure.config.js')
  } catch (err) {
    console.error(err)
  }
}

export default init
