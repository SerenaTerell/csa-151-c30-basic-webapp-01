

export class Header {
  private dom_root: HTMLElement;
  private dom_header: HTMLElement;

  constructor(dom: HTMLElement) {
    this.dom_root = dom;
    this.dom_header = document.createElement('header');
    this.dom_root.appendChild(this.dom_header);
    this.set('Main');
  }

  set(text: string) {
    this.dom_header.innerText = `Example App: ${text}`;
  }

}