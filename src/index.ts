#!/usr/bin/env node

// import yargs from 'yargs/yargs'

import path from "path";
import { disassemble } from "./commands/disassemble";
import { Invaders } from "./emulator/invaders";

// yargs(process.argv.slice(2))
//   .scriptName('8080-emu')
//   .usage('$0 <cmd> [args]')
//   .help()
//   .argv

Invaders.run()

//disassemble(path.join(__dirname, '../roms/invaders/invaders'))