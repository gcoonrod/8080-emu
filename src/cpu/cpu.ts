import { MappedMemory } from "./memory";
import { getOperation, NOP, Operation } from "./operations";
import { Register } from "./register";

type RegisterDef = {
  size: 0xff | 0xffff | 0xffffffff
  public: boolean
  name: string
}

type CPURegister = {
  reg: Register
} & Omit<RegisterDef, 'name'>

type CPUFlag = {
  value: boolean
}

export const enum Flag8080 {
  Z = 'Z', CY = 'CY', S = 'S', P = 'P', AC = 'AC'
}

export const enum Register8080 {
  PC = 'PC', SP = 'SP', IR = 'IR', A = 'A',
  B = 'B', C = 'C', D = 'D', E = 'E',
  H = 'H', L = 'L', W = 'W', Z = 'Z'
}

export type CPUOptions = {
  debug?: boolean
}

export type OperationOverride = {
  opcode: number,
  predicate: (this: CPU, op: Operation) => boolean,
  execute: (this: CPU, resume: boolean) => void
}

export class CPU {
  // Registers, memory, IO
  private registers: Map<Register8080, CPURegister>
  private flags: Map<Flag8080, CPUFlag>
  private memory: MappedMemory

  private debug: boolean = false
  private interruptsEnabled: boolean = false
  private halted: boolean = false

  private _pc: number = 0

  private operation: Operation
  private overrides: OperationOverride[]

  constructor({ debug }: CPUOptions) {
    if (debug) {
      this.debug = debug
    }
    this.registers = new Map<Register8080, CPURegister>()
    this.registers.set(Register8080.IR, { size: 0xff, public: false, reg: new Register(0, 0xff) })
    this.registers.set(Register8080.PC, { size: 0xffff, public: true, reg: new Register(0, 0xffff) })
    this.registers.set(Register8080.SP, { size: 0xffff, public: true, reg: new Register(0, 0xffff) })
    this.registers.set(Register8080.A, { size: 0xff, public: true, reg: new Register(0, 0xff) })
    this.registers.set(Register8080.B, { size: 0xff, public: true, reg: new Register(0, 0xff) })
    this.registers.set(Register8080.C, { size: 0xff, public: true, reg: new Register(0, 0xff) })
    this.registers.set(Register8080.D, { size: 0xff, public: true, reg: new Register(0, 0xff) })
    this.registers.set(Register8080.E, { size: 0xff, public: true, reg: new Register(0, 0xff) })
    this.registers.set(Register8080.H, { size: 0xff, public: true, reg: new Register(0, 0xff) })
    this.registers.set(Register8080.L, { size: 0xff, public: true, reg: new Register(0, 0xff) })
    this.registers.set(Register8080.W, { size: 0xff, public: false, reg: new Register(0, 0xff) })
    this.registers.set(Register8080.Z, { size: 0xff, public: false, reg: new Register(0, 0xff) })

    this.flags = new Map<Flag8080, CPUFlag>()
    this.flags.set(Flag8080.Z, { value: false })
    this.flags.set(Flag8080.CY, { value: false })
    this.flags.set(Flag8080.S, { value: false })
    this.flags.set(Flag8080.P, { value: false })
    this.flags.set(Flag8080.AC, { value: false })

    this.memory = new MappedMemory()
    this.operation = NOP
    this.overrides = []
  }

  public enableInterrupts() {
    this.interruptsEnabled = true
  }

  public disableInterrupts() {
    this.interruptsEnabled = false
  }

  public halt() {
    this.halted = true
  }

  public isHalted() {
    return this.halted
  }

  public registerOverride(override: OperationOverride) {
    this.overrides.push(override)
  }

  public printRegisters() {
    const line1 = `PC=0x${this.registers.get(Register8080.PC)!.reg} SP=0x${this.registers.get(Register8080.SP)!.reg}`
    const line2 = `A=0x${this.registers.get(Register8080.A)!.reg} B=0x${this.registers.get(Register8080.B)!.reg} C=0x${this.registers.get(Register8080.C)!.reg}`
    const line3 = `D=0x${this.registers.get(Register8080.D)!.reg} E=0x${this.registers.get(Register8080.E)!.reg} H=0x${this.registers.get(Register8080.H)!.reg} L=0x${this.registers.get(Register8080.L)!.reg}`
    const line4 = `W=0x${this.registers.get(Register8080.W)!.reg} Z=0x${this.registers.get(Register8080.Z)!.reg}`
    return `${line1} ${line2} ${line3} ${line4}`
  }

  public getRegisterValue(register: Register8080) {
    return this.registers.get(register)!.reg.get()
  }

  public setRegisterValue(register: Register8080, value: number) {
    const _register = this.registers.get(register)
    if (_register && _register.public) {
      if (value <= _register.size) {
        _register.reg.set(value)
      } else {
        _register.reg.set((value & 0x00ff))
      }
    } else {
      if (this.debug) {
        console.log(`Illegal write attempt to register [${register}]`)
      }
    }
  }

  public incrementRegister(register: Register8080) {
    this.registers.get(register)!.reg.add(1)
    const newValue = this.getRegisterValue(register)
    this.updateFlagsNoCY(newValue)
  }

  public decrementRegister(register: Register8080) {
    this.registers.get(register)!.reg.dec(1)
    const newValue = this.getRegisterValue(register)
    this.updateFlagsNoCY(newValue)
  }

  private getNextByte() {
    return this.memory.getUint8(this.registers.get(Register8080.PC)!.reg.get())
  }

  private parity(x: number, size: number) {
    let p = 0
    x = (x & ((1 << size) - 1))
    for (let i = 0; i < size; i++) {
      if (x & 0x1) {
        p++
      }
      x = x >> 1
    }
    return (0 === (p & 0x1))
  }

  public initializeMemory(memory: MappedMemory) {
    this.memory = memory
  }

  public getFlag(flag: Flag8080) {
    return this.flags.get(flag) ?? { value: false }
  }

  public getFlagValue(flag: Flag8080) {
    const f = this.getFlag(flag)
    return (f.value ? 1 : 0)
  }

  public updateFlags(result: number) {
    const CY = (result >= 0x100 || result < 0)
    const Z = ((result & 0xff) === 0)
    const S = (0x80 === (result & 0x80))
    const P = this.parity(result & 0xff, 8)

    this.setFlag(Flag8080.CY, CY)
    this.setFlag(Flag8080.Z, Z)
    this.setFlag(Flag8080.S, S)
    this.setFlag(Flag8080.P, P)
  }

  public updateFlagsLogical() {
    this.setFlag(Flag8080.CY, false)
    this.setFlag(Flag8080.AC, false)
    const A = this.getRegisterValue(Register8080.A)
    this.setFlag(Flag8080.Z, A === 0)
    this.setFlag(Flag8080.S, (0x80 === (A & 0x80)))
    this.setFlag(Flag8080.P, this.parity(A, 8))

  }

  public updateFlagsNoCY(result: number) {
    const Z = ((result & 0xff) === 0)
    const S = (0x80 === (result & 0x80))
    const P = this.parity(result & 0xff, 8)

    this.setFlag(Flag8080.Z, Z)
    this.setFlag(Flag8080.S, S)
    this.setFlag(Flag8080.P, P)
  }

  public setFlag(flag: Flag8080, value: boolean) {
    this.flags.get(flag)!.value = value
  }

  public getMemoryAt(address: number) {
    return this.memory.getUint8(address)
  }

  public getMemoryHL() {
    const address = (this.getRegisterValue(Register8080.H) << 8) | this.getRegisterValue(Register8080.L)
    return this.getMemoryAt(address)
  }

  public setMemoryAt(address: number, byte: number) {
    this.memory.setUint8(address, byte)
  }

  public setMemoryHL(byte: number) {
    const address = (this.getRegisterValue(Register8080.H) << 8) | this.getRegisterValue(Register8080.L)
    this.setMemoryAt(address, byte)
  }

  public getPortIn(port: number) {
    return 0
  }

  public setPortOut(port: number, value: number) {
    return
  }

  public printState() {
    let opLog = `0x${(this._pc).toString(16).padStart(4, '0')}:\t[${this.operation.opcode.toString(16).padStart(2, '0')}] ${this.operation.name}\t`
    if (this.operation.size > 1) {
      opLog = opLog + ` 0x${this.getRegisterValue(Register8080.W).toString(16).padStart(2, '0')}`
    }
    if (this.operation.size > 2) {
      opLog = opLog + ` 0x${this.getRegisterValue(Register8080.Z).toString(16).padStart(2, '0')}`
    }
    let flagLog = `\t\t\t\t\tZ=${this.getFlagValue(Flag8080.Z)} `
    flagLog += `S=${this.getFlagValue(Flag8080.S)} `
    flagLog += `P=${this.getFlagValue(Flag8080.P)} `
    flagLog += `CY=${this.getFlagValue(Flag8080.CY)} `
    flagLog += `AC=${this.getFlagValue(Flag8080.AC)}`
    console.log(`${opLog}${this.operation.size > 2 ? '\t' : '\t\t'}${this.printRegisters()}`)
    console.log(flagLog)
  }

  private fetch() {
    const op = this.getNextByte()
    this._pc = this.getRegisterValue(Register8080.PC)
    this.registers.get(Register8080.IR)!.reg.set(op)
    this.registers.get(Register8080.PC)!.reg.add(1)
  }

  private decode() {
    this.operation = getOperation(this.getRegisterValue(Register8080.IR))
  }

  private readMemory1() {
    if (this.operation.size > 1) {
      const data = this.getNextByte()
      this.registers.get(Register8080.W)!.reg.set(data)
      this.registers.get(Register8080.PC)!.reg.add(1)
    }
  }

  private readMemory2() {
    if (this.operation.size > 2) {
      const data = this.getNextByte()
      this.registers.get(Register8080.Z)!.reg.set(data)
      this.registers.get(Register8080.PC)!.reg.add(1)
    }
  }

  private execute() {
    if (this.debug) {
      this.printState()
    }
    this.operation.execute.bind(this)()
  }

  public cycle() {
    this.fetch()
    this.decode()
    this.readMemory1()
    this.readMemory2()
    const overrides = this.overrides
      .filter(o => o.opcode === this.operation.opcode)
      .filter(o => o.predicate.bind(this)(this.operation))
    if (overrides.length === 1) {
      overrides[0].execute.bind(this)(false)
    } else {
      this.execute()
    }
  }
}
