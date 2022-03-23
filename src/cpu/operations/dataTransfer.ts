import { Operation } from ".";
import { Register8080 } from "../cpu";

// B <- x
export const MOV_BB: Operation = {
  name: 'MOV B,B',
  opcode: 0x40,
  size: 1,
  execute() {
    const B = this.getRegisterValue(Register8080.B)
    this.setRegisterValue(Register8080.B, B)
  }
}

export const MOV_BC: Operation = {
  name: 'MOV B,C',
  opcode: 0x41,
  size: 1,
  execute() {
    const C = this.getRegisterValue(Register8080.C)
    this.setRegisterValue(Register8080.B, C)
  }
}

export const MOV_BD: Operation = {
  name: 'MOV B,D',
  opcode: 0x42,
  size: 1,
  execute() {
    const D = this.getRegisterValue(Register8080.D)
    this.setRegisterValue(Register8080.B, D)
  }
}

export const MOV_BE: Operation = {
  name: 'MOV B,E',
  opcode: 0x43,
  size: 1,
  execute() {
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.B, E)
  }
}

export const MOV_BH: Operation = {
  name: 'MOV B,H',
  opcode: 0x44,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    this.setRegisterValue(Register8080.B, H)
  }
}

export const MOV_BL: Operation = {
  name: 'MOV B,L',
  opcode: 0x45,
  size: 1,
  execute() {
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.B, L)
  }
}

export const MOV_BM: Operation = {
  name: 'MOV B,M',
  opcode: 0x46,
  size: 1,
  execute() {
    const memoryValue = this.getMemoryHL()
    this.setRegisterValue(Register8080.B, memoryValue)
  }
}

export const MOV_BA: Operation = {
  name: 'MOV B,A',
  opcode: 0x47,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setRegisterValue(Register8080.B, A)
  }
}

// C <- x
export const MOV_CB: Operation = {
  name: 'MOV C,B',
  opcode: 0x48,
  size: 1,
  execute() {
    const B = this.getRegisterValue(Register8080.B)
    this.setRegisterValue(Register8080.C, B)
  }
}

export const MOV_CC: Operation = {
  name: 'MOV C,C',
  opcode: 0x49,
  size: 1,
  execute() {
    const C = this.getRegisterValue(Register8080.C)
    this.setRegisterValue(Register8080.C, C)
  }
}

export const MOV_CD: Operation = {
  name: 'MOV C,D',
  opcode: 0x4a,
  size: 1,
  execute() {
    const D = this.getRegisterValue(Register8080.D)
    this.setRegisterValue(Register8080.C, D)
  }
}

export const MOV_CE: Operation = {
  name: 'MOV C,E',
  opcode: 0x4b,
  size: 1,
  execute() {
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.C, E)
  }
}

export const MOV_CH: Operation = {
  name: 'MOV C,H',
  opcode: 0x4c,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    this.setRegisterValue(Register8080.C, H)
  }
}

export const MOV_CL: Operation = {
  name: 'MOV C,L',
  opcode: 0x4d,
  size: 1,
  execute() {
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.C, L)
  }
}

export const MOV_CM: Operation = {
  name: 'MOV C,M',
  opcode: 0x4e,
  size: 1,
  execute() {
    const memoryValue = this.getMemoryHL()
    this.setRegisterValue(Register8080.B, memoryValue)
  }
}

export const MOV_CA: Operation = {
  name: 'MOV C,A',
  opcode: 0x4f,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setRegisterValue(Register8080.C, A)
  }
}

// D <- x
export const MOV_DB: Operation = {
  name: 'MOV D,B',
  opcode: 0x50,
  size: 1,
  execute() {
    const B = this.getRegisterValue(Register8080.B)
    this.setRegisterValue(Register8080.D, B)
  }
}

export const MOV_DC: Operation = {
  name: 'MOV D,C',
  opcode: 0x51,
  size: 1,
  execute() {
    const C = this.getRegisterValue(Register8080.C)
    this.setRegisterValue(Register8080.D, C)
  }
}

export const MOV_DD: Operation = {
  name: 'MOV D,D',
  opcode: 0x52,
  size: 1,
  execute() {
    const D = this.getRegisterValue(Register8080.D)
    this.setRegisterValue(Register8080.D, D)
  }
}

export const MOV_DE: Operation = {
  name: 'MOV D,E',
  opcode: 0x53,
  size: 1,
  execute() {
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.D, E)
  }
}

export const MOV_DH: Operation = {
  name: 'MOV D,H',
  opcode: 0x54,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    this.setRegisterValue(Register8080.D, H)
  }
}

export const MOV_DL: Operation = {
  name: 'MOV D,L',
  opcode: 0x55,
  size: 1,
  execute() {
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.D, L)
  }
}

export const MOV_DM: Operation = {
  name: 'MOV D,M',
  opcode: 0x56,
  size: 1,
  execute() {
    const memoryValue = this.getMemoryHL()
    this.setRegisterValue(Register8080.D, memoryValue)
  }
}

export const MOV_DA: Operation = {
  name: 'MOV D,A',
  opcode: 0x57,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setRegisterValue(Register8080.D, A)
  }
}

// E <- x
export const MOV_EB: Operation = {
  name: 'MOV E,B',
  opcode: 0x58,
  size: 1,
  execute() {
    const B = this.getRegisterValue(Register8080.B)
    this.setRegisterValue(Register8080.E, B)
  }
}

export const MOV_EC: Operation = {
  name: 'MOV E,C',
  opcode: 0x59,
  size: 1,
  execute() {
    const C = this.getRegisterValue(Register8080.C)
    this.setRegisterValue(Register8080.E, C)
  }
}

export const MOV_ED: Operation = {
  name: 'MOV E,D',
  opcode: 0x5a,
  size: 1,
  execute() {
    const D = this.getRegisterValue(Register8080.D)
    this.setRegisterValue(Register8080.E, D)
  }
}

export const MOV_EE: Operation = {
  name: 'MOV E,E',
  opcode: 0x5b,
  size: 1,
  execute() {
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.E, E)
  }
}

export const MOV_EH: Operation = {
  name: 'MOV E,H',
  opcode: 0x5c,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    this.setRegisterValue(Register8080.E, H)
  }
}

export const MOV_EL: Operation = {
  name: 'MOV E,L',
  opcode: 0x5d,
  size: 1,
  execute() {
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.E, L)
  }
}

export const MOV_EM: Operation = {
  name: 'MOV E,M',
  opcode: 0x5e,
  size: 1,
  execute() {
    const memoryValue = this.getMemoryHL()
    this.setRegisterValue(Register8080.E, memoryValue)
  }
}

export const MOV_EA: Operation = {
  name: 'MOV E,A',
  opcode: 0x5f,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setRegisterValue(Register8080.E, A)
  }
}

// H <- x
export const MOV_HB: Operation = {
  name: 'MOV H,B',
  opcode: 0x60,
  size: 1,
  execute() {
    const B = this.getRegisterValue(Register8080.B)
    this.setRegisterValue(Register8080.H, B)
  }
}

export const MOV_HC: Operation = {
  name: 'MOV H,C',
  opcode: 0x61,
  size: 1,
  execute() {
    const C = this.getRegisterValue(Register8080.C)
    this.setRegisterValue(Register8080.H, C)
  }
}

export const MOV_HD: Operation = {
  name: 'MOV H,D',
  opcode: 0x62,
  size: 1,
  execute() {
    const D = this.getRegisterValue(Register8080.D)
    this.setRegisterValue(Register8080.H, D)
  }
}

export const MOV_HE: Operation = {
  name: 'MOV H,E',
  opcode: 0x63,
  size: 1,
  execute() {
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.H, E)
  }
}

export const MOV_HH: Operation = {
  name: 'MOV H,H',
  opcode: 0x64,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    this.setRegisterValue(Register8080.H, H)
  }
}

export const MOV_HL: Operation = {
  name: 'MOV H,L',
  opcode: 0x65,
  size: 1,
  execute() {
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.H, L)
  }
}

export const MOV_HM: Operation = {
  name: 'MOV H,M',
  opcode: 0x66,
  size: 1,
  execute() {
    const memoryValue = this.getMemoryHL()
    this.setRegisterValue(Register8080.H, memoryValue)
  }
}

export const MOV_HA: Operation = {
  name: 'MOV H,A',
  opcode: 0x67,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setRegisterValue(Register8080.H, A)
  }
}

// L <- x
export const MOV_LB: Operation = {
  name: 'MOV L,B',
  opcode: 0x68,
  size: 1,
  execute() {
    const B = this.getRegisterValue(Register8080.B)
    this.setRegisterValue(Register8080.L, B)
  }
}

export const MOV_LC: Operation = {
  name: 'MOV L,C',
  opcode: 0x69,
  size: 1,
  execute() {
    const C = this.getRegisterValue(Register8080.C)
    this.setRegisterValue(Register8080.L, C)
  }
}

export const MOV_LD: Operation = {
  name: 'MOV L,D',
  opcode: 0x6a,
  size: 1,
  execute() {
    const D = this.getRegisterValue(Register8080.D)
    this.setRegisterValue(Register8080.L, D)
  }
}

export const MOV_LE: Operation = {
  name: 'MOV L,E',
  opcode: 0x6b,
  size: 1,
  execute() {
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.L, E)
  }
}

export const MOV_LH: Operation = {
  name: 'MOV L,H',
  opcode: 0x6c,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    this.setRegisterValue(Register8080.L, H)
  }
}

export const MOV_LL: Operation = {
  name: 'MOV L,L',
  opcode: 0x6d,
  size: 1,
  execute() {
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.L, L)
  }
}

export const MOV_LM: Operation = {
  name: 'MOV L,M',
  opcode: 0x6e,
  size: 1,
  execute() {
    const memoryValue = this.getMemoryHL()
    this.setRegisterValue(Register8080.L, memoryValue)
  }
}

export const MOV_LA: Operation = {
  name: 'MOV L,A',
  opcode: 0x6f,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setRegisterValue(Register8080.L, A)
  }
}

// M <- x
export const MOV_MB: Operation = {
  name: 'MOV M,B',
  opcode: 0x70,
  size: 1,
  execute() {
    const B = this.getRegisterValue(Register8080.B)
    this.setMemoryHL(B)
  }
}

export const MOV_MC: Operation = {
  name: 'MOV M,C',
  opcode: 0x71,
  size: 1,
  execute() {
    const C = this.getRegisterValue(Register8080.C)
    this.setMemoryHL(C)
  }
}

export const MOV_MD: Operation = {
  name: 'MOV M,D',
  opcode: 0x72,
  size: 1,
  execute() {
    const D = this.getRegisterValue(Register8080.D)
    this.setMemoryHL(D)
  }
}

export const MOV_ME: Operation = {
  name: 'MOV M,E',
  opcode: 0x73,
  size: 1,
  execute() {
    const E = this.getRegisterValue(Register8080.E)
    this.setMemoryHL(E)
  }
}

export const MOV_MH: Operation = {
  name: 'MOV M,H',
  opcode: 0x74,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    this.setMemoryHL(H)
  }
}

export const MOV_ML: Operation = {
  name: 'MOV M,L',
  opcode: 0x75,
  size: 1,
  execute() {
    const L = this.getRegisterValue(Register8080.L)
    this.setMemoryHL(L)
  }
}

// HLT 0x76

export const MOV_MA: Operation = {
  name: 'MOV M,A',
  opcode: 0x77,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setMemoryHL(A)
  }
}

// A <- x
export const MOV_AB: Operation = {
  name: 'MOV A,B',
  opcode: 0x78,
  size: 1,
  execute() {
    const B = this.getRegisterValue(Register8080.B)
    this.setRegisterValue(Register8080.A, B)
  }
}

export const MOV_AC: Operation = {
  name: 'MOV A,C',
  opcode: 0x79,
  size: 1,
  execute() {
    const C = this.getRegisterValue(Register8080.C)
    this.setRegisterValue(Register8080.A, C)
  }
}

export const MOV_AD: Operation = {
  name: 'MOV A,D',
  opcode: 0x7a,
  size: 1,
  execute() {
    const D = this.getRegisterValue(Register8080.D)
    this.setRegisterValue(Register8080.A, D)
  }
}

export const MOV_AE: Operation = {
  name: 'MOV A,E',
  opcode: 0x7b,
  size: 1,
  execute() {
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.A, E)
  }
}

export const MOV_AH: Operation = {
  name: 'MOV A,H',
  opcode: 0x7c,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    this.setRegisterValue(Register8080.A, H)
  }
}

export const MOV_AL: Operation = {
  name: 'MOV A,L',
  opcode: 0x7d,
  size: 1,
  execute() {
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.A, L)
  }
}

export const MOV_AM: Operation = {
  name: 'MOV A,M',
  opcode: 0x7e,
  size: 1,
  execute() {
    const memoryValue = this.getMemoryHL()
    this.setRegisterValue(Register8080.A, memoryValue)
  }
}

export const MOV_AA: Operation = {
  name: 'MOV A,A',
  opcode: 0x7f,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    this.setRegisterValue(Register8080.A, A)
  }
}

// MVI
export const MVI_B: Operation = {
  name: 'MVI B',
  opcode: 0x06,
  size: 2,
  execute() {
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.B, byte2)
  }
}

export const MVI_C: Operation = {
  name: 'MVI C',
  opcode: 0x0e,
  size: 2,
  execute() {
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.C, byte2)
  }
}

export const MVI_D: Operation = {
  name: 'MVI D',
  opcode: 0x16,
  size: 2,
  execute() {
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.D, byte2)
  }
}

export const MVI_E: Operation = {
  name: 'MVI E',
  opcode: 0x1e,
  size: 2,
  execute() {
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.E, byte2)
  }
}

export const MVI_H: Operation = {
  name: 'MVI H',
  opcode: 0x26,
  size: 2,
  execute() {
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.H, byte2)
  }
}

export const MVI_L: Operation = {
  name: 'MVI L',
  opcode: 0x2e,
  size: 2,
  execute() {
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.L, byte2)
  }
}

export const MVI_M: Operation = {
  name: 'MVI M',
  opcode: 0x36,
  size: 2,
  execute() {
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setMemoryHL(byte2)
  }
}

export const MVI_A: Operation = {
  name: 'MVI A',
  opcode: 0x3e,
  size: 2,
  execute() {
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.A, byte2)
  }
}

// LXI
export const LXI_B: Operation = {
  name: 'LXI B',
  opcode: 0x01,
  size: 3,
  execute() {
    const byte3 = this.getRegisterValue(Register8080.Z)
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.B, byte3)
    this.setRegisterValue(Register8080.C, byte2)
  }
}

export const LXI_D: Operation = {
  name: 'LXI D',
  opcode: 0x11,
  size: 3,
  execute() {
    const byte3 = this.getRegisterValue(Register8080.Z)
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.D, byte3)
    this.setRegisterValue(Register8080.E, byte2)
  }
}

export const LXI_H: Operation = {
  name: 'LXI H',
  opcode: 0x21,
  size: 3,
  execute() {
    const byte3 = this.getRegisterValue(Register8080.Z)
    const byte2 = this.getRegisterValue(Register8080.W)
    this.setRegisterValue(Register8080.H, byte3)
    this.setRegisterValue(Register8080.L, byte2)
  }
}

export const LXI_SP: Operation = {
  name: 'LXI SP',
  opcode: 0x31,
  size: 3,
  execute() {
    const byte3 = this.getRegisterValue(Register8080.Z)
    const byte2 = this.getRegisterValue(Register8080.W)
    const result = (byte3 << 8) | byte2
    this.setRegisterValue(Register8080.SP, result)
  }
}

// LDA
export const LDA: Operation = {
  name: 'LDA',
  opcode: 0x3a,
  size: 3,
  execute() {
    const byte3 = this.getRegisterValue(Register8080.Z)
    const byte2 = this.getRegisterValue(Register8080.W)
    const address = (byte3 << 8) | byte2
    const value = this.getMemoryAt(address)
    this.setRegisterValue(Register8080.A, value)
  }
}

// SHLD
export const SHLD: Operation = {
  name: 'SHLD',
  opcode: 0x22,
  size: 3,
  execute() {
    const byte3 = this.getRegisterValue(Register8080.Z)
    const byte2 = this.getRegisterValue(Register8080.W)
    const L = this.getRegisterValue(Register8080.L)
    const H = this.getRegisterValue(Register8080.H)
    const address = (byte3 << 8) | byte2
    this.setMemoryAt(address, L)
    this.setMemoryAt(address + 1, H)
  }
}

// STA
export const STA: Operation = {
  name: 'STA',
  opcode: 0x32,
  size: 3,
  execute() {
    const byte3 = this.getRegisterValue(Register8080.Z)
    const byte2 = this.getRegisterValue(Register8080.W)
    const A = this.getRegisterValue(Register8080.A)
    const address = (byte3 << 8) | byte2
    this.setMemoryAt(address, A)
  }
}

// LDAX
export const LDAX_B: Operation = {
  name: 'LDAX B',
  opcode: 0x0a,
  size: 1,
  execute() {
    const B = this.getRegisterValue(Register8080.B)
    const C = this.getRegisterValue(Register8080.C)
    const address = (B << 8) | C
    const value = this.getMemoryAt(address)
    this.setRegisterValue(Register8080.A, value)
  }
}

export const LDAX_D: Operation = {
  name: 'LDAX D',
  opcode: 0x1a,
  size: 1,
  execute() {
    const D = this.getRegisterValue(Register8080.D)
    const E = this.getRegisterValue(Register8080.E)
    const address = (D << 8) | E
    const value = this.getMemoryAt(address)
    this.setRegisterValue(Register8080.A, value)
  }
}

// STAX
export const STAX_B: Operation = {
  name: 'STAX B',
  opcode: 0x02,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const B = this.getRegisterValue(Register8080.B)
    const C = this.getRegisterValue(Register8080.C)
    const address = (B << 8) | C
    this.setMemoryAt(address, A)
  }
}

export const STAX_D: Operation = {
  name: 'STAX D',
  opcode: 0x12,
  size: 1,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const D = this.getRegisterValue(Register8080.E)
    const E = this.getRegisterValue(Register8080.D)
    const address = (D << 8) | E
    this.setMemoryAt(address, A)
  }
}

// LHLD
export const LHLD: Operation = {
  name: 'LHLD',
  opcode: 0x2a,
  size: 3,
  execute() {
    const byte3 = this.getRegisterValue(Register8080.Z)
    const byte2 = this.getRegisterValue(Register8080.W)
    const address = (byte3 << 8) | byte2
    const v1 = this.getMemoryAt(address)
    const v2 = this.getMemoryAt(address + 1)
    this.setRegisterValue(Register8080.L, v1)
    this.setRegisterValue(Register8080.H, v2)
  }
}

// XCHG
export const XCHG: Operation = {
  name: 'XCHG',
  opcode: 0xeb,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    const L = this.getRegisterValue(Register8080.L)
    const D = this.getRegisterValue(Register8080.D)
    const E = this.getRegisterValue(Register8080.E)
    this.setRegisterValue(Register8080.H, D)
    this.setRegisterValue(Register8080.L, E)
    this.setRegisterValue(Register8080.D, H)
    this.setRegisterValue(Register8080.E, L)
  }
}