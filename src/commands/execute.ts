import { readFile } from 'fs/promises'
import { exit } from 'process'
import * as readline from 'readline'
import { DefaultCondition, Emulate8080Op, State8080 } from '../cpu'
import { getRegisterU8, getRegisterU16 } from '../cpu/register'

export type ExecuteOptions = {
  debug: boolean
}

const defaultOptions = { debug: false }
export const execute = async (file: string, options: ExecuteOptions = defaultOptions) => {
  const contents = await readFile(file, { encoding: 'hex' })
  const buffer = Buffer.from(contents, 'hex')

  let state: State8080 = {
    a: getRegisterU8(),
    b: getRegisterU8(),
    c: getRegisterU8(),
    d: getRegisterU8(),
    e: getRegisterU8(),
    h: getRegisterU8(),
    l: getRegisterU8(),
    sp: getRegisterU16(),
    pc: getRegisterU16(),
    memory: Array.from(buffer),
    cc: DefaultCondition,
    intEnable: 0
  }

  if (options.debug) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    const waitForInput = () => new Promise((resolve) => {
      rl.question(':', answer => {
        resolve(answer)
      })
    })
    while(state.pc.get() < 10) {
      state = Emulate8080Op(state)
      await waitForInput()
    }
    rl.close()
  } else {
    while(state.pc.get() < 10) {
      state = Emulate8080Op(state)
    }
  }

  exit(0)
}