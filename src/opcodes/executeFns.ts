import { OpExecute, State8080 } from "../cpu";

const getOpData = (state: State8080) => {
  return [
    state.memory[state.pc], 
    state.memory[state.pc+1], 
    state.memory[state.pc+2]
  ]
}

const parity = (x: number, size: number) => {
  let p = 0
  x = (x & ((1 << size) - 1))
  for (let i = 0; i < size; i++) {
    if (x & 0x1) {
      p++
    }
    x = x >> 1
  }
  return (0 === (p & 0x1)) ? 1:0
}

const addUpdateState = (state: State8080, answer: number) => {
  state.cc.z = ((answer & 0xff) === 0) ? 1:0
  state.cc.s = ((answer & 0x80) !== 0) ? 1:0
  state.cc.cy = (answer > 0xff) ? 1:0
  state.cc.p = parity(answer & 0xff, 8)
  state.a = answer & 0xff
  state.pc += 1
}

// 0x00
export const NOP: OpExecute = (state) => {
  state.pc +=1
  return state
}

// 0x01
export const LXI_B: OpExecute = (state) => {
  const newState = {...state}
  const op = [
    state.memory[state.pc], 
    state.memory[state.pc+1], 
    state.memory[state.pc+2]
  ]
  newState.c = op[1]
  newState.b = op[2]
  newState.pc += 2

  return newState
}

// 0x31
export const LXI_SP: OpExecute = (state) => {
  const op = [
    state.memory[state.pc], 
    state.memory[state.pc+1], 
    state.memory[state.pc+2]
  ]
  state.sp = (op[2] << 8) | op[1]
  state.pc += 3
  return state
}

// 0x11
export const LXI_D: OpExecute = (state) => {
  const data = getOpData(state)
  state.e = data[1]
  state.d = data[2]
  state.pc += 3
  return state
}

// 0x21
export const LXI_H: OpExecute = (state) => {
  const data = getOpData(state)
  state.l = data[1]
  state.h = data[2]
  state.pc += 3
  return state
}

// 0x1A
export const LDAX_D: OpExecute = (state) => {
  const offset = (state.d << 8) | state.e
  state.a = state.memory[offset]
  state.pc += 1
  return state
}

//0xC3
export const JMPa: OpExecute = (state) => {
  const newState = {...state}
  const op = [
    state.memory[state.pc], 
    state.memory[state.pc+1], 
    state.memory[state.pc+2]
  ]
  newState.pc = (op[2] << 8) | op[1]
  return newState
}

// 0xC2
export const JNZa: OpExecute = (state) => {
  if (state.cc.z === 1) {
    state.pc += 2
    return state
  }
  const data = getOpData(state)
  state.pc = (data[2] << 8) | data[1]
  return state
}

// 0xCD
export const CALLa: OpExecute = (state) => {
  const ret = state.pc + 2
  const data = getOpData(state)
  state.memory[state.sp - 1] = (ret >> 8) & 0xff
  state.memory[state.sp - 2] = (ret & 0xff)
  state.sp = state.sp - 2
  state.pc = (data[2] << 8) | data[1]
  return state
}

// 0xC9
export const RET: OpExecute = (state) => {
  state.pc = state.memory[state.sp] | (state.memory[state.sp + 1] << 8)
  state.sp += 2
  return state
}

// 0x05
export const DCR_B: OpExecute = (state) => {
  const result = state.b - 1
  state.cc.z = (result === 0) ? 1:0
  state.cc.s = (0x80 === (result & 0x80)) ? 1:0
  state.cc.p = parity(result, 8)
  state.b = result
  state.pc += 1
  return state
}

//0x80
export const ADD_B: OpExecute = (state) => {
  const answer = state.a + state.b;
  // Zero flag
  if ((answer & 0xff) === 0) {
    state.cc.z = 1
  } else {
    state.cc.z = 0
  }

  // Sign flag
  if (answer & 0x80) {
    state.cc.s = 1
  } else {
    state.cc.s = 0
  }

  // Carry flag
  if (answer > 0xff) {
    state.cc.cy = 1
  } else {
    state.cc.cy = 0
  }

  state.cc.p = parity(answer & 0xff, 8)

  state.a = answer & 0xff
  state.pc += 1
  return state
}

// 0x81
export const ADD_C: OpExecute = (state) => {
  const answer = state.a + state.c
  addUpdateState(state, answer)
  return state
}

// 0xC6
export const ADI_D8: OpExecute = (state) => {
  const data = state.memory[state.pc + 1]
  const answer = state.a + data
  addUpdateState(state, answer)
  return state
}

// 0x86
export const ADD_M: OpExecute = (state) => {
  const offset = (state.h << 8) | state.l
  const answer = state.a + state.memory[offset]
  addUpdateState(state, answer)
  return state
}

// 0x24
export const INR_H: OpExecute = (state) => {
  state.h += 1
  state.cc.z = ((state.h & 0xff) === 0) ? 1:0
  state.cc.s = ((state.h & 0x80) !== 0) ? 1:0
  state.cc.p = parity(state.h & 0xff, 8)
  // AC calc
  state.pc += 1
  return state
}

// 0x13
export const INX_D: OpExecute = (state) => {
  state.e += 1
  if (state.e === 0) {
    state.d += 1
  }
  state.pc += 1
  return state
}

// 0x23
export const INX_H: OpExecute = (state) => {
  state.l += 1
  if (state.l === 0) {
    state.h += 1
  }
  state.pc += 1
  return state
}

// 0x2F
export const CMA: OpExecute = (state) => {
  state.a = ~state.a
  state.pc += 1
  return state
}

// 0xE6
export const ANI_D8: OpExecute = (state) => {
  const data = getOpData(state)
  const x = state.a & data[1]
  state.cc.z = (x === 0) ? 1:0
  state.cc.s = (0x80 === (x & 0x80)) ? 1:0
  state.cc.p = parity(x, 8)
  state.cc.cy = 0
  state.a = x
  state.pc += 2
  return state
}

// 0x0F
export const RRC: OpExecute = (state) => {
  const x = state.a
  state.a = ((x & 1) << 7) | (x >> 1)
  state.cc.cy = (1 === (x & 1)) ? 1:0
  state.pc += 1
  return state
}

// 0x1F
export const RAR: OpExecute = (state) => {
  const x = state.a
  state.a = (state.cc.cy << 7) | (x >> 1)
  state.cc.cy = (1 === (x & 1)) ? 1:0
  state.pc += 1
  return state
}

// OxFE
export const CPI_D8: OpExecute = (state) => {
  const data = getOpData(state)
  const x = state.a - data[1]
  state.cc.z = (x === 0) ? 1:0
  state.cc.s = (0x80 === (x & 0x80)) ? 1:0
  state.cc.p = parity(x, 8)
  state.cc.cy = (state.a < data[1]) ? 1:0
  state.pc += 2
  return state
}

// 0x76
export const HLT: OpExecute = (state) => {
  console.log('HALT')
  process.exit(0)
}

// 0xDB
export const IN_D8: OpExecute = (state) => {
  state.pc += 2
  return state
}

// 0xD3
export const OUT_D8: OpExecute = (state) => {
  state.pc += 2
  return state
}

// 0xC1
export const POP_B: OpExecute = (state) => {
  state.c = state.memory[state.sp]
  state.b = state.memory[state.sp + 1]
  state.sp += 2
  state.pc += 1
  return state
}

// 0xC5
export const PUSH_B: OpExecute = (state) => {
  state.memory[state.sp - 1] = state.b
  state.memory[state.sp - 2] = state.c
  state.sp = state.sp - 2
  state.pc += 1
  return state
}

// 0xF1
export const POP_PSW: OpExecute = (state) => {
  state.a = state.memory[state.sp + 1]
  const psw = state.memory[state.sp]
  state.cc.z = (0x01 === (psw & 0x01)) ? 1:0
  state.cc.s = (0x02 === (psw & 0x02)) ? 1:0
  state.cc.p = (0x04 === (psw & 0x04)) ? 1:0
  state.cc.cy = (0x05 === (psw & 0x08)) ? 1:0
  state.cc.ac = (0x10 === (psw & 0x10)) ? 1:0
  state.sp += 2
  state.pc += 1
  return state
}

// 0xF5
export const PUSH_PSW: OpExecute = (state) => {
  state.memory[state.sp - 1] = state.a
  const psw = (
    state.cc.z |
    state.cc.s << 1 |
    state.cc.p << 2 |
    state.cc.cy << 3 |
    state.cc.ac << 4
  )
  state.memory[state.sp - 2] = psw
  state.sp = state.sp - 2
  state.pc += 1
  return state
}

//0x06
export const MVI_B: OpExecute = (state) => {
  const data = getOpData(state)
  state.b = data[1]
  state.pc += 2
  return state
}

// 0x77
export const MOV_MA: OpExecute = (state) => {
  const offset = (state.h << 8) | state.l
  state.memory[offset] = state.a
  state.pc += 1
  return state
}
