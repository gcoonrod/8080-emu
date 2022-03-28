import { CPU, Flag8080, Register8080 } from "../src/cpu/cpu"
import { MappedMemory, RAM } from "../src/cpu/memory"
import { Operation } from "../src/cpu/operations"

export type FlagCondition = [Flag8080, boolean]
export type RegisterCondition = [Register8080, number]
export type Condition = FlagCondition | RegisterCondition

export type TestCase = {
  name: string
  operation: Operation
  memory: number[]
  preconditions: Condition[]
  expectations: Condition[]
}

export const createTestCPU = () => {
  return new CPU({ debug: false })
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