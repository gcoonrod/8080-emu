import { readFile } from "fs/promises"
import { getOperation, Operation } from "../cpu"

export const disassemble = async (file: string) => {
  const rawData = await readFile(file, { encoding: 'hex' })
  const ops = Array.from(Buffer.from(rawData, 'hex'))
  const skips = {
    'bf7': '1400',
    '19be': '19d1',
    '1a11': '1a32'
  } as { [name: string]: string }

  for (let pc = 0; pc < 0x1a93; pc++) {
    const pcStr = pc.toString(16)
    if (skips[pcStr]) {
      pc = parseInt(skips[pcStr], 16)
    }
    const op: Operation = getOperation(ops[pc])
    let line = `0x${pc.toString(16).padStart(4, '0')}:\t${op.name}\t`
    if (op.size > 1) {
      pc++
      line += `0x${ops[pc].toString(16).padStart(2, '0')} `
    }
    if (op.size > 2) {
      pc++
      line += `0x${ops[pc].toString(16).padStart(2, '0')}`
    }
    console.log(line)
  }
}