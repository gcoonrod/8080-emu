import { readFile } from 'fs/promises'

import { CPU, Register8080 } from '../cpu/cpu'
import { RAM, ROM } from '../cpu/memory'
import { Emulator, EmulatorOptions, ExecutionOptions } from './emulator'

export const Invaders = {
  run: async (options: ExecutionOptions) => {
    const invadersH = await readFile('./roms/invaders/invaders.h', { encoding: 'hex' })
    const invadersG = await readFile('./roms/invaders/invaders.g', { encoding: 'hex' })
    const invadersF = await readFile('./roms/invaders/invaders.f', { encoding: 'hex' })
    const invadersE = await readFile('./roms/invaders/invaders.e', { encoding: 'hex' })
    const invadersRomData = invadersH + invadersG + invadersF + invadersE
    const invadersArray = Array.from(Buffer.from(invadersRomData, 'hex'))
  
    const rom = new ROM(0x2000)
    rom.load(invadersArray)
  
    const ram = new RAM(0xdfff)
    const ramArray = new Uint8Array(0xdfff).fill(0)
    ram.load(Array.from(ramArray))
  
    const cpu: CPU = new CPU(({ debug: options.debug ?? false }))
    const emulator: Emulator = new Emulator({
      cpu: cpu,
      rom: {
        device: rom,
        start: 0,
        end: 0x1fff
      },
      ram: {
        device: ram,
        start: 0x2000,
        end: 0xffff
      }
    })
  
    
    let pc = cpu.getRegisterValue(Register8080.PC)
    emulator.start()
  }
}