import { Operation } from ".";
import { Register8080 } from "../cpu";

export const IN: Operation = {
  name: 'IN',
  opcode: 0xdb,
  size: 2,
  execute() {
    const port = this.getRegisterValue(Register8080.W)
    const data = this.getPortIn(port)
    this.setRegisterValue(Register8080.A, data)
  }
}

export const OUT: Operation = {
  name: 'OUT',
  opcode: 0xd3,
  size: 2,
  execute() {
    const A = this.getRegisterValue(Register8080.A)
    const port = this.getRegisterValue(Register8080.W)
    this.setPortOut(port, A)
  } 
}