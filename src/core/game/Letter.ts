export default class Letter {
  public letter: string = "";
  public type: "primary" | "danger" | "success";
  constructor(
    letter: string,
    type: "primary" | "danger" | "success" = "primary"
  ) {
    this.letter = letter;
    this.type = type;
  }
}
