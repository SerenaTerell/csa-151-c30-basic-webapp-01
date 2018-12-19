
const API_URL = 'http://localhost:3010';

export class Group {

  private dom: HTMLElement;
  private dom_root: HTMLElement;
  private dom_ident: HTMLElement;
  private dom_input: HTMLInputElement;
  private dom_remove: HTMLElement;
  private dom_info: HTMLElement;

  /*
   * mark group with _ to access object with setter an getter
   * https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/set
   * https://www.typescriptlang.org/docs/handbook/classes.html#accessors
   */
  private _group: iGroup;

  constructor(dom_root, group: iGroup) {

    this.dom_root = dom_root;
    this._group = group;

    // Example for use with objects but not really useful
    // because the object attributes not allowed to have
    // the same name as the setter and getter function
    // Object.defineProperty(this._group, 'name', {
    //   set: (x) => { this._group.name  = x ; },
    //   get: () => { return this._group.name ; },
    // });

    this.dom_root.classList.add('table');

    this.dom = document.createElement('div');
    this.dom.classList.add('row');
    this.dom_root.appendChild(this.dom);

    this.dom_ident = document.createElement('div');
    this.dom.appendChild(this.dom_ident);
    this.dom_ident.innerText = '#' + this._group.id.toString();


    this.dom_input = document.createElement('input');
    this.dom.appendChild(this.dom_input);
    this.dom_input.value = this.name;

    this.dom_info = document.createElement('div');
    this.dom.appendChild(this.dom_info);

    this.dom_remove = document.createElement('a');
    this.dom_remove.classList.add('button', 'expand');
    this.dom.appendChild(this.dom_remove);
    this.dom_remove.title = 'Remove';

    const dom_remove_icon = document.createElement('i');
    dom_remove_icon.classList.add('fa', 'fa-trash');
    this.dom_remove.appendChild(dom_remove_icon);

    this.dom_input.addEventListener( 'change',  this.event_change.bind(this));
    this.dom_input.addEventListener( 'keyup',   this.event_change.bind(this));

    this.dom_remove.addEventListener('click',   this.event_remove.bind(this));
  }

  private event_change() {
    this.name = this.dom_input.value;
  }

  private event_remove() {

    // hide remove button and disbale text
    this.dom_remove.classList.add('hide');
    this.dom_input.disabled = true;

    const button_ok = document.createElement('a');
    button_ok.classList.add('button', 'warning');
    button_ok.innerText = 'Remove';

    const button_cancel = document.createElement('a');
    button_cancel.classList.add('button', 'secondary');
    button_cancel.innerText = 'Cancel';

    this.dom_info.appendChild(button_ok);
    this.dom_info.appendChild(button_cancel);

    button_ok.addEventListener('click', () => {
      this.dom_remove.classList.remove('hide');
      this.dom_input.disabled = false;
      this.dom_info.innerHTML = '';
      this.remove();
    });

    button_cancel.addEventListener('click', () => {
      this.dom_remove.classList.remove('hide');
      this.dom_input.disabled = false;
      this.dom_info.innerHTML = '';
    });
  }

  /**
   * setter function for group name
   * @param {string} value
   */
  set name(value: string) {
    console.log('setter name');
    this._group.name = value;
    this.save();
  }

  /**
   * getter funtion for group name
   * @returns {string}
   */
  get name() {
    return this._group.name;
  }

  get id() {
    return this._group.id;
  }

  remove() {
    fetch(API_URL + '/group/' + this.id , {
      cache: 'no-cache',
      method: 'DELETE',
      mode: 'cors'
    })
      .then(response => response.json())
      .then( result => {
        if (result.success) {
          this.dom.remove();
          // todo Remove in parent (groups)
        }
        else {
          console.error(result);
          this.dom_info.innerHTML = `<span class="error label"><i class="fas fa-exclamation-circle "></i> ${result.msg}</span>`;
        }
        setTimeout(() => {
          this.dom_info.innerHTML = '';
        }, 2000);
      });
  }

  save() {
    fetch(API_URL + '/group/' + this.id , {
      body: JSON.stringify({
        name: this.name
      }),
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      mode: 'cors'
    })
      .then(response => response.json())
      .then( result => {
        if (result.success) {
          this.dom_info.innerHTML = '<span class="success label"><i class="fas fa-check-circle"></i> saved</span>';
        }
        else {
          console.error(result);
          this.dom_info.innerHTML = `<span class="error label"><i class="fas fa-exclamation-circle "></i> ${result.msg}</span>`;
        }
        setTimeout(() => {
          this.dom_info.innerHTML = '';
        }, 2000);
      });
  }

}