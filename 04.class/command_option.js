import { Command } from "commander";

export class CommandOption {
  #options;
  constructor() {
    const program = new Command();
    program
      .option("-l, --list", "Display list of memos")
      .option("-r, --read", "Read memo")
      .option("-d, --delete", "Delete memo")
      .parse(process.argv);
    this.#options = program.opts();
  }

  parse() {
    return this.#options;
  }
}
