#!/usr/bin/env node

import yargs from 'yargs/yargs'

import * as commands from './commands'

yargs(process.argv.slice(2))
  .scriptName('8080-emu')
  .usage('$0 <cmd> [args]')
  .command('decompile [file]', 'decompile', yargs => {
    yargs.positional('file', {
      type: 'string',
      describe: 'the file to decompile'
    })
  }, (argv) => {
    const file = argv.file as string
    commands.decompile(file)
  })
  .command('execute [file]', 'execute', yargs => {
    yargs.positional('file', {
      type: 'string',
      describe: 'the file to execute'
    })
  }, (argv) => {
    const file = argv.file as string
    commands.execute(file)
  })
  .help()
  .argv