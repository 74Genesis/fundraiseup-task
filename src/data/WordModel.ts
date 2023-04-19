export default class WordModel {
  private word: string;

  constructor(word: string) {
    this.word = word;
  }

  getShuffled(): string {
    const res: string[] = [];
    this.word
      .slice()
      .split("")
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .forEach((l: string) => {
        res.push(l);
      });
    return res.join("");
  }

  getWord(): string {
    return this.word;
  }
}
