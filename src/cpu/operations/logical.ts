import { Operation } from ".";
import { Flag8080, Register8080 } from "../cpu";

// ANA
export const ANA_B: Operation = {
  name: 'ANA B',
  opcode: 0xa0,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const B = this.getRegisterValue(Register8080.B)
    this.setRegisterValue(Register8080.A, A & B)
    this.updateFlagsLogical()
  }
}

export const ANA_C: Operation = {
  name: 'ANA C',
  opcode: 0xa1,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const C = this.getRegisterValue(Register8080.C)
    this.setRegisterValue(Register8080.A, A & C)
    this.updateFlagsLogical()
  }
}

export const ANA_D: Operation = {
  name: 'ANA D',
  opcode: 0xa2,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const D = this.getRegisterValue(Register8080.D)
    this.setRegisterValue(Register8080.A, A & D)
    this.updateFlagsLogical()
  }
}

export const ANA_E: Operation = {
  name: 'ANA E',
  opcode: 0xa3,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.A, A & E)
    this.updateFlagsLogical()
  }
}

export const ANA_H: Operation = {
  name: 'ANA H',
  opcode: 0xa4,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const H = this.getRegisterValue(Register8080.H)
    this.setRegisterValue(Register8080.A, A & H)
    this.updateFlagsLogical()
  }
}

export const ANA_L: Operation = {
  name: 'ANA L',
  opcode: 0xa5,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.A, A & L)
    this.updateFlagsLogical()
  }
}

export const ANA_M: Operation = {
  name: 'ANA M',
  opcode: 0xa6,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const val = this.getMemoryHL()
    this.setRegisterValue(Register8080.A, A & val)
    this.updateFlagsLogical()
  }
}

export const ANA_A: Operation = {
  name: 'ANA A',
  opcode: 0xa7,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setRegisterValue(Register8080.A, A & A)
    this.updateFlagsLogical()
  }
}

// ANI
export const ANI: Operation = {
  name: 'ANI',
  opcode: 0xe6,
  size: 2,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.A, A & byte2)
    this.updateFlagsLogical()
  }
}

// XRA
export const XRA_B: Operation = {
  name: 'XRA B',
  opcode: 0xa8,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const B = this.getRegisterValue(Register8080.B)
    this.setRegisterValue(Register8080.A, A ^ B)
    this.updateFlagsLogical()
  }
}

export const XRA_C: Operation = {
  name: 'XRA C',
  opcode: 0xa9,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const C = this.getRegisterValue(Register8080.C)
    this.setRegisterValue(Register8080.A, A ^ C)
    this.updateFlagsLogical()
  }
}

export const XRA_D: Operation = {
  name: 'XRA D',
  opcode: 0xaa,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const D = this.getRegisterValue(Register8080.D)
    this.setRegisterValue(Register8080.A, A ^ D)
    this.updateFlagsLogical()
  }
}

export const XRA_E: Operation = {
  name: 'XRA E',
  opcode: 0xab,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.A, A ^ E)
    this.updateFlagsLogical()
  }
}

export const XRA_H: Operation = {
  name: 'XRA H',
  opcode: 0xac,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const H = this.getRegisterValue(Register8080.H)
    this.setRegisterValue(Register8080.A, A ^ H)
    this.updateFlagsLogical()
  }
}

export const XRA_L: Operation = {
  name: 'XRA L',
  opcode: 0xad,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.A, A ^ L)
    this.updateFlagsLogical()
  }
}

export const XRA_M: Operation = {
  name: 'XRA M',
  opcode: 0xae,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const val = this.getMemoryHL()
    this.setRegisterValue(Register8080.A, A ^ val)
    this.updateFlagsLogical()
  }
}

export const XRA_A: Operation = {
  name: 'XRA A',
  opcode: 0xaf,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setRegisterValue(Register8080.A, A ^ A)
    this.updateFlagsLogical()
  }
}

// XRI
export const XRI: Operation = {
  name: 'XRI',
  opcode: 0xee,
  size: 2,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.A, A ^ byte2)
    this.updateFlagsLogical()
  }
}

// ORA
export const ORA_B: Operation = {
  name: 'ORA B',
  opcode: 0xb0,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const B = this.getRegisterValue(Register8080.B)
    this.setRegisterValue(Register8080.A, A | B)
    this.updateFlagsLogical()
  }
}

export const ORA_C: Operation = {
  name: 'ORA C',
  opcode: 0xb1,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const C = this.getRegisterValue(Register8080.C)
    this.setRegisterValue(Register8080.A, A | C)
    this.updateFlagsLogical()
  }
}

export const ORA_D: Operation = {
  name: 'ORA D',
  opcode: 0xb2,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const D = this.getRegisterValue(Register8080.D)
    this.setRegisterValue(Register8080.A, A | D)
    this.updateFlagsLogical()
  }
}

export const ORA_E: Operation = {
  name: 'ORA E',
  opcode: 0xb3,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.A, A | E)
    this.updateFlagsLogical()
  }
}

export const ORA_H: Operation = {
  name: 'ORA H',
  opcode: 0xb4,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const H = this.getRegisterValue(Register8080.H)
    this.setRegisterValue(Register8080.A, A | H)
    this.updateFlagsLogical()
  }
}

export const ORA_L: Operation = {
  name: 'ORA L',
  opcode: 0xb5,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.A, A | L)
    this.updateFlagsLogical()
  }
}

export const ORA_M: Operation = {
  name: 'ORA M',
  opcode: 0xb6,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const val = this.getMemoryHL()
    this.setRegisterValue(Register8080.A, A | val)
    this.updateFlagsLogical()
  }
}

export const ORA_A: Operation = {
  name: 'ORA A',
  opcode: 0xb7,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setRegisterValue(Register8080.A, A | A)
    this.updateFlagsLogical()
  }
}

// ORI
export const ORI: Operation = {
  name: 'ORI',
  opcode: 0xf6,
  size: 2,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.A, A | byte2)
    this.updateFlagsLogical()
  }
}

// CMP
export const CMP_B: Operation = {
  name: 'CMP B',
  opcode: 0xb8,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const B = this.getRegisterValue(Register8080.B)
    const result = A - B
    this.updateFlagsLogical()
    if (result === 0) {
      this.setFlag(Flag8080.Z, true)
    }
    if (result < 0) {
      this.setFlag(Flag8080.CY, true)
    }
  }
}

export const CMP_C: Operation = {
  name: 'CMP C',
  opcode: 0xb9,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const C = this.getRegisterValue(Register8080.C)
    const result = A - C
    this.updateFlagsLogical()
    if (result === 0) {
      this.setFlag(Flag8080.Z, true)
    }
    if (result < 0) {
      this.setFlag(Flag8080.CY, true)
    }
  }
}

export const CMP_D: Operation = {
  name: 'CMP D',
  opcode: 0xba,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const D = this.getRegisterValue(Register8080.D)
    const result = A - D
    this.updateFlagsLogical()
    if (result === 0) {
      this.setFlag(Flag8080.Z, true)
    }
    if (result < 0) {
      this.setFlag(Flag8080.CY, true)
    }
  }
}

export const CMP_E: Operation = {
  name: 'CMP E',
  opcode: 0xbb,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const E = this.getRegisterValue(Register8080.E)
    const result = A - E
    this.updateFlagsLogical()
    if (result === 0) {
      this.setFlag(Flag8080.Z, true)
    }
    if (result < 0) {
      this.setFlag(Flag8080.CY, true)
    }
  }
}

export const CMP_H: Operation = {
  name: 'CMP H',
  opcode: 0xbc,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const H = this.getRegisterValue(Register8080.H)
    const result = A - H
    this.updateFlagsLogical()
    if (result === 0) {
      this.setFlag(Flag8080.Z, true)
    }
    if (result < 0) {
      this.setFlag(Flag8080.CY, true)
    }
  }
}

export const CMP_L: Operation = {
  name: 'CMP L',
  opcode: 0xbd,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const L = this.getRegisterValue(Register8080.L)
    const result = A - L
    this.updateFlagsLogical()
    if (result === 0) {
      this.setFlag(Flag8080.Z, true)
    }
    if (result < 0) {
      this.setFlag(Flag8080.CY, true)
    }
  }
}

export const CMP_M: Operation = {
  name: 'CMP B',
  opcode: 0xbe,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const val = this.getMemoryHL()
    const result = A - val
    this.updateFlagsLogical()
    if (result === 0) {
      this.setFlag(Flag8080.Z, true)
    }
    if (result < 0) {
      this.setFlag(Flag8080.CY, true)
    }
  }
}

export const CMP_A: Operation = {
  name: 'CMP A',
  opcode: 0xbf,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const result = A - A
    this.updateFlagsLogical()
    if (result === 0) {
      this.setFlag(Flag8080.Z, true)
    }
    if (result < 0) {
      this.setFlag(Flag8080.CY, true)
    }
  }
}

// CPI
export const CPI: Operation = {
  name: 'CPI',
  opcode: 0xfe,
  size: 2,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const byte2 = this.getRegisterValue(Register8080.W)
    const result = A - byte2
    this.updateFlagsLogical()
    if (result === 0) {
      this.setFlag(Flag8080.Z, true)
    }
    if (result < 0) {
      this.setFlag(Flag8080.CY, true)
    }
  }
}

// RLC
export const RLC: Operation = {
  name: 'RLC',
  opcode: 0x07,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const hi = (A & 0b10000000) >> 7
    const _a = A << 1
    const result = (_a | hi) & 0xff
    this.setFlag(Flag8080.CY, hi > 0)
    this.setRegisterValue(Register8080.A, result)
  }
}

export const RRC: Operation = {
  name: 'RRC',
  opcode: 0x0f,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const lo = (A & 0b00000001)
    const _a = A >> 1
    const result = _a | (lo << 7)
    this.setFlag(Flag8080.CY, lo > 0)
    this.setRegisterValue(Register8080.A, result)
  }
}

export const RAL: Operation = {
  name: 'RAL',
  opcode: 0x17,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const CY = this.getFlagValue(Flag8080.CY)
    const hi = (A & 0b10000000) >> 7
    const _a = A << 1
    const result = (_a | CY) & 0xff
    this.setFlag(Flag8080.CY, hi > 0)
    this.setRegisterValue(Register8080.A, result)
  }
}

export const RAR: Operation = {
  name: 'RAR',
  opcode: 0x1f,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const CY = this.getFlagValue(Flag8080.CY)
    const lo = (A & 0b00000001)
    const _a = A >> 1
    const result = _a | (CY << 7)
    this.setFlag(Flag8080.CY, lo > 0)
    this.setRegisterValue(Register8080.A, result)
  }
}

export const CMA: Operation = {
  name: 'CMA',
  opcode: 0x2f,
  size: 1,
  execute() {
    const _A = ~(this.getRegisterValue(Register8080.A))
    this.setRegisterValue(Register8080.A, _A)
  }
}

export const CMC: Operation = {
  name: 'CMC',
  opcode: 0x3f,
  size: 1,
  execute() {
    this.setFlag(Flag8080.CY, !(this.getFlag(Flag8080.CY).value))
  }
}

export const STC: Operation = {
  name: 'STC',
  opcode: 0x37,
  size: 1,
  execute() {
    this.setFlag(Flag8080.CY, true)
  }
}