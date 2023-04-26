import { Command } from 'commander'
import { getDefaultConfig, getPackageJson } from './helper.js'
import { Config } from './types/index.js'
import { join, resolve } from 'path'
import { getDirname } from './utils.js'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'

const generate = (program: Command) => {
  const { version } = getPackageJson()
  const config = getDefaultConfig()
  program
    .command('generate', { isDefault: true })
    .description('generate the basic structure of a component/hook based on the --type option.')
    .alias('g')
    .version(version, '-v, --version', 'output the current version')
    .argument('<name>')
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
    .action((name, options) => generateAction(name, options, config))

  return program
}

const generateAction = (name: string, options: Config, config: Config) => {
  const dirname = getDirname()

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

export default generate
