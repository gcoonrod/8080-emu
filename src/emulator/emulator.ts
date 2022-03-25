import { CPU } from "../cpu/cpu";
import { MappedMemory, RAM, ROM } from "../cpu/memory";

type Skip = {
  address: number,
  size: number
}

export type EmulatorOptions = {
  cpu: CPU,
  rom?: {
    device: ROM,
    start: number,
    end: number
  },
  ram?: {
    device: RAM,
    start: number,
    end: number
  },
  skips?: Skip[]
}

export class Emulator {
  private cpu: CPU
  private memory: MappedMemory
  private skips: Skip[]

  constructor(options: EmulatorOptions) {
    this.cpu = options.cpu
    this.memory = new MappedMemory()
    if (options.rom) {
      this.memory.map(options.rom.device, options.rom.start, options.rom.end - options.rom.start)
    }
    if (options.ram) {
      this.memory.map(options.ram.device, options.ram.start, options.ram.end - options.ram.start)
    }
    this.skips = options.skips ?? []
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