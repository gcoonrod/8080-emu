import { CPU } from "../src/cpu/cpu"
import { MappedMemory, RAM } from "../src/cpu/memory"

export const createTestCPU = () => {
  return new CPU({ debug: true })
}

export const createTestMemory = (start: number, size: number, data: number[]) => {
  const testRAM = new RAM(size)
  const testMem = new MappedMemory()
  testMem.map(testRAM, start, size)
  testMem.load(start, data)

  return testMem
}

export const cycleCPU = (testCPU: CPU) => {
  testCPU.cycle()
}