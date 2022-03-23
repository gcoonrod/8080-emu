import { OpExecute, State8080 } from "../cpu";

const getOpData = (state: State8080) => {
  return [
    state.memory[state.pc.get()], 
    state.memory[state.pc.get() + 1], 
    state.memory[state.pc.get() + 2]
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

const updateLogicFlagsA = (state: State8080) => {
  state.cc.cy = 0
  state.cc.ac = 0
  state.cc.z = (state.a.get() === 0) ? 1:0
  state.cc.s = (0x80 === (state.a.get() & 0x80)) ? 1:0
  state.cc.p = parity(state.a.get(), 8)
}

const addUpdateState = (state: State8080, answer: number) => {
  state.cc.z = ((answer & 0xff) === 0) ? 1:0
  state.cc.s = ((answer & 0x80) !== 0) ? 1:0
  state.cc.cy = (answer > 0xff) ? 1:0
  state.cc.p = parity(answer & 0xff, 8)
  state.a.set(answer & 0xff)
  state.pc.add(1)
}

// 0x00
export const NOP: OpExecute = (state) => {
  state.pc.add(1)
  return state
}

// 0x01
export const LXI_B: OpExecute = (state) => {
  const newState = {...state}
  const op = getOpData(state)
  newState.c.set(op[1])
  newState.b.set(op[2])
  newState.pc.add(2)

  return newState
}

// 0x31
export const LXI_SP: OpExecute = (state) => {
  const op = getOpData(state)
  state.sp.set((op[2] << 8) | op[1])
  state.pc.set(3)
  return state
}

// 0x09
export const DAD_B: OpExecute = (state) => {
  const hl = (state.h.get() << 8) | state.l.get()
  const bc = (state.b.get() << 8) | state.c.get()
  const result = hl + bc
  state.h.set((result & 0xff00) >> 8)
  state.l.set(result & 0xff)
  state.cc.cy = ((result & 0xffff0000) > 0) ? 1:0
  state.pc.add(1)
  return state
}

// 0x19
export const DAD_D: OpExecute = (state) => {
  const hl = (state.h.get() << 8) | state.l.get()
  const de = (state.d.get() << 8) | state.d.get()
  const result = hl + de
  state.h.set((result & 0xff00) >> 8)
  state.l.set(result & 0xff)
  state.cc.cy = ((result & 0xffff0000) > 0) ? 1:0
  state.pc.add(1)
  return state
}

export const DAD_H: OpExecute = (state) => {
  const hl = (state.h.get() << 8) | state.l.get()
  const result = hl + hl
  state.h.set((result & 0xff00) >> 8)
  state.l.set(result & 0xff)
  state.cc.cy = ((result & 0xffff000) !== 0) ? 1:0
  state.pc.add(1)
  return state
}

// 0x0D
export const DCR_C: OpExecute = (state) => {
  const result = state.c.get() - 1
  state.cc.z = (result === 0) ? 1:0
  state.cc.s = (0x80 === (result & 0x80)) ? 1:0
  state.cc.p = parity(result, 8)
  state.c.dec(1)
  state.pc.add(1)
  return state
}

// 0x0E
export const MVI_C: OpExecute = (state) => {
  const data = getOpData(state)
  state.c.set(data[1])
  state.pc.add(2)
  return state
}

// 0x26
export const MVI_H: OpExecute = (state) => {
  state.l.add(1)
  if (state.l.get() === 0) {
    state.h.add(1)
  }
  state.pc.add(1)
  return state
}

// 0x36
export const MVI_M: OpExecute = (state) => {
  const data = getOpData(state)
  const offset = (state.h.get() << 8) | state.l.get()
  state.memory[offset] = data[1]
  state.pc.add(2)
  return state
}

// 0x11
export const LXI_D: OpExecute = (state) => {
  const data = getOpData(state)
  state.e.set(data[1])
  state.d.set(data[2])
  state.pc.add(3)
  return state
}

// 0x21
export const LXI_H: OpExecute = (state) => {
  const data = getOpData(state)
  state.l.set(data[1])
  state.h.set(data[2])
  state.pc.add(3)
  return state
}

// 0x1A
export const LDAX_D: OpExecute = (state) => {
  const offset = (state.d.get() << 8) | state.e.get()
  state.a.set(state.memory[offset])
  state.pc.add(1)
  return state
}

// 0x3A
export const LDA: OpExecute = (state) => {
  const data = getOpData(state)
  const offset = (data[2] << 8) | data[1]
  state.a.set(state.memory[offset])
  state.pc.add(3)
  return state
}

//0xC3
export const JMPa: OpExecute = (state) => {
  const op = getOpData(state)
  state.pc.set((op[2] << 8) | op[1])
  return state
}

// 0xC2
export const JNZa: OpExecute = (state) => {
  if (state.cc.z === 1) {
    state.pc.add(2)
    return state
  }
  const data = getOpData(state)
  state.pc.set((data[2] << 8) | data[1])
  return state
}

// 0xCD
export const CALLa: OpExecute = (state) => {
  const ret = state.pc.get() + 2
  const data = getOpData(state)
  state.memory[state.sp.get() - 1] = (ret >> 8) & 0xff
  state.memory[state.sp.get() - 2] = (ret & 0xff)
  state.sp.dec(2)
  state.pc.set((data[2] << 8) | data[1])
  return state
}

// 0xC9
export const RET: OpExecute = (state) => {
  state.pc.set(state.memory[state.sp.get()] | (state.memory[state.sp.get() + 1] << 8))
  state.sp.add(2)
  return state
}

// 0x05
export const DCR_B: OpExecute = (state) => {
  state.b.dec(1)
  const result = state.b.get()
  state.cc.z = (result === 0) ? 1:0
  state.cc.s = (0x80 === (result & 0x80)) ? 1:0
  state.cc.p = parity(result, 8)
  state.pc.add(1)
  return state
}

// 0x32
export const STA: OpExecute = (state) => {
  const data = getOpData(state)
  const offset = (data[2] << 8) | data[1]
  state.memory[offset] = state.a.get()
  state.pc.add(3)
  return state
}

//0x80
export const ADD_B: OpExecute = (state) => {
  const answer = state.a.get() + state.b.get();
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

  state.a.set(answer & 0xff)
  state.pc.add(1)
  return state
}

// 0x81
export const ADD_C: OpExecute = (state) => {
  const answer = state.a.get() + state.c.get()
  addUpdateState(state, answer)
  return state
}

// 0xC6
export const ADI_D8: OpExecute = (state) => {
  const data = state.memory[state.pc.get() + 1]
  const answer = state.a.get() + data
  addUpdateState(state, answer)
  return state
}

// 0x86
export const ADD_M: OpExecute = (state) => {
  const offset = (state.h.get() << 8) | state.l.get()
  const answer = state.a.get() + state.memory[offset]
  addUpdateState(state, answer)
  return state
}

// 0x24
export const INR_H: OpExecute = (state) => {
  state.h.add(1)
  state.cc.z = ((state.h.get() & 0xff) === 0) ? 1:0
  state.cc.s = ((state.h.get() & 0x80) !== 0) ? 1:0
  state.cc.p = parity(state.h.get() & 0xff, 8)
  // TODO AC calc
  state.pc.add(1)
  return state
}

// 0x13
export const INX_D: OpExecute = (state) => {
  state.e.add(1)
  if (state.e.get() === 0) {
    state.d.add(1)
  }
  state.pc.add(1)
  return state
}

// 0x23
export const INX_H: OpExecute = (state) => {
  state.l.add(1)
  if (state.l.get() === 0) {
    state.h.add(1)
  }
  state.pc.add(1)
  return state
}

// 0x2F
export const CMA: OpExecute = (state) => {
  state.a.set(~state.a)
  state.pc.add(1)
  return state
}

// 0xE6
export const ANI_D8: OpExecute = (state) => {
  const data = getOpData(state)
  const x = state.a.get() & data[1]
  state.cc.z = (x === 0) ? 1:0
  state.cc.s = (0x80 === (x & 0x80)) ? 1:0
  state.cc.p = parity(x, 8)
  state.cc.cy = 0
  state.a.set(x)
  state.pc.add(2)
  return state
}

// 0x0F
export const RRC: OpExecute = (state) => {
  const x = state.a.get()
  state.a.set(((x & 1) << 7) | (x >> 1))
  state.cc.cy = (1 === (x & 1)) ? 1:0
  state.pc.add(1)
  return state
}

// 0x1F
export const RAR: OpExecute = (state) => {
  const x = state.a.get()
  state.a.set((state.cc.cy << 7) | (x >> 1))
  state.cc.cy = (1 === (x & 1)) ? 1:0
  state.pc.add(1)
  return state
}

// OxFE
export const CPI_D8: OpExecute = (state) => {
  const data = getOpData(state)
  const x = state.a.get() - data[1]
  state.cc.z = (x === 0) ? 1:0
  state.cc.s = (0x80 === (x & 0x80)) ? 1:0
  state.cc.p = parity(x, 8)
  state.cc.cy = (state.a.get() < data[1]) ? 1:0
  state.pc.add(2)
  return state
}

// 0x76
export const HLT: OpExecute = (state) => {
  console.log('HALT')
  process.exit(0)
}

// 0xDB
export const IN_D8: OpExecute = (state) => {
  state.pc.add(2)
  return state
}

// 0xD3
export const OUT_D8: OpExecute = (state) => {
  state.pc.add(2)
  return state
}

// 0xC1
export const POP_B: OpExecute = (state) => {
  state.c.set(state.memory[state.sp.get()])
  state.b.set(state.memory[state.sp.get() + 1])
  state.sp.add(2)
  state.pc.add(1)
  return state
}

// 0xD1
export const POP_D: OpExecute = (state) => {
  state.e.set(state.memory[state.sp.get()])
  state.d.set(state.memory[state.sp.get() + 1])
  state.sp.add(2)
  state.pc.add(1)
  return state
}

// 0xE1
export const POP_H: OpExecute = (state) => {
  state.l.set(state.memory[state.sp.get()])
  state.h.set(state.memory[state.sp.get() + 1])
  state.sp.add(2)
  state.pc.add(1)
  return state
}

// 0xC5
export const PUSH_B: OpExecute = (state) => {
  state.memory[state.sp.get() - 1] = state.b.get()
  state.memory[state.sp.get() - 2] = state.c.get()
  state.sp.dec(2)
  state.pc.add(1)
  return state
}

// 0xD5
export const PUSH_D: OpExecute = (state) => {
  state.memory[state.sp.get() - 1] = state.d.get()
  state.memory[state.sp.get() - 2] = state.e.get()
  state.sp.dec(2)
  state.pc.add(1)
  return state
}

// 0xE5
export const PUSH_H: OpExecute = (state) => {
  state.memory[state.sp.get() - 1] = state.h.get()
  state.memory[state.sp.get() - 2] = state.l.get()
  state.sp.dec(2)
  state.pc.add(1)
  return state
}

// 0xF1
export const POP_PSW: OpExecute = (state) => {
  state.a.set(state.memory[state.sp.get() + 1])
  const psw = state.memory[state.sp.get()]
  state.cc.z = (0x01 === (psw & 0x01)) ? 1:0
  state.cc.s = (0x02 === (psw & 0x02)) ? 1:0
  state.cc.p = (0x04 === (psw & 0x04)) ? 1:0
  state.cc.cy = (0x05 === (psw & 0x08)) ? 1:0
  state.cc.ac = (0x10 === (psw & 0x10)) ? 1:0
  state.sp.add(2)
  state.pc.add(1)
  return state
}

// 0xF5
export const PUSH_PSW: OpExecute = (state) => {
  state.memory[state.sp.get() - 1] = state.a.get()
  const psw = (
    state.cc.z |
    state.cc.s << 1 |
    state.cc.p << 2 |
    state.cc.cy << 3 |
    state.cc.ac << 4
  )
  state.memory[state.sp.get() - 2] = psw
  state.sp.dec(2)
  state.pc.add(1)
  return state
}

//0x06
export const MVI_B: OpExecute = (state) => {
  const data = getOpData(state)
  state.b.set(data[1])
  state.pc.add(2)
  return state
}

// 0x3E
export const MVI_A: OpExecute = (state) => {
  const data = getOpData(state)
  state.a.set(data[1])
  state.pc.add(2)
  return state
}

// 0x77
export const MOV_MA: OpExecute = (state) => {
  const offset = (state.h.get() << 8) | state.l.get()
  state.memory[offset] = state.a.get()
  state.pc.add(1)
  return state
}

// 0x56
export const MOV_DM: OpExecute = (state) => {
  const offset = (state.h.get() << 8) | state.l.get()
  state.d.set(state.memory[offset])
  state.pc.add(1)
  return state
}

// 0x5E
export const MOV_EM: OpExecute = (state) => {
  const offset = (state.h.get() << 8) | state.l.get()
  state.e.set(state.memory[offset])
  state.pc.add(1)
  return state
}

// 0x66
export const MOV_HM: OpExecute = (state) => {
  const offset = (state.h.get() << 8) | state.l.get()
  state.h.set(state.memory[offset])
  state.pc.add(1)
  return state
}

// 0x7E
export const MOV_AM: OpExecute = (state) => {
  const offset = (state.h.get() << 8) | state.l.get()
  state.a.set(state.memory[offset])
  state.pc.add(1)
  return state
}

// 0x7A
export const MOV_DA: OpExecute = (state) => {
  state.a = state.d
  state.pc.add(1)
  return state
}

// 0x7B
export const MOV_EA: OpExecute = (state) => {
  state.a = state.e
  state.pc.add(1)
  return state
}

// 0x7C
export const MOV_HA: OpExecute = (state) => {
  state.a.set(state.h.get())
  state.pc.add(1)
  return state
}

// 0xA7
export const ANA_A: OpExecute = (state) => {
  state.a.set(state.a.get() & state.a.get())
  updateLogicFlagsA(state)
  state.pc.add(1)
  return state
}

// 0xAF
export const XRA_A: OpExecute = (state) => {
  state.a.set(state.a.get() ^ state.a.get())
  updateLogicFlagsA(state)
  state.pc.add(1)
  return state
}

// 0xEB
export const XCHG: OpExecute = (state) => {
  const d = state.d.get()
  const e = state.e.get()
  state.d.set(state.h.get())
  state.e.set(state.l.get())
  state.h.set(d)
  state.l.set(e)
  state.pc.add(1)
  return state
}

// 0xFB
export const EI: OpExecute = (state) => {
  state.intEnable = 1
  state.pc.add(1)
  return state
}