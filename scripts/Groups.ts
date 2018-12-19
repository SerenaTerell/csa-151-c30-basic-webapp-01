const API_URL = 'http://localhost:3010';

import {DOM} from "./DOM.js";
import {Group} from './Group.js';

export class Groups implements iAppContainer {

  private dom_root: HTMLElement;
  private dom: HTMLElement;
  private dom_content: HTMLElement;
  private dom_info_section: HTMLElement;
  private dom_create_button: HTMLElement;
  private dom_create_section: HTMLElement;

  constructor(dom: HTMLElement) {
    this.dom_root = dom;

    this.dom = document.createElement('div');
    this.dom.classList.add('groups');
    this.dom_root.appendChild(this.dom);

    const section_head = document.createElement('section');
    section_head.classList.add('head');
    this.dom.appendChild(section_head);

    const headline = document.createElement('h2');
    headline.innerText = 'Groups';
    section_head.appendChild(headline);

    const dom_buttons = document.createElement('div');
    dom_buttons.classList.add('buttons');
    section_head.appendChild(dom_buttons);

    this.dom_create_button = document.createElement('a');
    this.dom_create_button.classList.add('button');
    dom_buttons.appendChild(this.dom_create_button);
    const dom_create_icon = document.createElement('i');
    dom_create_icon.classList.add('fas', 'fa-plus-circle');
    this.dom_create_button.appendChild(dom_create_icon);
    const dom_create_text = document.createTextNode(' New Group');
    this.dom_create_button.appendChild(dom_create_text);
    this.dom_create_button.addEventListener( 'click', () => this.create());

    this.dom_info_section = document.createElement('section');
    this.dom_info_section.classList.add('callout', 'hide');
    this.dom.appendChild(this.dom_info_section);

    this.dom_create_section = document.createElement('section');
    this.dom_create_section.classList.add('callout', 'create', 'hide');
    this.dom.appendChild(this.dom_create_section);

    this.dom_content = document.createElement('div');
    this.dom.appendChild(this.dom_content);

    this.list().then(() => {
      console.log('list created');
    });
  }

  async list() {
    DOM.empty(this.dom_content);
    try {
      const response = await fetch(API_URL + '/groups');
      const json = await response.json();
      const groups: Array<iGroup> = json.groups;
      groups.map(group => {
        new Group(this.dom_content, group);
      });
    } catch (e) {
      console.log(e);
      this.dom_content.innerHTML = `<div class="callout warning"><h3>Error Loading Groups</h3><p>${e.toString()}</p></div>`;
    }
  }

  /**
   * show create ne entry
   */
  create() {
    DOM.empty(this.dom_create_section);

    this.dom_create_button.classList.add('hide');
    this.dom_create_section.classList.remove('hide');
    this.dom_create_section.appendChild(DOM.create('h3', {text: 'Create new Group'}));
    this.dom_create_section.appendChild(DOM.create('label', {text: 'Name:'}));

    const dom_name = DOM.create('input');
    this.dom_create_section.appendChild(dom_name);

    const dom_button_cancel = DOM.create('a', {
      css: ['button' , 'secondary'],
      icon: 'times-circle',
      text: ' Cancel'
    });
    this.dom_create_section.appendChild(dom_button_cancel);

    const dom_button_create = DOM.create('a', {
      css: 'button',
      icon: 'check-circle',
      text: ' Add'
    });
    this.dom_create_section.appendChild(dom_button_create);

    dom_button_cancel.addEventListener('click', () => {
      DOM.empty(this.dom_create_section);
      this.dom_create_button.classList.remove('hide');
      this.dom_create_section.classList.add('hide');
    });

    dom_button_create.addEventListener('click', async () => {
      this.dom_create_button.classList.remove('hide');
      this.dom_create_section.classList.add('hide');
      await this.add(dom_name.value);
    });
  }

  /**
   * add new entry do list and api
   *
   * @param {string} name
   * @returns {Promise<void>}
   */
  private async add(name: string) {
    try {
      const response = await fetch(API_URL + '/group/' , {
        body: JSON.stringify({
          name: name
        }),
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        // todo REST POST redirect
        // redirect: 'follow',
        // credentials: 'include',
      });

      const result: iGroupResult = await response.json();
      if (! result.success) {
        console.error(result);
        throw result.msg;
      }

      new Group(this.dom_content, result.data);
      this.info( `Group ${result.data.id} created`, '', 'success');

    } catch (err) {
      this.info('Error Add Group', err, 'warning');
    }

  }

  /**
   * close app
   */
  close() {
    this.dom.remove();
  }

  /**
   * show info box an diapers after 10s
   *
   * @param {string} message
   * @param {string} headline   Optionale headline
   * @param {string} classname  CSS Class info, warning, success
   */
  private info( message: string, headline: string = '', classname: string = 'info') {

    this.dom_info_section.classList.remove('hide');
    this.dom_info_section.classList.add(classname);
    DOM.empty(this.dom_info_section);

    if (headline !== '') {
      this.dom_info_section.appendChild(
        DOM.create('h3', {text: headline})
      );
    }

    this.dom_info_section.appendChild(
      DOM.create('p', {text: message})
    );

    const dom_close_section = DOM.create('div', {css: 'buttons'});
    this.dom_info_section.appendChild(dom_close_section);
    const dom_close_button = DOM.create('a', {
      css: ['button', 'secondary'],
      icon: 'times-circle',
      text: 'Close'
    });
    dom_close_section.appendChild(dom_close_button);
    dom_close_section.addEventListener('click', () => this.info_close());

    setTimeout(() => {
      this.info_close();
    }, 10000);

  }

  private info_close() {
    // rest classes
    this.dom_info_section.classList.remove('info');
    this.dom_info_section.classList.remove('warning');
    this.dom_info_section.classList.remove('success');
    this.dom_info_section.classList.add('hide');
    DOM.empty(this.dom_info_section);
  }

}

