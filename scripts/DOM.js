/**
 * Helper Class for DOM manipulation
 * inpiration https://www.smashingmagazine.com/2014/01/writing-a-better-javascript-library-for-the-dom/
 */
export class DOM {
    static empty(dom) {
        while (dom.firstChild) {
            dom.removeChild(dom.firstChild);
        }
    }
    /**
     * extended document.createElement
     *
     * @param {K} tagName like a, div, p, ...
     * @param {iDOMCreateOptions} options
     * @returns {HTMLElement | HTMLSelectElement | HTMLLegendElement | HTMLTableCaptionElement | HTMLTextAreaElement | HTMLModElement | HTMLHRElement | HTMLOutputElement | HTMLPreElement | HTMLEmbedElement | HTMLCanvasElement | HTMLFrameSetElement | HTMLMarqueeElement | HTMLScriptElement | HTMLInputElement | HTMLUnknownElement | HTMLMetaElement | HTMLStyleElement | HTMLObjectElement | HTMLTemplateElement | HTMLBRElement | HTMLAudioElement | HTMLIFrameElement | HTMLMapElement | HTMLTableElement | HTMLAnchorElement | HTMLMenuElement | HTMLPictureElement | HTMLParagraphElement | HTMLTableDataCellElement | HTMLTableSectionElement | HTMLQuoteElement | HTMLTableHeaderCellElement | HTMLProgressElement | HTMLLIElement | HTMLTableRowElement | HTMLFontElement | HTMLSpanElement | HTMLTableColElement | HTMLOptGroupElement | HTMLDataElement | HTMLDListElement | HTMLFieldSetElement | HTMLSourceElement | HTMLBodyElement | HTMLDirectoryElement | HTMLDivElement | HTMLUListElement | HTMLHtmlElement | HTMLAreaElement | HTMLMeterElement | HTMLAppletElement | HTMLFrameElement | HTMLOptionElement | HTMLImageElement | HTMLLinkElement | HTMLHeadingElement | HTMLSlotElement | HTMLVideoElement | HTMLBaseFontElement | HTMLTitleElement | HTMLButtonElement | HTMLHeadElement | HTMLParamElement | HTMLTrackElement | HTMLOListElement | HTMLDataListElement | HTMLLabelElement | HTMLFormElement | HTMLTimeElement | HTMLBaseElement}
     */
    static create(tagName, options = {}) {
        // set defaults
        if (options.icon && options.icon_class === undefined) {
            options.icon_class = ['fas'];
        }
        // console.log(tagName, options);
        const element = document.createElement(tagName);
        // set layout css classes
        if (options.css !== undefined) {
            if (Array.isArray(options.css)) {
                options.css.map(classname => element.classList.add(classname));
            }
            else {
                element.classList.add(options.css);
            }
        }
        // add font fontawesome icon
        if (options.icon !== undefined) {
            const dom_icon = document.createElement('i');
            options.icon_class.map(classname => dom_icon.classList.add(classname));
            dom_icon.classList.add('fa-' + options.icon);
            element.appendChild(dom_icon);
        }
        // add text content
        if (options.text !== undefined) {
            const dom_create_text = document.createTextNode(options.text);
            element.appendChild(dom_create_text);
        }
        return element;
    }
}
//# sourceMappingURL=DOM.js.map