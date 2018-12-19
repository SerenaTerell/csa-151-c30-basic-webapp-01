export class Welcome {
    constructor(dom) {
        this.dom_root = dom;
        this.dom = document.createElement('div');
        this.dom_root.appendChild(this.dom);
        this.dom.innerHTML = `<div>
     <h2>Hallo!</h2>
    </div>`;
    }
    close() {
        this.dom.remove();
    }
}
//# sourceMappingURL=Welcome.js.map