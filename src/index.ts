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
    .option('debug', {
      alias: 'D',
      boolean: true,
      default: false
    })
  }, (argv) => {
    const file = argv.file as string
    const options = {
      debug: argv.debug as boolean
    }
    commands.execute(file, options)
  })
  .command('debugger [file]', 'debugger', yargs => {
    yargs.positional('file', {
      type: 'string',
      describe: 'the file to debug'
    })
  }, (argv) => {
    const file = argv.file as string
    commands.debug(file)
  })
  .help()
  .argv