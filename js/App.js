import { html } from 'lit';
import View from './view';

export default class App extends View {
  constructor(){
    super();

    this.currentPage = 'menu';
    this.orderTypeIndex = 0;


    window.onpopstate = () => {
      const [, page] = location.pathname.split('/');

    this.currentPage = page;
    }
  }

  static get properties() {
    return {
      currentPage: {type:String},
      orderTypeIndex: {type:Number},
    }
  }

  route(){
    switch (this.currentPage) {
      case 'detail':
        return html`<detail-page .orderTypeIndex=${this.orderTypeIndex}></detail-page>`
      default:
        return html `<menu-page></menu-page>`
    }
  }
  // 라우팅: 페이지에서 페이지로 가는 것. 
  // A페이지에서 B페이지로 갈 수 있고 
  // 사용자가 원함에 따라 C페이지로 갈 수 있음. 
  // 그니까 메인페이지에서 사용자 정보 페이지로 들어갈 수 있고 주문페이지로 갈 수 있고 
  render(){
    return this.route();
  }
}