export class Header {
    constructor(dom) {
        this.dom_root = dom;
        this.dom_header = document.createElement('header');
        this.dom_root.appendChild(this.dom_header);
        this.set('Main');
    }
    set(text) {
        this.dom_header.innerText = `Example App: ${text}`;
    }
}
//# sourceMappingURL=Header.js.map