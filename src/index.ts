#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { program } from 'commander'
import { DEFAULT_CONFIGS } from './constants.js'
import { getConfig, getDirname, require } from './utils.js'

export interface Config {
  lang: 'ts' | 'js'
  type: 'comp' | 'hook'
  componentDir: string
  hookDir: string
}

const newStructure = async () => {
  const dirname = getDirname()
  const packageFile = require('../package.json')
  const { version, name: moduleName } = packageFile
  const config = getConfig<Config>(DEFAULT_CONFIGS, moduleName)

  program
    .version(version, '-v, --version', 'output the current version')
    .arguments('<name>')
    .option(
      '-l, --lang <language>',
      'Which language to use (default: "ts")',
      config.lang,
    )
    .option(
      '-t, --type <structureType>',
      'structure type (default: comp(component))',
      config.type,
    )
    .parse(process.argv)

  const [name] = program.args

  const options = program.opts<Config>()
  const lang = options.lang
  const structureType = options.type

  const dir = structureType === 'hook' ? config.hookDir : config.componentDir
  const indexExtension = lang === 'js' ? 'js' : 'ts'
  const fileExtension =
    structureType === 'hook' ? indexExtension : lang === 'js' ? 'jsx' : 'tsx'

  const templatePath = join(dirname, `../templates/${structureType}/${lang}`)

  const componentDir = `${dir}/${name}`
  const filePath = `${componentDir}/${name}.${fileExtension}`
  const indexPath = `${componentDir}/index.${indexExtension}`

  const indexTemplate = `\
export * from './${name}'
export { default } from './${name}';
`
  const language = lang === 'js' ? 'javascript' : 'typescript'
  const type = structureType === 'hook' ? 'hook' : 'component'

  console.info(`
structure name: ${name}
structure type: ${type}
dir: ${componentDir}
lang: ${language}
  `)

  if (!name) {
    console.info('Error: need a <name>')
    process.exit(0)
  }

  const fullPathToParentDir = resolve(dir)

  if (!existsSync(fullPathToParentDir)) {
    mkdirSync(dir)
  }

  const fullPathToComponentDir = resolve(componentDir)
  if (existsSync(fullPathToComponentDir)) {
    console.info('this structure is already exists')
    process.exit(0)
  }
  try {
    mkdirSync(componentDir)
    const template = readFileSync(templatePath, 'utf-8')
    console.info('dir created')

    const replacedTemplate = template.replace(/STRUCTURE_NAME/g, name)
    writeFileSync(filePath, replacedTemplate)
    console.info('main file created')

    writeFileSync(indexPath, indexTemplate)
    console.info('index file created')
    console.info('all created')
  } catch (err) {
    console.error(err)
  }
}

newStructure()
