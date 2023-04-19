import CardStat from "./CardStat";
import WordModel from "../../data/WordModel";
import Letter from "./Letter";

export interface CardOptions {
  word: WordModel;
  stat: CardStat;
}

export default class Card {
  public stat: CardStat;
  public word: WordModel;

  public answerLetters: Letter[] = [];
  public shuffleLetters: Letter[] = [];

  constructor(options: CardOptions) {
    this.stat = options.stat;
    this.word = options.word;

    this.word
      .getShuffled()
      .split("")
      .forEach((l) => {
        this.shuffleLetters.push(new Letter(l));
      });
  }

  /**
   * Change card state after input a new value.
   * Returns true on success and false on error
   */
  inputLetter(letter: string): boolean {
    const payload = this.answerLetters.map((v) => v.letter).join("") + letter;

    if (this.isMatch(payload)) {
      const index = this.shuffleLetters.map((v) => v.letter).indexOf(letter);
      this.shuffleLetters = this.shuffleLetters.filter((v, i) => i !== index);
      this.answerLetters.push(new Letter(letter, "success"));
      return true;
    } else {
      this.stat.addError();
      return false;
    }
  }

  /**
   * Retruns next correct letter for answer
   */
  getNextLetter(): string {
    const word = this.word.getWord();
    return word?.[this.answerLetters.length] || "";
  }

  showRightAnser() {
    this.answerLetters = [];
    this.word
      .getWord()
      .split("")
      .forEach((v) => {
        this.answerLetters.push(new Letter(v, "danger"));
      });
    this.shuffleLetters = [];
  }

  isCompleted() {
    return (
      this.word.getWord() === this.answerLetters.map((v) => v.letter).join("")
    );
  }

  isFail() {
    return this.stat.getErrorsCount() >= 3;
  }

  //is payload matching the word (from beginning of )
  isMatch(payload: string) {
    return !!this.word.getWord().match(new RegExp("^" + payload));
  }
}
