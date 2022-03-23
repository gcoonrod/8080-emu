import { Operation } from ".";

export const EI: Operation = {
  name: 'EI',
  opcode: 0xfb,
  size: 1,
  execute() {
    this.enableInterrupts()
  }
}

export const DI: Operation = {
  name: 'DI',
  opcode: 0xf3,
  size: 1,
  execute() {
    this.disableInterrupts()
  }
}

export const HLT: Operation = {
  name: 'HLT',
  opcode: 0x76,
  size: 1,
  execute() {
    this.halt()
  }
}