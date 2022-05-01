import { html } from 'lit';
import View from '../view';

const TABS = [{
  text: html `🛍&nbsp;&nbsp;포장`,
  imageUrl: './assets/images/ico-check.svg',
},
{
  text: html `🍽&nbsp;&nbsp;매장`,
  imageUrl: './assets/images/ico-check.svg',
},
{
  text: html `🛵&nbsp;&nbsp;배달`,
  imageUrl: './assets/images/ico-check.svg',
},
]

export default class TabList extends View {
  // tablist 따로 분리해줬고 
  // 메뉴페이지 93번쨰줄 실행될 때 생성자가 실행되는데 그때 받을 매개변수 받아오는 부분이고
  // 거기서 받아온 변수를 this.~~~(멤버변수)에 넣어주는거야. 
  constructor(tabIndex = 0 , onChangeTab){
    super();
    // 애네는 멤버변수야. 
    this.tabIndex = tabIndex;
    this.onChangeTab = onChangeTab;
  }

  static get properties() {
    return {
        tabIndex: { type: Number },
        onChangeTab: { type: Function},
    }
}

  render(){
    return html `
    <div class="tab-switch-box" role="tablist">
    ${TABS.map((tab, index) => (
        html`<a 
        href="#" 
        class="tab-switch ${index === this.tabIndex ? 'is-active' : ''}" 
        role="tab"
        @click=${()=> this.onChangeTab(index)}
        >
        ${tab.text}
        <img 
        src="${tab.imageUrl}" 
        alt="${tab.text}"  
        class="ico-check"
        aria-hidden="${index === this.tabIndex}" 
        />
        </a>`
    ))}
        
        </div>`
  }
}