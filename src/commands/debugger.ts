// TODO Build a step through debugger
// Features
// debugger [file] -l (number) 
// show 

import { readFile } from 'fs/promises'
import { CPU } from '../cpu/cpu'
import { MappedMemory, RAM, ROM } from '../cpu/memory'

export const debug = async (file: string) => {

  const romData = await readFile(file, { encoding: 'hex'})
  const romBuffer = Buffer.from(romData)

  const rom = new ROM(romData.length)
  rom.load(Array.from(romBuffer))

  const ram = new RAM(0x1ff)
  ram.load(Array.from(new Uint8Array().fill(0)))
  
  const memory = new MappedMemory()
  memory.map(rom, 0x0000, romData.length)
  memory.map(ram, 0x2000, 0x1fff)
  console.log(memory)


  const cpu = new CPU({ debug: true })
  cpu.initializeMemory(memory)

  for (let i = 0; i < 25; i++) {
    cpu.cycle()
  } 
}