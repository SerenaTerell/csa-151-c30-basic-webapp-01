
// import {iAppContainer} from './iAppContainer.js';

export class Welcome implements iAppContainer {

  private dom_root: HTMLElement;
  private dom: HTMLElement;

  constructor(dom: HTMLElement) {
    this.dom_root = dom;

    this.dom = document.createElement('div');
    this.dom_root.appendChild(this.dom);

    this.dom.innerHTML = `<div>
     <h2>Hallo!</h2>
    </div>`
  }

  close() {
    this.dom.remove();
  }

}