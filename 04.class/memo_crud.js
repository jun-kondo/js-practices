import pkg from "enquirer";

const { Select } = pkg;

export class MemoCrud {
  #dbManager;
  constructor(dbManager) {
    this.#dbManager = dbManager;
  }

  async createMemo(memo) {
    try {
      const result = await this.#dbManager.insertMemo(memo);
      console.log(result);
    } catch (error) {
      console.error("Error registering new memo: ", error);
    }
  }

  async listMemos() {
    try {
      const rows = await this.#dbManager.getAllMemos();
      if (rows.length === 0) {
        console.log("There are no registered memos.");
      } else {
        rows.forEach((row) => console.log(row.title));
      }
    } catch (error) {
      console.error("Error listing memos: ", error);
    }
  }

  async readMemo() {
    const choices = await this.#getMemoChoices();
    const message = "Choose a memo you want to read:";
    const selectedChoice = await this.#selectMemo(choices, message);
    if (selectedChoice) {
      const memoId = selectedChoice.value;
      try {
        const result = await this.#dbManager.getMemoContent(memoId);
        console.log(result);
      } catch (error) {
        console.error("Error reading memo: ", error);
      }
    }
  }

  async deleteMemo() {
    const choices = await this.#getMemoChoices();
    const message = "Choose a memo you want to delete:";
    const selectedChoice = await this.#selectMemo(choices, message);
    if (selectedChoice) {
      const memoId = selectedChoice.value;
      try {
        const result = await this.#dbManager.deleteMemo(memoId);
        console.log(result);
      } catch (error) {
        console.error("Error deleting memo: ", error);
      }
    }
  }

  async #getMemoChoices() {
    try {
      const rows = await this.#dbManager.getAllMemos();
      return rows.map((row) => ({
        name: row.title,
        value: row.id,
      }));
    } catch (error) {
      console.error("Error getting memo choices: ", error);
      return [];
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
