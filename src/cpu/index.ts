import { lookup, OpCode } from "../opcodes"

export type ConditionCodes = {
  z: number
  s: number
  p: number
  cy: number
  ac: number
  pad: number
}

export const DefaultCondition: ConditionCodes = {
  z: 1,
  s: 1,
  p: 1,
  cy: 1,
  ac: 1,
  pad: 3
}

export type State8080 = {
  a: number
  b: number
  c: number
  d: number
  e: number
  h: number
  l: number
  sp: number
  pc: number
  memory: number[]
  cc: ConditionCodes
  intEnable: number
}

export type OpExecute = (state: State8080) => State8080

const printState = (state: State8080, op?: OpCode) => {
  let message = `PC=0x${state.pc.toString(16)} SP=0x${state.sp.toString(16)}`
  if (op) {
    let data = ''
    if (op.size === 2) {
      data = state.memory[state.pc + 1].toString(16)
    }
    if (op.size === 3) {
      data = `${state.memory[state.pc + 2].toString(16)}${state.memory[state.pc + 1].toString(16)}`
    }
    message += ` OP=0x${op.code.toString(16)} LABEL=${op.name} DATA=0x${data}`
  }
  console.log(message)
}

const printFlags = (state: State8080) => {
  console.log(`Z=${state.cc.z} S=${state.cc.s} P=${state.cc.p} CY=${state.cc.cy} AC=${state.cc.ac} PAD=${state.cc.pad}`)
}

export const UnimplementedInstruction = (state: State8080) => {
  throw new Error('Unimplemented Instruction')
}

export const Emulate8080Op = (state: State8080) => {
  const opByte = state.memory[state.pc]
  const opCode = lookup(opByte)
  printState(state, opCode)
  printFlags(state)
  const newState = opCode?.execute(state)
  if (newState) {
    return newState
  } else {
    console.log('Uh oh')
    process.exit(-1)
  }
}