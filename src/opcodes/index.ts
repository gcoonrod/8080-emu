import { OpExecute, State8080, UnimplementedInstruction } from '../cpu'
import { opcodes } from './map'

export type OpCodeSize = 1 | 2 | 3

export class OpCode {
  name: string
  code: number
  size: OpCodeSize
  executeFn: OpExecute

  constructor(name: string, code: number, size: OpCodeSize = 1) {
    this.name = name
    this.code = code
    this.size = size
    this.executeFn = UnimplementedInstruction
  }

  setExecute(opExecute: OpExecute) {
    this.executeFn = opExecute
  }

  execute(state: State8080) {
    return this.executeFn(state)
  }

  toString() {
    return `[${this.name}]`
  }
}

const codeToOpMap: Map<number, OpCode> = new Map()
const nameToCodeMap: Map<string, OpCode> = new Map()

for (const [name, attrs] of Object.entries(opcodes)) {
  const opCode = new OpCode(name, attrs[0], attrs[1])
  if (attrs[2]) {
    opCode.setExecute(attrs[2])
  }
  codeToOpMap.set(opCode.code, opCode)
  nameToCodeMap.set(name, opCode)
}

export const lookup = (code: number): OpCode | undefined => {
  return codeToOpMap.get(code)
}