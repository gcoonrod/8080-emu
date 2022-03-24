import { CPU, Flag8080, Register8080 } from '../../../src/cpu/cpu'
import { MappedMemory, RAM } from '../../../src/cpu/memory'
import * as dtOps from '../../../src/cpu/operations/dataTransfer'

import { createTestCPU, createTestMemory } from '../../utils'

describe('Data Transfer Operations Tests', () => { 
  test('MOV B,B', () => {
    const testCPU = createTestCPU()
    expect(testCPU.getRegisterValue(Register8080.B)).toBe(0)
    testCPU.setRegisterValue(Register8080.B, 0x11)
    dtOps.MOV_BB.execute.bind(testCPU)()
    expect(testCPU.getRegisterValue(Register8080.B)).toBe(0x11)
  })

  test('MOV B,C', () => {
    const testCPU = createTestCPU()
    expect(testCPU.getRegisterValue(Register8080.B)).toBe(0)
    testCPU.setRegisterValue(Register8080.C, 0x11)
    dtOps.MOV_BC.execute.bind(testCPU)()
    expect(testCPU.getRegisterValue(Register8080.B)).toBe(0x11)
  })

  test('MOV B,M', () => {
    const testCPU = createTestCPU()
    const testMemArr = [0,0,0, 0x11, 0x22, 0]
    const testMemory = createTestMemory(0x1000, 0x500, testMemArr)

    // Setup
    const hlAddr = 0x1003
    testCPU.initializeMemory(testMemory)
    testCPU.setRegisterValue(Register8080.H, hlAddr >> 8)
    testCPU.setRegisterValue(Register8080.L, hlAddr & 0x00ff)
    expect(testCPU.getRegisterValue(Register8080.H)).toBe(0x10)
    expect(testCPU.getRegisterValue(Register8080.L)).toBe(0x03)
    expect(testCPU.getRegisterValue(Register8080.B)).toBe(0)

    // Execute
    dtOps.MOV_BM.execute.bind(testCPU)()
    expect(testCPU.getRegisterValue(Register8080.B)).toBe(0x11)
  })

  test('MOV M,B', () => {
    const testCPU = createTestCPU()
    const testMemArr = [0,0,0, 0x11, 0x22, 0]
    const testMemory = createTestMemory(0x1000, 0x500, testMemArr)

    // Setup
    const hlAddr = 0x1003
    testCPU.initializeMemory(testMemory)
    testCPU.setRegisterValue(Register8080.H, hlAddr >> 8)
    testCPU.setRegisterValue(Register8080.L, hlAddr & 0x00ff)
    testCPU.setRegisterValue(Register8080.B, 0x33)
    expect(testCPU.getRegisterValue(Register8080.H)).toBe(0x10)
    expect(testCPU.getRegisterValue(Register8080.L)).toBe(0x03)

    // Execute
    dtOps.MOV_MB.execute.bind(testCPU)()
    expect(testCPU.getMemoryAt(hlAddr)).toBe(0x33)
  })

  test('MVI B', () => {
    const opCode = dtOps.MVI_B.opcode
    const byte2 = 0xfe
    const testCPU = createTestCPU()
    const testMemArr = [opCode, byte2, 0, 0x11, 0x22, 0]
    const testMemory = createTestMemory(0x1000, 0x500, testMemArr)
    testCPU.initializeMemory(testMemory)
    testCPU.setRegisterValue(Register8080.PC, 0x1000)

    expect(testCPU.getRegisterValue(Register8080.W)).toBe(0)
    testCPU.cycle()
    expect(testCPU.getRegisterValue(Register8080.W)).toBe(byte2)
    expect(testCPU.getRegisterValue(Register8080.B)).toBe(byte2)
  })

  test('MVI M', () => {
    const opCode = dtOps.MVI_M.opcode
    const byte2 = 0xfe
    const testCPU = createTestCPU()
    const hlAddr = 0x1003
    const testMemArr = [opCode, byte2, 0, 0x11, 0x22, 0]
    const testMemory = createTestMemory(0x1000, 0x500, testMemArr)
    testCPU.initializeMemory(testMemory)
    testCPU.setRegisterValue(Register8080.PC, 0x1000)
    testCPU.setRegisterValue(Register8080.H, hlAddr >> 8)
    testCPU.setRegisterValue(Register8080.L, hlAddr & 0x00ff)

    expect(testCPU.getRegisterValue(Register8080.W)).toBe(0)
    testCPU.cycle()
    expect(testCPU.getRegisterValue(Register8080.W)).toBe(byte2)
    expect(testCPU.getMemoryAt(hlAddr)).toBe(byte2)
  })

  test('LXI_B', () => {
    const opCode = dtOps.LXI_B.opcode
    const byte2 = 0xbe
    const byte3 = 0xef
    const testMemArr = [opCode, byte2, byte3]
    const testMemory = createTestMemory(0x1000, 0x500, testMemArr)
    const testCPU = createTestCPU()
    testCPU.initializeMemory(testMemory)
    testCPU.setRegisterValue(Register8080.PC, 0x1000)
    testCPU.cycle()
    expect(testCPU.getRegisterValue(Register8080.W)).toBe(byte2)
    expect(testCPU.getRegisterValue(Register8080.Z)).toBe(byte3)
    expect(testCPU.getRegisterValue(Register8080.B)).toBe(byte3)
    expect(testCPU.getRegisterValue(Register8080.C)).toBe(byte2)
  })

  test('LXI_SP', () => {
    const opCode = dtOps.LXI_SP.opcode
    const byte2 = 0xbe
    const byte3 = 0xef
    const testMemArr = [opCode, byte2, byte3]
    const testMemory = createTestMemory(0x1000, 0x500, testMemArr)
    const testCPU = createTestCPU()
    testCPU.initializeMemory(testMemory)
    testCPU.setRegisterValue(Register8080.PC, 0x1000)
    testCPU.cycle()
    expect(testCPU.getRegisterValue(Register8080.W)).toBe(byte2)
    expect(testCPU.getRegisterValue(Register8080.Z)).toBe(byte3)
    expect(testCPU.getRegisterValue(Register8080.SP)).toBe((byte3 << 8) | byte2)
  })

  test('LDA', () => {
    const opCode = dtOps.LDA.opcode
    const byte2 = 0x03
    const byte3 = 0x10
    const testMemArr = [opCode, byte2, byte3, 0xff]
    const testMemory = createTestMemory(0x1000, 0x500, testMemArr)
    const testCPU = createTestCPU()
    testCPU.initializeMemory(testMemory)
    testCPU.setRegisterValue(Register8080.PC, 0x1000)
    testCPU.cycle()
    expect(testCPU.getRegisterValue(Register8080.W)).toBe(byte2)
    expect(testCPU.getRegisterValue(Register8080.Z)).toBe(byte3)
    expect(testCPU.getRegisterValue(Register8080.A)).toBe(0xff)
  })

  test('STA', () => {
    const opCode = dtOps.STA.opcode
    const byte2 = 0x03
    const byte3 = 0x10
    const testMemArr = [opCode, byte2, byte3, 0xff]
    const testMemory = createTestMemory(0x1000, 0x500, testMemArr)
    const testCPU = createTestCPU()
    testCPU.initializeMemory(testMemory)
    testCPU.setRegisterValue(Register8080.PC, 0x1000)
    testCPU.setRegisterValue(Register8080.A, 0xee)
    testCPU.cycle()
    expect(testCPU.getRegisterValue(Register8080.W)).toBe(byte2)
    expect(testCPU.getRegisterValue(Register8080.Z)).toBe(byte3)
    expect(testCPU.getMemoryAt(0x1003)).toBe(0xee)
  })

  test('LDAX_B', () => {
    const opCode = dtOps.LDAX_B.opcode
    const testMemArr = [opCode, 0, 0, 0xff]
    const testMemory = createTestMemory(0x1000, 0x500, testMemArr)
    const testCPU = createTestCPU()
    testCPU.initializeMemory(testMemory)
    testCPU.setRegisterValue(Register8080.PC, 0x1000)
    testCPU.setRegisterValue(Register8080.B, 0x10)
    testCPU.setRegisterValue(Register8080.C, 0x03)
    testCPU.cycle()
    expect(testCPU.getRegisterValue(Register8080.A)).toBe(0xff)
  })

  test('STAX B', () => {
    const opCode = dtOps.STAX_B.opcode
    const testMemArr = [opCode, 0, 0, 0xff]
    const testMemory = createTestMemory(0x1000, 0x500, testMemArr)
    const testCPU = createTestCPU()
    testCPU.initializeMemory(testMemory)
    testCPU.setRegisterValue(Register8080.PC, 0x1000)
    testCPU.setRegisterValue(Register8080.A, 0x11)
    testCPU.setRegisterValue(Register8080.B, 0x10)
    testCPU.setRegisterValue(Register8080.C, 0x03)
    testCPU.cycle()
    expect(testCPU.getMemoryAt(0x1003)).toBe(0x11)
  })
})