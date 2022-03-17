import { readFile } from 'fs/promises'
import { DefaultCondition, Emulate8080Op, State8080 } from '../cpu'

export const execute = async (file: string) => {
  const contents = await readFile(file, { encoding: 'hex' })
  const buffer = Buffer.from(contents, 'hex')

  let state: State8080 = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    h: 0,
    l: 0,
    sp: 0,
    pc: 0,
    memory: Array.from(buffer),
    cc: DefaultCondition,
    intEnable: 0
  }

  let run = true
  while(run) {
    state = Emulate8080Op(state)
  }
}