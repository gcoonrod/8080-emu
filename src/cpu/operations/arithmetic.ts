import { Operation } from ".";
import { Flag8080, Register8080 } from "../cpu";

// ADC
export const ADC_B: Operation = {
  name: 'ADC B',
  opcode: 0x88,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const B = this.getRegisterValue(Register8080.B)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A + B + CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADC_C: Operation = {
  name: 'ADC C',
  opcode: 0x89,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const C = this.getRegisterValue(Register8080.C)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A + C + CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADC_D: Operation = {
  name: 'ADC D',
  opcode: 0x8a,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const D = this.getRegisterValue(Register8080.D)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A + D + CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADC_E: Operation = {
  name: 'ADC E',
  opcode: 0x8b,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const E = this.getRegisterValue(Register8080.E)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A + E + CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADC_H: Operation = {
  name: 'ADC H',
  opcode: 0x8c,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const H = this.getRegisterValue(Register8080.H)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A + H + CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADC_L: Operation = {
  name: 'ADC L',
  opcode: 0x8d,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const L = this.getRegisterValue(Register8080.L)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A + L + CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADC_M: Operation = {
  name: 'ADC M',
  opcode: 0x8e,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const val = this.getMemoryHL()
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A + val + CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADC_A: Operation = {
  name: 'ADC A',
  opcode: 0x8f,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A + A + CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

// ADD r
export const ADD_B: Operation = {
  name: 'ADD B',
  opcode: 0x80,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const B = this.getRegisterValue(Register8080.B)
    const result = A + B
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADD_C: Operation = {
  name: 'ADD C',
  opcode: 0x81,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const C = this.getRegisterValue(Register8080.C)
    const result = A + C
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADD_D: Operation = {
  name: 'ADD D',
  opcode: 0x82,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const D = this.getRegisterValue(Register8080.D)
    const result = A + D
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADD_E: Operation = {
  name: 'ADD E',
  opcode: 0x83,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const E = this.getRegisterValue(Register8080.E)
    const result = A + E
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADD_H: Operation = {
  name: 'ADD H',
  opcode: 0x84,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const H = this.getRegisterValue(Register8080.H)
    const result = A + H
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADD_L: Operation = {
  name: 'ADD L',
  opcode: 0x85,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const L = this.getRegisterValue(Register8080.L)
    const result = A + L
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADD_M: Operation = {
  name: 'ADD M',
  opcode: 0x86,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const val = this.getMemoryHL()
    const result = A + val
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const ADD_A: Operation = {
  name: 'ADD A',
  opcode: 0x87,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const result = A + A
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

// ACI
export const ACI: Operation = {
  name: 'ACI',
  opcode: 0xce,
  size: 2,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const byte2 = this.getRegisterValue(Register8080.W)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A + byte2 + CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

// ADI
export const ADI: Operation = {
  name: 'ADI',
  opcode: 0xc6,
  size: 2,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const byte2 = this.getRegisterValue(Register8080.W)
    const result = A + byte2
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

// SUB
export const SUB_B: Operation = {
  name: 'SUB B',
  opcode: 0x90,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const B = this.getRegisterValue(Register8080.B)
    const result = A - B
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SUB_C: Operation = {
  name: 'SUB C',
  opcode: 0x91,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const C = this.getRegisterValue(Register8080.C)
    const result = A - C
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SUB_D: Operation = {
  name: 'SUB D',
  opcode: 0x92,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const D = this.getRegisterValue(Register8080.D)
    const result = A - D
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SUB_E: Operation = {
  name: 'SUB E',
  opcode: 0x93,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const E = this.getRegisterValue(Register8080.E)
    const result = A - E
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SUB_H: Operation = {
  name: 'SUB H',
  opcode: 0x94,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const H = this.getRegisterValue(Register8080.H)
    const result = A - H
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SUB_L: Operation = {
  name: 'SUB L',
  opcode: 0x95,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const L = this.getRegisterValue(Register8080.L)
    const result = A - L
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SUB_M: Operation = {
  name: 'SUB M',
  opcode: 0x96,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const val = this.getMemoryHL()
    const result = A - val
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SUB_A: Operation = {
  name: 'SUB A',
  opcode: 0x97,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const result = A - A
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SBI: Operation = {
  name: 'SBI',
  opcode: 0xde,
  size: 2,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const byte2 = this.getRegisterValue(Register8080.W)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A - byte2 - CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SUI: Operation = {
  name: 'SUI',
  opcode: 0xd6,
  size: 2,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const byte2 = this.getRegisterValue(Register8080.W)
    const result = A - byte2
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

// INR
export const INR_B: Operation = {
  name: 'INR B',
  opcode: 0x04,
  size: 1,
  execute() {
    this.incrementRegister(Register8080.B)
  }
}

export const INR_C: Operation = {
  name: 'INR C',
  opcode: 0x0c,
  size: 1,
  execute() {
    this.incrementRegister(Register8080.C)
  }
}

export const INR_D: Operation = {
  name: 'INR D',
  opcode: 0x14,
  size: 1,
  execute() {
    this.incrementRegister(Register8080.D)
  }
}

export const INR_E: Operation = {
  name: 'INR E',
  opcode: 0x1c,
  size: 1,
  execute() {
    this.incrementRegister(Register8080.E)
  }
}

export const INR_H: Operation = {
  name: 'INR H',
  opcode: 0x24,
  size: 1,
  execute() {
    this.incrementRegister(Register8080.H)
  }
}

export const INR_L: Operation = {
  name: 'INR L',
  opcode: 0x2c,
  size: 1,
  execute() {
    this.incrementRegister(Register8080.L)
  }
}

export const INR_M: Operation = {
  name: 'INR M',
  opcode: 0x34,
  size: 1,
  execute() {
    const value = this.getMemoryHL() + 1
    this.setMemoryHL(value)
    this.updateFlagsNoCY(value)
  }
}

export const INR_A: Operation = {
  name: 'INR A',
  opcode: 0x3c,
  size: 1,
  execute() {
    this.incrementRegister(Register8080.A)
  }
}

// SBB
export const SBB_B: Operation = {
  name: 'SBB B',
  opcode: 0x98,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const B = this.getRegisterValue(Register8080.B)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A - B - CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SBB_C: Operation = {
  name: 'SBB C',
  opcode: 0x99,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const C = this.getRegisterValue(Register8080.C)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A - C - CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SBB_D: Operation = {
  name: 'SBB D',
  opcode: 0x9a,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const D = this.getRegisterValue(Register8080.D)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A - D - CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SBB_E: Operation = {
  name: 'SBB E',
  opcode: 0x9b,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const E = this.getRegisterValue(Register8080.E)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A - E - CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SBB_H: Operation = {
  name: 'SBB H',
  opcode: 0x9c,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const H = this.getRegisterValue(Register8080.H)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A - H - CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SBB_L: Operation = {
  name: 'SBB L',
  opcode: 0x9d,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const L = this.getRegisterValue(Register8080.L)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A - L - CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SBB_M: Operation = {
  name: 'SBB M',
  opcode: 0x9e,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const val = this.getMemoryHL()
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A - val - CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

export const SBB_A: Operation = {
  name: 'SBB A',
  opcode: 0x9f,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const CY = this.getFlagValue(Flag8080.CY)
    const result = A - A - CY
    this.setRegisterValue(Register8080.A, result)
    this.updateFlags(result)
  }
}

// DCR
export const DCR_B: Operation = {
  name: 'DCR B',
  opcode: 0x05,
  size: 1,
  execute() {
    this.decrementRegister(Register8080.B)
  }
}

export const DCR_C: Operation = {
  name: 'DCR C',
  opcode: 0x0d,
  size: 1,
  execute() {
    this.decrementRegister(Register8080.C)
  }
}

export const DCR_D: Operation = {
  name: 'DCR D',
  opcode: 0x15,
  size: 1,
  execute() {
    this.decrementRegister(Register8080.D)
  }
}

export const DCR_E: Operation = {
  name: 'DCR E',
  opcode: 0x1d,
  size: 1,
  execute() {
    this.decrementRegister(Register8080.E)
  }
}

export const DCR_H: Operation = {
  name: 'DCR H',
  opcode: 0x25,
  size: 1,
  execute() {
    this.decrementRegister(Register8080.H)
  }
}

export const DCR_L: Operation = {
  name: 'DCR L',
  opcode: 0x2d,
  size: 1,
  execute() {
    this.decrementRegister(Register8080.L)
  }
}

export const DCR_M: Operation = {
  name: 'DCR M',
  opcode: 0x35,
  size: 1,
  execute() {
    const value = this.getMemoryHL() - 1
    this.setMemoryHL(value)
    this.updateFlagsNoCY(value)
  }
}

export const DCR_A: Operation = {
  name: 'DCR A',
  opcode: 0x3d,
  size: 1,
  execute() {
    this.decrementRegister(Register8080.A)
  }
}

// DAA
export const DAA: Operation = {
  name: 'DAA',
  opcode: 0x27,
  size: 1,
  execute () {
    throw new Error('Unsupported Operation')
  }
}

// INX
export const INX_B: Operation = {
  name: 'INX B',
  opcode: 0x03,
  size: 1,
  execute() {
    const C1 = this.getRegisterValue(Register8080.C) + 1
    if (C1 > 0xff) {
      this.setRegisterValue(Register8080.C, 0)
      this.setRegisterValue(Register8080.B, this.getRegisterValue(Register8080.B) + 1)
    } else {
      this.setRegisterValue(Register8080.C, C1)
    }
  }
}

export const INX_D: Operation = {
  name: 'INX D',
  opcode: 0x13,
  size: 1,
  execute() {
    const E1 = this.getRegisterValue(Register8080.E) + 1
    if (E1 > 0xff) {
      this.setRegisterValue(Register8080.E, 0)
      this.setRegisterValue(Register8080.D, this.getRegisterValue(Register8080.D) + 1)
    } else {
      this.setRegisterValue(Register8080.E, E1)
    }
  }
}

export const INX_H: Operation = {
  name: 'INX H',
  opcode: 0x23,
  size: 1,
  execute() {
    const L1 = this.getRegisterValue(Register8080.L) + 1
    if (L1 > 0xff) {
      this.setRegisterValue(Register8080.L, 0)
      this.setRegisterValue(Register8080.H, this.getRegisterValue(Register8080.H) + 1)
    } else {
      this.setRegisterValue(Register8080.L, L1)
    }
  }
}

export const INX_SP: Operation = {
  name: 'INX SP',
  opcode: 0x33,
  size: 1,
  execute() {
    const SP1 = this.getRegisterValue(Register8080.SP) + 1
    if (SP1 > 0xffff) {
      this.setRegisterValue(Register8080.SP, 0)
    } else {
      this.setRegisterValue(Register8080.SP, SP1)
    }
  }
}

// DCX
export const DCX_B: Operation = {
  name: 'DCX B',
  opcode: 0x0b,
  size: 1,
  execute() {
    const B1 = this.getRegisterValue(Register8080.B) - 1
    if (B1 < 0) {
      this.setRegisterValue(Register8080.C, this.getRegisterValue(Register8080.C) - 1)
      this.setRegisterValue(Register8080.B, 0xff)
    } else {
      this.setRegisterValue(Register8080.B, B1)
    }
  }
}

export const DCX_D: Operation = {
  name: 'DCX D',
  opcode: 0x1b,
  size: 1,
  execute() {
    const D1 = this.getRegisterValue(Register8080.D) - 1
    if (D1 < 0) {
      this.setRegisterValue(Register8080.E, this.getRegisterValue(Register8080.E) - 1)
      this.setRegisterValue(Register8080.D, 0xff)
    } else {
      this.setRegisterValue(Register8080.D, D1)
    }
  }
}

export const DCX_H: Operation = {
  name: 'DCX H',
  opcode: 0x2b,
  size: 1,
  execute() {
    const L1 = this.getRegisterValue(Register8080.L) - 1
    if (L1 < 0) {
      this.setRegisterValue(Register8080.H, this.getRegisterValue(Register8080.H) - 1)
      this.setRegisterValue(Register8080.L, 0xff)
    } else {
      this.setRegisterValue(Register8080.L, L1)
    }
  }
}

export const DCX_SP: Operation = {
  name: 'DCX SP',
  opcode: 0x3b,
  size: 1,
  execute() {
    const SP1 = this.getRegisterValue(Register8080.SP) - 1
    if (SP1 < 0) {
      this.setRegisterValue(Register8080.SP, 0xffff)
    } else {
      this.setRegisterValue(Register8080.SP, SP1)
    }
  }
}

// DAD
export const DAD_B: Operation = {
  name: 'DAD B',
  opcode: 0x09,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    const L = this.getRegisterValue(Register8080.L)
    const B = this.getRegisterValue(Register8080.B)
    const C = this.getRegisterValue(Register8080.C)
    const hl = (H << 8) | L
    const bc = (B << 8) | C
    const result = hl + bc
    this.setRegisterValue(Register8080.H, (result & 0xff00) >> 8)
    this.setRegisterValue(Register8080.L, result & 0xff)
    this.setFlag(Flag8080.CY, (result & 0xffff0000) > 0)
  }
}

export const DAD_D: Operation = {
  name: 'DAD D',
  opcode: 0x19,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    const L = this.getRegisterValue(Register8080.L)
    const D = this.getRegisterValue(Register8080.D)
    const E = this.getRegisterValue(Register8080.E)
    const hl = (H << 8) | L
    const de = (D << 8) | E
    const result = hl + de
    this.setRegisterValue(Register8080.H, (result & 0xff00) >> 8)
    this.setRegisterValue(Register8080.L, result & 0xff)
    this.setFlag(Flag8080.CY, (result & 0xffff0000) > 0)
  }
}

export const DAD_H: Operation = {
  name: 'DAD H',
  opcode: 0x29,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    const L = this.getRegisterValue(Register8080.L)
    const hl = (H << 8) | L
    const result = hl + hl
    this.setRegisterValue(Register8080.H, (result & 0xff00) >> 8)
    this.setRegisterValue(Register8080.L, result & 0xff)
    this.setFlag(Flag8080.CY, (result & 0xffff0000) > 0)
  }
}

export const DAD_SP: Operation = {
  name: 'DAD SP',
  opcode: 0x39,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    const L = this.getRegisterValue(Register8080.L)
    const SP = this.getRegisterValue(Register8080.SP)
    const hl = (H << 8) | L
    const result = hl + SP
    this.setRegisterValue(Register8080.H, (result & 0xff00) >> 8)
    this.setRegisterValue(Register8080.L, result & 0xff)
    this.setFlag(Flag8080.CY, (result & 0xffff0000) > 0)
  }
}