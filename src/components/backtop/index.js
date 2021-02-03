import './backtop.css';
import 'icons/iconfont.css';

import Scroll from 'utils/scroll';

const CHANGE_CLASS_NAME = 'backtop-hidden';

class Backtop {
    constructor(el, critical_point, scrollContainer, eventEl = scrollContainer) {
        this.el = el;
        this.critical_point = critical_point;

        //滾動條所在的容器
        this.scrollContainer = scrollContainer;

        // 監聽滾動事件的元素
        this.eventEl = eventEl;

        new Scroll({
            critical_point,
            change: () => {
                this.show();
            },
            reset: () => {
                this.hide();
            }
        },
            scrollContainer,
            eventEl
        );

        this.bindEvent();
    }


    // 綁定事件
    bindEvent() {
        this.el.addEventListener('click', () => {
            this.scrollTo();
        }, false);
    }

    scrollTo(top = 0, left = 0) {
        this.scrollContainer.scrollTo({
            top,
            left,
            behavior: 'smooth'
        });
    }
    // 隱藏
    hide() {
        this.el.classList.add(CHANGE_CLASS_NAME);
    }

    // 顯示
    show() {
        this.el.classList.remove(CHANGE_CLASS_NAME);
    }
}

export default Backtop;