#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { program } from 'commander'
import { type Config } from './types/index.js'
import { COMPONENT_DIR, DEFAULT_CONFIGS, HOOK_DIR } from './constants.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const newStructure = async () => {
  program
    .arguments('<name>')
    .option(
      '-l, --lang <language>',
      'Which language to use (default: "ts")',
      DEFAULT_CONFIGS.lang
    )
    .option(
      '-t, --type <structureType>',
      'structure type (default: comp(component))',
      DEFAULT_CONFIGS.type
    )
    .parse(process.argv)

  const [name] = program.args

  const options = program.opts<Config>()
  const lang = options.lang
  const structureType = options.type
  const dir = (() => {
    switch (structureType) {
      case 'comp':
        return COMPONENT_DIR
      case 'hook':
        return HOOK_DIR
    }
  })()!

  const indexExtension = lang === 'js' ? 'js' : 'ts'
  const fileExtension =
    structureType === 'comp' ? (lang === 'js' ? 'jsx' : 'tsx') : indexExtension

  const templatePath = join(__dirname, `../templates/${structureType}/${lang}`)

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
