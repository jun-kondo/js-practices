#!/usr/bin/env node
import { CommandOption } from "./command_option.js";
import { Memo } from "./memo.js";
import { MemoStorage } from "./memo_storage.js";
import pkg from "enquirer";

const { Select } = pkg;

export class MemoApp {
  #commandOption;
  #memoStorage;
  // #memoCrud;
  constructor() {
    this.#commandOption = new CommandOption();
    this.#memoStorage = new MemoStorage("memo_app.db");
  }

  async execute() {
    try {
      await this.#memoStorage.setUpTable();
      await this.#run();
    } catch (e) {
      console.error(e.message);
    } finally {
      await this.#memoStorage.closeDb();
    }
  }

  async #run() {
    const options = this.#commandOption.parse();
    if (options.list) {
      await this.#listMemos();
    } else if (options.read) {
      await this.#readMemo();
    } else if (options.delete) {
      await this.#deleteMemo();
    } else {
      const inputText = await this.#handleInput();
      await this.#createMemo(new Memo(inputText));
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

  async #createMemo(memo) {
    try {
      const result = await this.#memoStorage.insertMemo(memo);
      console.log(result);
    } catch (e) {
      throw new Error(`Error registering new memo: ${e.message}`);
    }
  }

  async #listMemos() {
    try {
      const rows = await this.#memoStorage.getAllMemos();
      if (rows.length === 0) {
        console.log("There are no registered memos.");
      } else {
        rows.forEach((row) => console.log(row.title));
      }
    } catch (e) {
      throw new Error(`Error listing memos: ${e.message}`);
    }
  }

  async #readMemo() {
    const choices = await this.#getMemoChoices();
    const message = "Choose a memo you want to read:";
    const selectedChoice = await this.#selectMemo(choices, message);
    if (selectedChoice) {
      const memoId = selectedChoice.value;
      try {
        const result = await this.#memoStorage.getMemoContent(memoId);
        console.log(result);
      } catch (e) {
        throw new Error(`Error reading memo: ${e.message}`);
      }
    }
  }

  async #deleteMemo() {
    const choices = await this.#getMemoChoices();
    const message = "Choose a memo you want to delete:";
    const selectedChoice = await this.#selectMemo(choices, message);
    if (selectedChoice) {
      const memoId = selectedChoice.value;
      try {
        const result = await this.#memoStorage.deleteMemo(memoId);
        console.log(result);
      } catch (e) {
        throw new Error(`Error deleting memo: ${e.message}`);
      }
    }
  }

  async #getMemoChoices() {
    try {
      const rows = await this.#memoStorage.getAllMemos();
      return rows.map((row) => ({
        name: row.title,
        value: row.id,
      }));
    } catch (e) {
      throw new Error(`Error getting memo choices: ${e.message}`);
    }
  }

  async #selectMemo(choices, message) {
    if (choices.length === 0) {
      console.log("There are no registered memos.");
      return;
    }
    const prompt = new Select({
      type: "select",
      name: "title",
      message: message,
      choices: choices,
    });
    const answer = await prompt.run();
    return prompt.choices.find((choice) => choice.name === answer);
  }
}

const app = new MemoApp();
await app.execute();
