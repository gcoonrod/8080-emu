import { CPU, Flag8080, Register8080 } from '../../../src/cpu/cpu'
import * as mathOp from '../../../src/cpu/operations/arithmetic'
import { createTestCPU, createTestMemory, TestCase } from '../../utils';

const testCases: TestCase[] = [
  {
    operation: mathOp.ADI,
    name: mathOp.ADI.name,
    memory: [mathOp.ADI.opcode, 0xfe],
    preconditions: [
      [Register8080.A, 0xf7],
      [Flag8080.S, false]
    ],
    expectations: [
      [Register8080.A, 0xf5],
      [Flag8080.CY, true],
      [Flag8080.P, true],
      [Flag8080.S, true],
      [Flag8080.Z, false]
    ]
  },
  {
    operation: mathOp.SUI,
    name: 'SUI set carry',
    memory: [mathOp.SUI.opcode, 0x0f],
    preconditions: [
      [Register8080.A, 0xff]
    ],
    expectations: [
      [Register8080.A, 0xf0],
      [Flag8080.CY, true]
    ]
  },
  {
    operation: mathOp.SUI,
    name: 'SUI clear carry',
    memory: [mathOp.SUI.opcode, 0x0c],
    preconditions: [
      [Register8080.A, 0x0b]
    ],
    expectations: [
      [Register8080.A, 0xff],
      [Flag8080.CY, false]
    ]
  },
  {
    operation: mathOp.SBI,
    name: 'SBI with carry set',
    memory: [mathOp.SBI.opcode, 0x0e],
    preconditions: [
      [Register8080.A, 0xff],
      [Flag8080.CY, true]
    ],
    expectations: [
      [Register8080.A, 0xf0],
      [Flag8080.CY, false]
    ]
  }
]

describe('Arithmetic Operations Tests', () => {
  test('DAD B', () => {
    const testCPU = new CPU({ debug: false });
    testCPU.setRegisterValue(Register8080.B, 0x33)
    testCPU.setRegisterValue(Register8080.C, 0x9f)
    testCPU.setRegisterValue(Register8080.H, 0xa1)
    testCPU.setRegisterValue(Register8080.L, 0x7b)
    testCPU.setFlag(Flag8080.CY, true)
    mathOp.DAD_B.execute.bind(testCPU)()
    expect(testCPU.getRegisterValue(Register8080.H)).toBe(0xd5)
    expect(testCPU.getRegisterValue(Register8080.L)).toBe(0x1a)
    expect(testCPU.getFlagValue(Flag8080.CY)).toBe(0)
  })

  for (const testCase of testCases) {
    test(testCase.name, () => {
      try {
        const opCode = testCase.operation.opcode
        const testMemory = createTestMemory(0, 0x500, testCase.memory)
        const testCPU = createTestCPU()
        testCPU.initializeMemory(testMemory)
        for (const condition of testCase.preconditions) {
          if (typeof condition[1] === 'number') {
            testCPU.setRegisterValue(condition[0] as Register8080, condition[1])
          } else if (typeof condition[1] === 'boolean') {
            testCPU.setFlag(condition[0] as Flag8080, condition[1])
          } else {
            throw new Error('Unexpected precondition!')
          }
        }
        testCPU.cycle()
        for (const condition of testCase.expectations) {
          try {
            if (typeof condition[1] === 'number') {
              expect(testCPU.getRegisterValue(condition[0] as Register8080)).toBe(condition[1])
            } else if (typeof condition[1] === 'boolean') {
              if (condition[1]) {
                expect(testCPU.getFlagValue(condition[0] as Flag8080)).toBeTruthy()
              } else {
                expect(testCPU.getFlagValue(condition[0] as Flag8080)).toBeFalsy()
              }
            } else {
              throw new Error('Unexpected expectation!')
            }
          } catch (error) {
            console.log(`FAIL: c=${condition[0]} e=${condition[1]}`)
            throw error
          }
        }
      } catch (error) {
        console.error(`Test Case: ${testCase.name} Memory:${testCase.memory}`)
        throw error
      }
    })
  }

  // test('ADI', () => {
  //   const opCode = mathOp.ADI.opcode
  //   const tetsMemArr = [opCode, 0xfe]
  //   const testMemory = createTestMemory(0x0, 0x500, tetsMemArr)
  //   const testCPU = createTestCPU()
  //   testCPU.initializeMemory(testMemory)
  //   testCPU.setRegisterValue(Register8080.A, 0xf7)
  //   testCPU.setFlag(Flag8080.S, false)
  //   testCPU.cycle()
  //   expect(testCPU.getRegisterValue(Register8080.A)).toBe(0xf5)
  //   expect(testCPU.getFlagValue(Flag8080.CY)).toBe(1)
  //   expect(testCPU.getFlagValue(Flag8080.P)).toBe(1)
  //   expect(testCPU.getFlagValue(Flag8080.S)).toBe(1)
  //   expect(testCPU.getFlagValue(Flag8080.Z)).toBe(0)
  // })

  // test('SUI', () => {
  //   const opCode = mathOp.SUI.opcode
  //   const tetsMemArr = [opCode, 0x0c]
  //   const testMemory = createTestMemory(0x0, 0x500, tetsMemArr)
  //   const testCPU = createTestCPU()
  //   testCPU.initializeMemory(testMemory)
  //   testCPU.setRegisterValue(Register8080.A, 0x0b)
  //   testCPU.setFlag(Flag8080.S, false)
  //   testCPU.cycle()
  //   expect(testCPU.getRegisterValue(Register8080.A)).toBe(0xff)
  //   expect(testCPU.getFlagValue(Flag8080.CY)).toBe(0)
  // })
})