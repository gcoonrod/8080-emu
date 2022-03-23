import { CPU } from "../cpu/cpu";
import { MappedMemory, RAM, ROM } from "../cpu/memory";

export type EmulatorOptions = {
  cpu: CPU,
  rom: {
    device: ROM,
    start: number,
    end: number
  },
  ram: {
    device: RAM,
    start: number,
    end: number
  }
}

export class Emulator {
  private cpu: CPU
  private memory: MappedMemory

  constructor(options: EmulatorOptions) {
    this.cpu = options.cpu
    this.memory = new MappedMemory()
    this.memory.map(options.rom.device, options.rom.start, options.rom.end - options.rom.start)
    this.memory.map(options.ram.device, options.ram.start, options.ram.end - options.ram.start)
    this.cpu.initializeMemory(this.memory)
  }

  public start() {
    while(!this.cpu.isHalted()) {
      this.cpu.cycle()
    }
  }

  public stop() {
    this.cpu.halt()
  }
}