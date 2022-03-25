import { Operation } from ".";
import { Flag8080, Register8080 } from "../cpu";

export const PUSH_B: Operation = {
  name: 'PUSH B',
  opcode: 0xc5,
  size: 1,
  execute() {
    const B = this.getRegisterValue(Register8080.B)
    const C = this.getRegisterValue(Register8080.C)
    const SP = this.getRegisterValue(Register8080.SP)
    this.setMemoryAt(SP - 1, B)
    this.setMemoryAt(SP - 2, C)
    this.setRegisterValue(Register8080.SP, SP - 2)
  }
}

export const PUSH_D: Operation = {
  name: 'PUSH D',
  opcode: 0xd5,
  size: 1,
  execute() {
    const D = this.getRegisterValue(Register8080.D)
    const E = this.getRegisterValue(Register8080.E)
    const SP = this.getRegisterValue(Register8080.SP)
    this.setMemoryAt(SP - 1, D)
    this.setMemoryAt(SP - 2, E)
    this.setRegisterValue(Register8080.SP, SP - 2)
  }
}

export const PUSH_H: Operation = {
  name: 'PUSH H',
  opcode: 0xe5,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    const L = this.getRegisterValue(Register8080.L)
    const SP = this.getRegisterValue(Register8080.SP)
    this.setMemoryAt(SP - 1, H)
    this.setMemoryAt(SP - 2, L)
    this.setRegisterValue(Register8080.SP, SP - 2)
  }
}

export const PUSH_PSW: Operation = {
  name: 'PUSH PSW',
  opcode: 0xf5,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const SP = this.getRegisterValue(Register8080.SP)
    const S = this.getFlagValue(Flag8080.S)
    const Z = this.getFlagValue(Flag8080.Z)
    const AC = this.getFlagValue(Flag8080.AC)
    const P = this.getFlagValue(Flag8080.P)
    const CY = this.getFlagValue(Flag8080.CY)
    // TODO use bitwise ops instead of string parsing
    const pswStr = `${S}${Z}0${AC}0${P}1${CY}`
    const psw = parseInt(pswStr, 2)
    this.setMemoryAt(SP - 1, A)
    this.setMemoryAt(SP - 2, psw)
    this.setRegisterValue(Register8080.SP, SP - 2)
  }
}

export const POP_B: Operation = {
  name: 'POP B',
  opcode: 0xc1,
  size: 1,
  execute() {
    const SP = this.getRegisterValue(Register8080.SP)
    const memSP = this.getMemoryAt(SP)
    const memSP1 = this.getMemoryAt(SP + 1)
    this.setRegisterValue(Register8080.C, memSP)
    this.setRegisterValue(Register8080.B, memSP1)
    this.setRegisterValue(Register8080.SP, SP + 2)
  }
}

export const POP_D: Operation = {
  name: 'POP D',
  opcode: 0xd1,
  size: 1,
  execute() {
    const SP = this.getRegisterValue(Register8080.SP)
    const memSP = this.getMemoryAt(SP)
    const memSP1 = this.getMemoryAt(SP + 1)
    this.setRegisterValue(Register8080.D, memSP)
    this.setRegisterValue(Register8080.E, memSP1)
    this.setRegisterValue(Register8080.SP, SP + 2)
  }
}

export const POP_H: Operation = {
  name: 'POP H',
  opcode: 0xe1,
  size: 1,
  execute() {
    const SP = this.getRegisterValue(Register8080.SP)
    const memSP = this.getMemoryAt(SP)
    const memSP1 = this.getMemoryAt(SP + 1)
    this.setRegisterValue(Register8080.H, memSP)
    this.setRegisterValue(Register8080.L, memSP1)
    this.setRegisterValue(Register8080.SP, SP + 2)
  }
}

/*
  Flag Word
  7 6 5 4   3 2 1 0
  S Z 0 AC  0 P 1 CY
*/

export const POP_PSW: Operation = {
  name: 'POP PSW',
  opcode: 0xf1,
  size: 1,
  execute() {
    const SP = this.getRegisterValue(Register8080.SP)
    const memSP = this.getMemoryAt(SP)
    const memSP1 = this.getMemoryAt(SP + 1)
    this.setRegisterValue(Register8080.A, memSP1)
    this.setFlag(Flag8080.CY, (memSP & 0b00000001) === 1)
    this.setFlag(Flag8080.P, ((memSP & 0b00000100) >> 3) === 1)
    this.setFlag(Flag8080.AC, ((memSP & 0b00010000) >> 5) === 1)
    this.setFlag(Flag8080.Z, ((memSP & 0b01000000) >> 7) === 1)
    this.setFlag(Flag8080.S, ((memSP & 0b10000000) >> 8) === 1)
    this.setRegisterValue(Register8080.SP, SP + 2)
  }
}

export const XTHL: Operation = {
  name: 'XTHL',
  opcode: 0xe3,
  size: 1,
  execute () {
    const H = this.getRegisterValue(Register8080.H)
    const L = this.getRegisterValue(Register8080.L)
    const SP = this.getRegisterValue(Register8080.SP)
    const memSP = this.getMemoryAt(SP)
    const memSP1 = this.getMemoryAt(SP + 1)
    this.setMemoryAt(SP, L)
    this.setMemoryAt(SP + 1, H)
    this.setRegisterValue(Register8080.L, memSP)
    this.setRegisterValue(Register8080.H, memSP1)
  }
}

export const SPHL: Operation = {
  name: 'SPHL',
  opcode: 0xf9,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.SP, (H << 8) | L)
  }
}