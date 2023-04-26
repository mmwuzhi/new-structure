#!/usr/bin/env node
import { Command } from 'commander'
import commanderHelp from 'commander-help'
import generate from './generate.js'
import init from './init.js'

const program = new Command('new-structure')

generate(program)
init(program)

// hide default help
program.helpInformation = () => ''

// custom help
program.on('--help', () => {
  console.log('Usage and help')
  commanderHelp(program)
})

program.parse(process.argv)

export { Config } from './types/index.js'
