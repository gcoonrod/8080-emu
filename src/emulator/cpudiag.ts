import { readFile } from 'fs/promises'

import { CPU, Register8080 } from '../cpu/cpu'
import { RAM, ROM } from '../cpu/memory'
import { CALL, JMP } from '../cpu/operations/branching'
import { Emulator, ExecutionOptions } from './emulator'

export const CPUDiag = {
  run: async (options: ExecutionOptions) => {
    const cpuDiagData = await readFile('./roms/cpudiag/cpudiag.bin', { encoding: 'hex' })
    const cpuDiagArray = Array.from(Buffer.from(cpuDiagData, 'hex'))

    const ram = new RAM(0x2000)
    ram.load(cpuDiagArray)

    const cpu: CPU = new CPU({ debug: options.debug ?? false })
    const emulator = new Emulator({
      cpu: cpu,
      ram: {
        device: ram,
        start: 0x100,
        end: 0x2100
      }
    })

    // Set first instruction to JMP 0x100
    // cpu.setMemoryAt(0, 0xc3)
    // cpu.setMemoryAt(1, 0)
    // cpu.setMemoryAt(2, 0x01)
    cpu.setRegisterValue(Register8080.PC, 0x100)

    // Fix SP issue
    cpu.setMemoryAt(368, 0x7)

    // Skip DAA test
    cpu.setMemoryAt(0x59c, 0xc3)
    cpu.setMemoryAt(0x59d, 0xc2)
    cpu.setMemoryAt(0xf9e, 0x05)

    cpu.registerOverride({
      opcode: CALL.opcode,
      predicate(op) {
        const byte2 = this.getRegisterValue(Register8080.W)
        const byte3 = this.getRegisterValue(Register8080.Z)
        return 5 === ((byte3 << 8) | byte2)
      },
      execute(resume) {
        this.printState()
        if (this.getRegisterValue(Register8080.C) === 9) {
          const offset = (this.getRegisterValue(Register8080.D) << 8) | this.getRegisterValue(Register8080.E)
          let skip = 3
          let charCode = this.getMemoryAt(offset + skip)
          let message: string = ''
          while (String.fromCharCode(charCode) !== '$') {
            message += String.fromCharCode(charCode)
            charCode = this.getMemoryAt(offset + (skip++))
          }
          console.log(message)
        } else if (this.getRegisterValue(Register8080.C) === 0) {
          console.log('Print char routine called')
        }
      }
    })

    cpu.registerOverride({
      opcode: CALL.opcode,
      predicate(op) {
        const byte2 = this.getRegisterValue(Register8080.W)
        const byte3 = this.getRegisterValue(Register8080.Z)
        return 0 === ((byte3 << 8) | byte2)
      },
      execute(resume) {
        console.log('Quitting from override')
        process.exit(0)
      }
    })

    cpu.registerOverride({
      opcode: JMP.opcode,
      predicate(op) {
        const byte2 = this.getRegisterValue(Register8080.W)
        const byte3 = this.getRegisterValue(Register8080.Z)
        return 0 === ((byte3 << 8) | byte2)
      },
      execute(resume) {
        const H = this.getRegisterValue(Register8080.H)
        const L = this.getRegisterValue(Register8080.L)
        const address = (H << 8) | L
        console.log(`CPU HAS FAILED, ERROR EXIT=0x${address.toString(16).padStart(4, '0')}`)
        process.exit(-1)
      }
    })

    emulator.start()
  }
}