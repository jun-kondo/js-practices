#!/usr/bin/env node
import { CommandParser } from "./command_parser.js";
import { Memo } from "./memo.js";
import { MemoCrud } from "./memo_crud.js";
import { DbManager } from "./db_manager.js";

export class MemoApp {
  #commandParser;
  #dbManager;
  #memoService;
  constructor() {
    this.#commandParser = new CommandParser();
    this.#dbManager = new DbManager("memo_app.db");
    this.#memoService = new MemoCrud(this.#dbManager);
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
    const options = this.#commandParser.parseOptions();
    if (options.list) {
      await this.#memoService.listMemos();
    } else if (options.read) {
      await this.#memoService.readMemo();
    } else if (options.delete) {
      await this.#memoService.deleteMemo();
    } else {
      const inputText = await this.#handleInput();
      await this.#memoService.createMemo(new Memo(inputText));
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
