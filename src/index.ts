#!/usr/bin/env node
import { Command } from 'commander'
import generate from './generate.js'
import init from './init.js'

const program = new Command('new-structure')

generate(program)
init(program)

program.parse(process.argv)

export { Config } from './types/index.js'
