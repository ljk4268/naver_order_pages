import { html } from 'lit';
import View from '../view';

export default class MenuList extends View {
  // menuPage에는 처음 객체 초기화 할 때 값의 변화가 없어서 매개변수를 받지 않았음. 
  // 그래서 그냥 constructor 안에서 고정된 값을 초기화만 해주면 됐음. 
  // menuGroup을 매개변수로 받는이유
  // menuGroups안의 여러 menuGroup을 객체데이터를 각각 가지고 초기화하여 사용될 거 같음
  // 강의 들으면서 업데이트 될 예정. 
  constructor(menuGroup){
    super();
    // 나 menuGroup 데이터 받으면 this.menuGroup에 넣을거야. 
    // menuGroup 데이터 받는 부분은 MenuPage.js의 html`<menu-list .menuGroup = ${menuGroup}></menu-list>` 여기야.
    // 여기가 메뉴리스트의 객체가 생성되는 부분이거든! 
    this.menuGroup = menuGroup;
    this.isClosed = false;
  }

  static get properties(){
    return {
      menuGroup: {
        type: Object,
      },
      isClosed: {
        type: Boolean,
      },
    };
  }

  toggle(){
    this.isClosed = !this.isClosed
  }

  render(){
    return html `
    <div 
    data-scroll-id = ${this.menuGroup.category}
    class="menu-list-area ${this.isClosed ? 'is-closed' : ''}">

    <div class="common-inner">
        <div class="menu-category">
            <p class="title">${this.menuGroup.categoryName}</p>
            <button class="btn-toggle" @click = ${this.toggle}>
            <img 
            class="ico-arrow" 
            src="../assets/images/ico-arrow.svg"
            alt=""
            />
            </button>
        </div>


        <ul class="menu-list">
        ${this.menuGroup.items.map(item => html`
        <li class="menu-item">
                <a class="menu-detail">
                    <div class="menu-img-area">
                        <img class="menu-img" 
                        src="${item.imageUrl}"
                        alt="${item.name}"
                        width="100" height="110">
                    </div>
                    <div class="menu-info-area">
                        <p class="menu-name-group">
                            <span class="menu-name">${item.name}</span>
                            ${item.isPopular 
                            ? html `<span class="badge-popular">인기</span>`:''}
                            <span class="badge-popular">인기</span>
                            ${item.isNew ? html `
                            <img 
                            src="../assets/images/ico-new.svg" 
                            alt="new" 
                            class="ico-new"
                            />` 
                            : ''}
                        </p>
                        <div class="menu-info-group">
                            <span class="menu-grade">
                            <img 
                            class="ico-star" 
                            src="../assets/images/ico-star.svg"
                            alt="점수" />
                            ${item.reviewPoint}</span>
                            <span class="menu-number-of-order">주문수<em>${item.orderCount}</em></span>
                        </div>
                        <p class="menu-desc">${item.description}
                        </p>
                        <p class="menu-price">${item.price}원</p>
                    </div> 
                    ${item.soldOut
                    ? html `<a class="btn-cart disabled" >품절</a>` : 
                    html `</a>
                <a class="btn-cart">
                    <img 
                    class="ico-cart" 
                    src="../assets/images/ico-cart-fill-green.svg" alt="주문하기"
                    />
                    <span class="num">0</span>
                </a>
            </li>`}
        `)}
        </ul>
    </div>
</div>`
  }
}