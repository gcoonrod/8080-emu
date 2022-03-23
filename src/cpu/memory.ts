abstract class MemoryDevice {
  protected buffer: ArrayBuffer
  protected dataView: DataView
  protected bytes: Uint8Array

  constructor(size: number) {
    this.buffer = new ArrayBuffer(size)
    this.dataView = new DataView(this.buffer)
    this.bytes = new Uint8Array(this.buffer)
  }

  public load(data: number[]) {
    data.forEach((d, i) => this.dataView.setUint8(i, d))
  }

  public slice(from: number, to: number) {
    return this.bytes.slice(from, to)
  }

  public getUint8(byteOffset: number) {
    return this.dataView.getUint8(byteOffset)
  }

  public getUint16(byteOffset: number) {
    return this.dataView.getUint16(byteOffset)
  }

  public abstract setUint8(byteOffset: number, value: number): void
  public abstract setUint16(byteOffset: number, value: number): void
}

export class RAM extends MemoryDevice {
  public setUint8(byteOffset: number, value: number): void {
    return this.dataView.setUint8(byteOffset, value)
  }
  public setUint16(byteOffset: number, value: number): void {
    return this.dataView.setUint16(byteOffset, value)
  }
}

export class ROM extends MemoryDevice {
  public setUint8(byteOffset: number, value: number): void {
    return
  }
  public setUint16(byteOffset: number, value: number): void {
    return
  }
}

type Region = {
  start: number
  end: number
  device: MemoryDevice
}

export class MappedMemory {
  private regions: Region[]

  constructor() {
    this.regions = []
  }

  public map(device: MemoryDevice, start: number, size: number) {
    const region: Region = {
      device: device,
      start: start,
      end: start + size -1
    }

    this.regions.unshift(region)
    return () => {
      this.regions = this.regions.filter(x => x !== region)
    }
  }

  public findRegion(address: number) {
    const region = this.regions.find(r => address >= r.start && address <= r.end)
    if (!region) {
      throw new Error(`No memory region found for address [0x${address.toString(16)}]`)
    }
    return region
  }

  public getUint8(address: number) {
    const region = this.findRegion(address)
    return region.device.getUint8(address)
  }

  public getUint16(address: number) {
    return this.findRegion(address).device.getUint16(address)
  }

  public setUint8(address: number, value: number) {
    return this.findRegion(address).device.setUint8(address, value)
  }

  public setUint16(address: number, value: number) {
    return this.findRegion(address).device.setUint16(address, value)
  }

  public load(startAddress: number, data: number[]) {
    data.forEach((byte, offset) => this.setUint8(startAddress + offset, byte))
  }

}