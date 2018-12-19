export class Navigation {
    constructor(dom, manager_callback) {
        this.navigation_elements = [];
        this.navigation = [
            {
                name: 'Start',
                icon: 'home',
                manager: 'home'
            },
            {
                name: 'Users',
                icon: 'user',
                manager: 'user',
            },
            {
                name: 'Groups',
                icon: 'users',
                manager: 'group',
            },
            {
                name: 'About',
                icon: 'info',
                manager: 'about',
            },
        ];
        this.dom_root = dom;
        this.manager_callback = manager_callback;
        this.dom_nav = document.createElement('nav');
        this.dom_root.appendChild(this.dom_nav);
        this.navigation.map(nav => {
            this.navigation_elements.push(new NavigationElement(this.dom_nav, nav, this));
        });
    }
    set_active(current_nav) {
        current_nav.set_active();
        this.manager_callback(current_nav.nav.manager);
        this.navigation_elements.map(nav_element => {
            if (current_nav !== nav_element) {
                nav_element.set_inactive();
            }
        });
    }
    open(id = 0) {
        if (this.navigation_elements[id] === undefined)
            id = 0;
        this.set_active(this.navigation_elements[id]);
    }
}
class NavigationElement {
    constructor(dom, nav, navigation) {
        this.dom_root = dom;
        this.nav = nav;
        this.dom = document.createElement('a');
        this.dom_root.appendChild(this.dom);
        const icon = document.createElement('i');
        icon.classList.add('fa', `fa-${this.nav.icon}`, 'fa-fw');
        this.dom.appendChild(icon);
        const text = document.createTextNode(this.nav.name);
        this.dom.appendChild(text);
        this.dom.addEventListener('click', (e) => {
            navigation.set_active(this);
        });
    }
    set_active() {
        this.dom.classList.add('active');
    }
    set_inactive() {
        this.dom.classList.remove('active');
    }
}
//# sourceMappingURL=Navigation.js.map