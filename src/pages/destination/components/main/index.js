import './main.css';
import Tab from '../tab';
import Content from '../content';
import 'components/loading';
import { set, get } from 'utils/sessionStorage';

const tabEl = document.querySelector('.tab');
const tab = new Tab(tabEl);
const content = new Content(document.getElementById('destination-content'));

const itemEls = tabEl.querySelectorAll('.tab-item');
// for (const itemEl of itemEls) {
//     itemEl.addEventListener('click', () => {
//         const index = itemEl.dataset.id - 1;
//         tab.to(index);
//     }, false);
// }

// 事件代理可以節省性能消耗
// 事件代理(原理:利用事件冒泡機制)
tabEl.addEventListener('click', (ev) => {
    const itemEl = ev.target;
   
    if (itemEl.classList.contains('tab-item')) {

        const index = itemEl.dataset.id - 1;

        const storageName = `destination_content_${index}`;
        const storageContent = get(storageName);

        if (storageContent) {
            tab.setActiveItem(index);
            content.set(storageContent);
        } else {
            const tabPromise = tab.to(index);

            content.setLoading();

            tabPromise.then(data => {
                content.set(data);
                set(storageName,data);
            });
        }
    }
}, false);

itemEls[0].click();

// tab.to(1).then(data=>{
//     content.set(data);
// })

// tab.setActiveItem(6);
// tab.to(0);