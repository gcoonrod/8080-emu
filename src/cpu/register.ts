export class Register {
  value: number
  size: number

  constructor(initialValue: number = 0, size = 0xff) {
    if (initialValue > size) {
      throw new Error('Initial value exceeds register capacity')
    }
    this.value = initialValue
    this.size = size
  }

  public get() {
    return this.value
  }

  public toString() {
    return this.value.toString(16)
  }

  public set(value: number) {
    if (value > this.size) {
      throw new Error('Value exceeds register capacity')
    }
    this.value= value
  }

  public add(value: number) {
    if (value > this.size) {
      throw new Error('Value exceeds register capacity')
    }

    let result = value + this.value
    if (result > this.size) {
      result = result - this.size
    }
    
    this.value = result
  }

  public dec(value: number) {
    if (Math.abs(value) > this.size) {
      throw new Error('Value exceeds register capacity')
    }

    let result = this.value - value
    if (result < 0) {
      result = (this.size + 1) - Math.abs(result)
    }

    this.value = result
  }
}

export const getRegisterU8 = (initial = 0) => {
  return new Register(initial, 0xff)
}

export const getRegisterU16 = (initial = 0) => {
  return new Register(initial, 0xffff)
}