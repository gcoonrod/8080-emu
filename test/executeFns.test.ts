import { State8080 } from '../src/cpu'
import { getRegisterU8, getRegisterU16 } from '../src/cpu/register'
import { lookup, OpCode } from '../src/opcodes'
import * as executeFns from '../src/opcodes/executeFns'

const getInitialState = (): State8080 => ({
  a: getRegisterU8(), b: getRegisterU8(), 
  c: getRegisterU8(), d: getRegisterU8(),
  e: getRegisterU8(), h: getRegisterU8(), l: getRegisterU8(),
  sp: getRegisterU16(), pc: getRegisterU16(), memory: [],
  cc: {
    z: 0, p: 0, s: 0, cy: 0, ac: 0, pad: 0
  },
  intEnable: 0
})

describe('testing 8080 op execution functions', () => {
  test('NOP', () => {
    const initialState = getInitialState()
    expect(initialState.pc.get()).toBe(0)

    const finalState = executeFns.NOP(initialState)
    expect(initialState.a.get()).toBe(0)
    expect(finalState.pc.get()).toBe(1)
  })

  test('LXI B', () => {
    const initialState = getInitialState()
    const op = lookup(0x01) as OpCode
    const cpuOp = [op.code, 0x11, 0x22]
    initialState.memory.push(...cpuOp)
    
    const finalState = op.execute(initialState)
    expect(finalState.b.get()).toBe(0x22)
    expect(finalState.c.get()).toBe(0x11)
    expect(finalState.pc.get()).toBe(2)
  })

  test('DCR B', () => {
    const initialState = getInitialState()
    const op = lookup(0x05) as OpCode
    const finalState = op.execute(initialState)
    expect(finalState.b.get()).toBe(0xff)
    expect(finalState.pc.get()).toBe(1)
  })
})