#!/usr/bin/env node
import { CommandOption } from "./command_option.js";
import { Memo } from "./memo.js";
import { MemoCrud } from "./memo_crud.js";
import { DbManager } from "./db_manager.js";

export class MemoApp {
  #commandOption;
  #dbManager;
  #memoCrud;
  constructor() {
    this.#commandOption = new CommandOption();
    this.#dbManager = new DbManager("memo_app.db");
    this.#memoCrud = new MemoCrud(this.#dbManager);
  }

  async execute() {
    try {
      await this.#dbManager.setUpTable();
      await this.#run();
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      await this.#dbManager.closeDb();
    }
  }

  async #run() {
    const options = this.#commandOption.parse();
    if (options.list) {
      await this.#memoCrud.listMemos();
    } else if (options.read) {
      await this.#memoCrud.readMemo();
    } else if (options.delete) {
      await this.#memoCrud.deleteMemo();
    } else {
      const inputText = await this.#handleInput();
      await this.#memoCrud.createMemo(new Memo(inputText));
    }
  }

  #handleInput() {
    return new Promise((resolve) => {
      process.stdin.setEncoding("utf8");
      let text = "";
      process.stdin.on("data", (chunk) => (text += chunk));
      process.stdin.on("end", () => resolve(text));
    });
  }
}

const app = new MemoApp();
await app.execute();
