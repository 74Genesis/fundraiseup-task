import WordModel from "./../../data/WordModel";
import CardStat from "./CardStat";
import GameStat from "./GameStat";
import Card from "./Card";

export interface GameOptions {
  words: WordModel[];
  onUpdate?: Function;
}

export default class Game {
  private cards: Card[] = [];
  private activeCard: number;
  private onUpdate: Function;
  public stat: GameStat;
  private pause: boolean = false;

  constructor(options: GameOptions) {
    this.startGame(options.words);
    this.onUpdate = options.onUpdate;
  }

  startGame(words: WordModel[]) {
    this.createCards(words);
    this.activeCard = 0;
    this.stat = new GameStat(this);
  }

  createCards(words: WordModel[]) {
    words.forEach((word) => {
      this.cards.push(
        new Card({
          word,
          stat: new CardStat(),
        })
      );
    });
  }

  inputLetter(letter: string) {
    if (this.pause) return;

    const card = this.getActiveCard();
    card.inputLetter(letter);

    if (card.isCompleted()) {
      this.nextCard();
    }
    if (this.isCompleted()) {
      this.pause = true;
    }

    this.checkWordFail();

    this.onUpdate();
  }

  checkWordFail() {
    const card = this.getActiveCard();
    if (card.stat.getErrorsCount() >= 3) {
      card.showRightAnser();
      this.pause = true;
      setTimeout(() => {
        this.pause = false;
        this.nextCard();
        this.onUpdate();
      }, 2000);
    }
  }

  isCompleted(): boolean {
    let res = true;
    this.cards.forEach((card) => {
      if (!card.isCompleted()) res = false;
    });
    return res;
  }

  nextCard() {
    if (this.pause) return;
    if (this.activeCard < this.cards.length - 1) this.activeCard++;
    this.onUpdate();
  }

  prevCard() {
    if (this.pause) return;
    if (this.activeCard > 0) this.activeCard--;
    this.onUpdate();
  }

  getCards(): Card[] {
    return this.cards;
  }
  getTotal(): number {
    return this.cards.length;
  }
  getCurrent(): number {
    return this.activeCard + 1;
  }
  getActiveCard(): Card | null {
    return this.cards[this.activeCard];
  }
}
