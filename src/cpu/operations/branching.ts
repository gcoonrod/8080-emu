import { Operation } from ".";
import { Flag8080, Register8080 } from "../cpu";

// Jumps
export const JMP: Operation = {
  name: 'JMP',
  opcode: 0xc3,
  size: 3,
  execute() {
    const byte2 = this.getRegisterValue(Register8080.W)
    const byte3 = this.getRegisterValue(Register8080.Z)
    const address = (byte3 << 8) | byte2
    this.setRegisterValue(Register8080.PC, address)
  }
}

export const JZ: Operation = {
  name: 'JZ',
  opcode: 0xca,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.Z) === 1) {
      const byte2 = this.getRegisterValue(Register8080.W)
      const byte3 = this.getRegisterValue(Register8080.Z)
      const address = (byte3 << 8) | byte2
      this.setRegisterValue(Register8080.PC, address)
    }
  }
}

export const JNZ: Operation = {
  name: 'JNZ',
  opcode: 0xc2,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.Z) === 0) {
      const byte2 = this.getRegisterValue(Register8080.W)
      const byte3 = this.getRegisterValue(Register8080.Z)
      const address = (byte3 << 8) | byte2
      this.setRegisterValue(Register8080.PC, address)
    }
  }
}

export const JC: Operation = {
  name: 'JC',
  opcode: 0xda,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.CY) === 1) {
      const byte2 = this.getRegisterValue(Register8080.W)
      const byte3 = this.getRegisterValue(Register8080.Z)
      const address = (byte3 << 8) | byte2
      this.setRegisterValue(Register8080.PC, address)
    }
  }
}

export const JNC: Operation = {
  name: 'JNC',
  opcode: 0xd2,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.CY) === 0) {
      const byte2 = this.getRegisterValue(Register8080.W)
      const byte3 = this.getRegisterValue(Register8080.Z)
      const address = (byte3 << 8) | byte2
      this.setRegisterValue(Register8080.PC, address)
    }
  }
}

export const JM: Operation = {
  name: 'JM',
  opcode: 0xfa,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.S) === 0) {
      const byte2 = this.getRegisterValue(Register8080.W)
      const byte3 = this.getRegisterValue(Register8080.Z)
      const address = (byte3 << 8) | byte2
      this.setRegisterValue(Register8080.PC, address)
    }
  }
}

export const JP: Operation = {
  name: 'JP',
  opcode: 0xf2,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.S) === 1) {
      const byte2 = this.getRegisterValue(Register8080.W)
      const byte3 = this.getRegisterValue(Register8080.Z)
      const address = (byte3 << 8) | byte2
      this.setRegisterValue(Register8080.PC, address)
    }
  }
}

export const JPE: Operation = {
  name: 'JPE',
  opcode: 0xea,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.P) === 1) {
      const byte2 = this.getRegisterValue(Register8080.W)
      const byte3 = this.getRegisterValue(Register8080.Z)
      const address = (byte3 << 8) | byte2
      this.setRegisterValue(Register8080.PC, address)
    }
  }
}

export const JPO: Operation = {
  name: 'JPO',
  opcode: 0xe2,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.P) === 0) {
      const byte2 = this.getRegisterValue(Register8080.W)
      const byte3 = this.getRegisterValue(Register8080.Z)
      const address = (byte3 << 8) | byte2
      this.setRegisterValue(Register8080.PC, address)
    }
  }
}

// Calls
export const CALL: Operation = {
  name: 'CALL',
  opcode: 0xcd,
  size: 3,
  execute() {
    const PC = this.getRegisterValue(Register8080.PC) // RET
    const SP = this.getRegisterValue(Register8080.SP)
    const byte2 = this.getRegisterValue(Register8080.W)
    const byte3 = this.getRegisterValue(Register8080.Z)
    const address = (byte3 << 8) | byte2
    const PCh = (PC >> 8) & 0xff
    const PCl = (PC & 0xff)
    this.setMemoryAt(SP - 1, PCh)
    this.setMemoryAt(SP - 2, PCl)
    this.setRegisterValue(Register8080.SP, SP - 2)
    this.setRegisterValue(Register8080.PC, address)
  }
}

export const CC: Operation = {
  name: 'CC',
  opcode: 0xdc,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.CY) === 1) {
      CALL.execute.bind(this)()
    }
  }
}

export const CNC: Operation = {
  name: 'CNC',
  opcode: 0xd4,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.CY) === 0) {
      CALL.execute.bind(this)()
    }
  }
}

export const CZ: Operation = {
  name: 'CZ',
  opcode: 0xcc,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.Z) === 1) {
      CALL.execute.bind(this)()
    }
  }
}

export const CNZ: Operation = {
  name: 'CNZ',
  opcode: 0xc4,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.Z) === 0) {
      CALL.execute.bind(this)()
    }
  }
}

export const CM: Operation = {
  name: 'CM',
  opcode: 0xfc,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.S) === 1) {
      CALL.execute.bind(this)()
    }
  }
}

export const CP: Operation = {
  name: 'CP',
  opcode: 0xf4,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.S) === 0) {
      CALL.execute.bind(this)()
    }
  }
}

export const CPE: Operation = {
  name: 'CPE',
  opcode: 0xec,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.P) === 1) {
      CALL.execute.bind(this)()
    }
  }
}

export const CPO: Operation = {
  name: 'CPO',
  opcode: 0xe4,
  size: 3,
  execute() {
    if (this.getFlagValue(Flag8080.P) === 0) {
      CALL.execute.bind(this)()
    }
  }
}

// Returns
export const RET: Operation = {
  name: 'RET',
  opcode: 0xc9,
  size: 1,
  execute() {
    const SP = this.getRegisterValue(Register8080.SP)
    const spData = this.getMemoryAt(SP)
    const sp1Data = this.getMemoryAt(SP + 1)
    this.setRegisterValue(Register8080.PC, (sp1Data << 8) | spData)
    this.setRegisterValue(Register8080.SP, SP + 2)
  }
}

export const RC: Operation = {
  name: 'RC',
  opcode: 0xd8,
  size: 1,
  execute() {
    if (this.getFlagValue(Flag8080.CY) === 1) {
      RET.execute.bind(this)()
    }
  }
}

export const RNC: Operation = {
  name: 'RNC',
  opcode: 0xd0,
  size: 1,
  execute() {
    if (this.getFlagValue(Flag8080.CY) === 0) {
      RET.execute.bind(this)()
    }
  }
}

export const RZ: Operation = {
  name: 'RZ',
  opcode: 0xc8,
  size: 1,
  execute() {
    if (this.getFlagValue(Flag8080.Z) === 1) {
      RET.execute.bind(this)()
    }
  }
}

export const RNZ: Operation = {
  name: 'RNZ',
  opcode: 0xc0,
  size: 1,
  execute() {
    if (this.getFlagValue(Flag8080.Z) === 0) {
      RET.execute.bind(this)()
    }
  }
}

export const RM: Operation = {
  name: 'RM',
  opcode: 0xf8,
  size: 1,
  execute() {
    if (this.getFlagValue(Flag8080.S) === 1) {
      RET.execute.bind(this)()
    }
  }
}

export const RP: Operation = {
  name: 'RP',
  opcode: 0xf0,
  size: 1,
  execute() {
    if (this.getFlagValue(Flag8080.S) === 0) {
      RET.execute.bind(this)()
    }
  }
}

export const RPE: Operation = {
  name: 'RPE',
  opcode: 0xe8,
  size: 1,
  execute() {
    if (this.getFlagValue(Flag8080.P) === 1) {
      RET.execute.bind(this)()
    }
  }
}

export const RPO: Operation = {
  name: 'RPO',
  opcode: 0xe0,
  size: 1,
  execute() {
    if (this.getFlagValue(Flag8080.P) === 0) {
      RET.execute.bind(this)()
    }
  }
}

// Restart 0 - 7
// TODO

export const PCHL: Operation = {
  name: 'PCHL',
  opcode: 0xe9,
  size: 1,
  execute() {
    const H = this.getRegisterValue(Register8080.H)
    const L = this.getRegisterValue(Register8080.L)
    this.setRegisterValue(Register8080.PC, (H << 8) | L)
  }
}
