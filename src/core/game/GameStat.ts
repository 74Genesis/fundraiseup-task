import Game from "./Game";
import Card from "./Card";

export default class GameStat {
  private game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  noErrorWordsCount(): number {
    return this.game
      .getCards()
      .slice()
      .filter((c) => !c.stat.isError()).length;
  }

  errorsCount(): number {
    return this.game
      .getCards()
      .reduce((prev, current) => prev + current.stat.getErrorsCount(), 0);
  }

  worstWord(): string {
    const card = this.game
      .getCards()
      .sort((a, b) => b.stat.getErrorsCount() - a.stat.getErrorsCount())?.[0];
    if (card) return card.word.getWord();
    return "";
  }
}
