export class Memo {
  constructor(text) {
    this.content = text;
    this.title = this.#clipFirstLine(this.content);
  }

  #clipFirstLine(content) {
    return content.split("\n")[0];
  }
}
