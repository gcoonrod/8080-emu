#!/usr/bin/env node

import yargs from 'yargs/yargs'

import path from "path";
import { disassemble } from "./commands/disassemble";
import { CPUDiag } from "./emulator/cpudiag";
import { Invaders } from "./emulator/invaders";
import { ExecutionOptions } from './emulator';

yargs(process.argv.slice(2))
  .scriptName('8080-emu')
  .usage('$0 <cmd> [emulator] [options]')
  .command('run [emulator]', '', yargs => {
    yargs
      .positional('emulator', {
        type: 'string',
        default: 'cpudiag'
      })
      .option('D', {
        alias: 'debug',
        type: 'boolean',
        default: false
      })

  }, function (argv) {
    const emulator = argv.emulator ?? 'cpudiag'
    const options: ExecutionOptions = {
      debug: argv.debug as boolean ?? false
    }
    switch(emulator) {
      case 'invaders':
        Invaders.run(options)
        break;
      case 'cpudiag':
        CPUDiag.run(options)
        break;
    }
  })
  .argv