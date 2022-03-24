#!/usr/bin/env node

import yargs from 'yargs/yargs'

yargs(process.argv.slice(2))
  .scriptName('8080-emu')
  .usage('$0 <cmd> [args]')
  .help()
  .argv