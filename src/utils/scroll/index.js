import { INIT_STATE, CHANGED_STATE } from './constants';
import DEFAULTS from './defaults';

class Scroll {
    constructor(options, scrollContainer, eventEl = scrollContainer) {
        this.options = Object.assign({}, DEFAULTS, options);

        //滾動條所在的容器
        this.scrollContainer = scrollContainer;

        // 監聽滾動事件的元素
        this.eventEl = eventEl;

        this.setState(INIT_STATE);

        this.bindEvent();
    }

    // 設置狀態
    setState(state) {
        this.state = state;
    }

    // 綁定事件
    bindEvent() {
        const { change, reset } = this.options;

        this.eventEl.addEventListener('scroll', () => {
            if (this.needChange()) {
                this.setState(CHANGED_STATE);
                if (typeof change === 'function') {
                    change();
                }
            } else if (this.needReset()) {
                this.setState(INIT_STATE);
                if (typeof reset === 'function') {
                    reset();
                }
            }
        }, false);
    }

    // 需要還原
    needReset() {
        return this.state !== INIT_STATE && this.scrollContainer.scrollTop <= this.options.critical_point;
    }

    // 需要變化
    needChange() {
        return this.state !== CHANGED_STATE && this.scrollContainer.scrollTop > this.options.critical_point;
    }
}

export default Scroll;