import './tab.css';

import { getData, getDelayedData } from 'api/getData';

import { URL, TAB_ITEM_CLASS, TAB_ACTIVE_ITEM_CLASS_NAME } from './config';

class Tab {
    constructor(el) {
        this.itemEls = el.querySelectorAll(TAB_ITEM_CLASS);
    }

    setActiveItem(index) {
        for (const itemEl of this.itemEls) {
            itemEl.classList.remove(TAB_ACTIVE_ITEM_CLASS_NAME);
        }

        this.itemEls[index].classList.add(TAB_ACTIVE_ITEM_CLASS_NAME);
    }

    to(index) {
        // 取消上一次的請求
        if (this.dataPromise && this.dataPromise.xhr) {
            this.dataPromise.xhr.abort();
        }

        this.setActiveItem(index);

        this.dataPromise = getData(`${URL}/${this.itemEls[index].dataset.id}`);

        return this.dataPromise;
    }
}

export default Tab;