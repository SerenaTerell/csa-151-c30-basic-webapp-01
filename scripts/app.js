import { Header } from "./Header.js";
import { Navigation } from "./Navigation.js";
import { About } from "./About.js";
import { Welcome } from "./Welcome.js";
import { Groups } from "./Groups.js";
const dom_body = document.getElementById('app');
let active_app = null;
const manager = function (app) {
    if (active_app != null) {
        active_app.close();
        active_app = null;
    }
    switch (app) {
        case 'home':
            header.set('Home');
            active_app = new Welcome(dom_content);
            break;
        case 'user':
            header.set('Users');
            break;
        case 'group':
            header.set('Groups');
            active_app = new Groups(dom_content);
            break;
        case 'about':
            header.set('About');
            active_app = new About(dom_content);
            break;
        case 'default':
            throw `Undefined mananger app ${app}`;
    }
};
const header = new Header(dom_body);
const navigation = new Navigation(dom_body, manager);
const dom_content = document.createElement('div');
dom_content.classList.add('content');
dom_body.appendChild(dom_content);
navigation.open(2);
//# sourceMappingURL=app.js.map