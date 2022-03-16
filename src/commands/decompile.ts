import { readFile } from 'fs/promises'

import { lookup } from '../opcodes'

export const decompile = async (file: string) => {
  try {
    const contents = await readFile(file, { encoding: 'hex' })
    const buffer = Buffer.from(contents, 'hex')

    let pc: number = 0
    while (pc < buffer.length) {
      const byte = buffer[pc]
      const opCode = lookup(byte)
      if (!opCode) {
        console.log(`No Op Code found for [${byte.toString(16)}]`)
      }
      if (opCode?.size === 1) {
        console.log(`${opCode.name}`)
      } else if (opCode?.size === 2) {
        pc++
        const data = buffer[pc]
        console.log(`${opCode.name}\t[0x${data.toString(16)}]`)
      } else if (opCode?.size === 3) {
        pc++
        const data1 = buffer[pc]
        pc++
        const data2 = buffer[pc]
        console.log(`${opCode.name}\t[0x${data2.toString(16)},0x${data1.toString(16)}]`)
      }
      pc++
    }
  } catch (error) {
    console.error((error as Error))
  }
}