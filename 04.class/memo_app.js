#!/usr/bin/env node
import { CommandOption } from "./command_option.js";
import { Memo } from "./memo.js";
import { MemoStorage } from "./memo_storage.js";
import pkg from "enquirer";

const { Select } = pkg;

export class MemoApp {
  #commandOption;
  #memoStorage;
  constructor() {
    this.#commandOption = new CommandOption();
    this.#memoStorage = new MemoStorage("memo_app.db");
  }

  async execute() {
    try {
      await this.#memoStorage.setUpTable();
      const result = await this.#run();
      console.log(result);
    } catch (e) {
      if (e && e.code === "SQLITE_ERROR") {
        console.error(e.message);
      } else {
        throw e;
      }
    } finally {
      await this.#memoStorage.closeDb();
    }
  }

  async #run() {
    const options = this.#commandOption.parse();
    if (options.list) {
      return await this.#listMemos();
    } else if (options.read) {
      return await this.#readMemo();
    } else if (options.delete) {
      return await this.#deleteMemo();
    } else {
      const inputText = await this.#handleInput();
      return await this.#createMemo(new Memo(inputText));
    }
  }

  async #listMemos() {
    const rows = await this.#memoStorage.getAllMemos();
    if (rows.length === 0) {
      return "There are no registered memos.";
    } else {
      return rows.map((row) => row.title).join("\n");
    }
  }

  async #readMemo() {
    const choices = await this.#getMemoChoices();
    const message = "Choose a memo you want to read:";
    const selectedChoice = await this.#selectMemo(choices, message);
    if (selectedChoice) {
      const memoId = selectedChoice.value;
      return await this.#memoStorage.getMemoContent(memoId);
    }
  }

  async #deleteMemo() {
    const choices = await this.#getMemoChoices();
    const message = "Choose a memo you want to delete:";
    const selectedChoice = await this.#selectMemo(choices, message);
    if (selectedChoice) {
      const memoId = selectedChoice.value;
      return await this.#memoStorage.deleteMemo(memoId);
    }
  }

  async #getMemoChoices() {
    const rows = await this.#memoStorage.getAllMemos();
    return rows.map((row) => ({
      name: row.title,
      value: row.id,
    }));
  }

  async #selectMemo(choices, message) {
    if (choices.length === 0) {
      console.log("There are no registered memos.");
      return; // undefined
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

  #handleInput() {
    return new Promise((resolve) => {
      process.stdin.setEncoding("utf8");
      let text = "";
      process.stdin.on("data", (chunk) => (text += chunk));
      process.stdin.on("end", () => resolve(text));
    });
  }

  async #createMemo(memo) {
    return await this.#memoStorage.insertMemo(memo);
  }
}

const app = new MemoApp();
await app.execute();
