import './header.css';

import Scroll from 'utils/scroll';

const CHANGE_CLASS_NAME = 'header-transition';

class Header {
    constructor(el, critical_point, scrollContainer, eventEl = scrollContainer) {
        this.el = el;
        new Scroll({
            critical_point,
            change: () => {
                this.change();
            },
            reset: () => {
                this.reset();
            }
        },
            scrollContainer,
            eventEl
        );
    }

    reset(){
        this.el.classList.remove(CHANGE_CLASS_NAME);
    }

    // 變化
    change(){
        this.el.classList.add(CHANGE_CLASS_NAME);
    }
}

export default Header;