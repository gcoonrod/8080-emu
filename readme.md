# 8080-EMU
Intel 8080 Emulator project in Typescript.

## How To Use
This emulator was built following the instructions on [Emulator 101](http://www.emulator101.com/welcome.html) and inspired by the work of [LowLevelJavaScript](https://github.com/LowLevelJavaScript) and the [16-Bit-Virtual-Machine](https://github.com/LowLevelJavaScript/16-Bit-Virtual-Machine). To use it you will need to find a copy of the Space Invaders ROM and put the files in `./roms/invaders`. 

 - Edit `./src/index.ts` to use the `Invaders` emulator (`./src/emulator/invaders.ts`).
 - Build the source: `npm run build`
 - Start the emulator; `npm start`