export class About {
    constructor(dom) {
        this.dom_root = dom;
        this.dom = document.createElement('div');
        this.dom_root.appendChild(this.dom);
        this.dom.innerHTML = `<div>
     <h2>Test Program</h2>
     <p>Viel Spaß bei der App Entwicklung!</p>
     <p>Client Version 0.0.1</p>
    </div>`;
    }
    close() {
        this.dom.remove();
    }
}
//# sourceMappingURL=About.js.map