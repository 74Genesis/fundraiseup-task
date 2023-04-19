import Game from "./core/game/Game";
import LetterView from "./views/LetterView";
import WordModel from "./data/WordModel";
import words from "./data/words.json";
import Letter from "./core/game/Letter";

const ELEMENTS = {
  total: "#total_questions",
  current: "#current_question",
  shuffled: "#letters",
  answer: "#answer",
  quizBlock: "#quiz",
  statBlock: "#stat",
};

export default class Controller {
  private game: Game;

  constructor() {
    this.startGame();
    document.addEventListener(
      "keypress",
      this.keyboardHandler.bind(this),
      false
    );
  }
  startGame() {
    this.game = new Game({
      words: this.getWords(6),
      onUpdate: this.renderGame.bind(this),
    });
    this.renderGame();
  }

  renderGame() {
    this.renderHeader();
    this.renderAnswer();
    this.renderShaffle();

    if (this.game.isCompleted()) {
      this.renderStatistic();
    }
  }

  // Returns words models
  getWords(num: number): WordModel[] {
    const list: WordModel[] = [];
    words
      .slice()
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .slice(0, num)
      .forEach((word: string) => {
        list.push(new WordModel(word || ""));
      });
    return list;
  }

  renderHeader() {
    document.querySelector(ELEMENTS.current).innerHTML = String(
      this.game.getCurrent()
    );
    document.querySelector(ELEMENTS.total).innerHTML = String(
      this.game.getTotal()
    );
  }

  renderAnswer() {
    document.querySelector(ELEMENTS.answer).innerHTML = "";

    const card = this.game.getActiveCard();
    card.answerLetters.forEach((letterInstance: Letter) => {
      const letterView = new LetterView({
        letter: letterInstance.letter,
        type: letterInstance.type,
      });

      document
        .querySelector(ELEMENTS.answer)
        .appendChild(letterView.template());
    });
  }

  renderShaffle() {
    document.querySelector(ELEMENTS.shuffled).innerHTML = "";

    const card = this.game.getActiveCard();
    card.shuffleLetters.forEach((letterInstance: Letter) => {
      const letterEl: HTMLElement = new LetterView({
        letter: letterInstance.letter,
        type: letterInstance.type,
        onClick: () => this.onLetterClick(letterInstance),
      }).template();

      document.querySelector(ELEMENTS.shuffled).appendChild(letterEl);
    });
  }

  onLetterClick(letterInstance: Letter) {
    this.input(letterInstance.letter);
    const card = this.game.getActiveCard();
    if (card.getNextLetter() !== letterInstance.letter) {
      letterInstance.type = "danger";
      this.renderGame();
      setTimeout(() => {
        letterInstance.type = "primary";
        this.renderGame();
      }, 700);
    }
  }

  input(letter: string) {
    this.game.inputLetter(letter);
  }

  renderStatistic() {
    let el = document.querySelector(ELEMENTS.quizBlock) as HTMLElement;
    el.style.display = "none";
    el = document.querySelector(ELEMENTS.statBlock) as HTMLElement;
    el.style.display = "block";
    el.innerHTML = `
    <table class="table">
      <tr>
        <td>Words with no errors: </td>
        <td>${this.game.stat.noErrorWordsCount()}</td>
        </tr>
        <tr>
        <td>Errors count: </td>
        <td>${this.game.stat.errorsCount()}</td>
        </tr>
        <tr>
        <td>Word with most errors: </td>
        <td>${this.game.stat.worstWord()}</td>
      </tr>
    </table>
    `;
  }

  keyboardHandler(event: KeyboardEvent) {
    var letter = event.key;
    this.game.inputLetter(letter);
  }
}

new Controller();
