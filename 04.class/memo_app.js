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
      if (e instanceof Error && e.message.includes("SQLITE_ERROR")) {
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
    if (Object.keys(options).length > 1) {
      return "More than two options cannot be used";
    }
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
    if (choices.length === 0) {
      return "There are no registered memos.";
    }
    const message = "Choose a memo you want to read:";
    const selectedMemoId = await this.#selectMemo(choices, message);
    return await this.#memoStorage.getMemoContent(selectedMemoId);
  }

  async #deleteMemo() {
    const choices = await this.#getMemoChoices();
    if (choices.length === 0) {
      return "There are no registered memos.";
    }
    const message = "Choose a memo you want to delete:";
    const selectedMemoId = await this.#selectMemo(choices, message);
    return await this.#memoStorage.deleteMemo(selectedMemoId);
  }

  async #getMemoChoices() {
    const rows = await this.#memoStorage.getAllMemos();
    return rows.map((row) => ({
      name: row.title,
      value: row.id,
    }));
  }

  async #selectMemo(choices, message) {
    const prompt = new Select({
      type: "select",
      message: message,
      choices: choices,
      result() {
        return this.focused.value;
      },
    });
    return await prompt.run();
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
