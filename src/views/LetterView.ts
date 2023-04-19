interface Props {
  letter: string;
  type: "primary" | "success" | "danger";
  onClick?: (this: HTMLElement, ev: MouseEvent) => any;
}

export default class LetterView {
  private props: Props;

  constructor(props: Props) {
    this.props = props;
  }
  getColorClass() {
    switch (this.props.type) {
      case "danger":
        return "btn-danger";
      case "primary":
        return "btn-primary";
      case "success":
        return "btn-success";
    }
  }
  template(): HTMLElement {
    const btn = document.createElement("button");

    btn.className = `btn mx-1 ${this.getColorClass()}`;
    btn.type = "button";
    btn.style.width = "40px";
    btn.style.height = "40px";
    btn.dataset.letter = this.props.letter;
    btn.innerHTML = this.props.letter;
    btn.addEventListener("click", this.props.onClick);
    return btn;
  }
}
