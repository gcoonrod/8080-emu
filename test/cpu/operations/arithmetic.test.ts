import { CPU, Flag8080, Register8080 } from '../../../src/cpu/cpu'
import * as mathOp from '../../../src/cpu/operations/arithmetic'

describe('Arithmetic Operations Tests', () => {
  test('DAD B', () => {
    const testCPU = new CPU({debug: false});
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
})