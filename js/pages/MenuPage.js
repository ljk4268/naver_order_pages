import { html } from 'lit';

import { fetchGetRecentOrders, fetchGetMenuGroups }  from '../api/index';
import View from '../view';



const ORDER_TYPE_MESSAGE = [
    "가지고 가실 수 있게 포장해 드립니다.",
    "매장에서 드실 수 있게 준비됩니다.",
    "계신 곳으로 배달됩니다. "
]

export default class MenuPage extends View {
    constructor() {
        super();

        this.cartItems = [];

        this.tabIndex = 0
        // this.onChangeTab = this.onChangeTab;
        this.recentMenuItems = [];
        this.menuGroups = [];
        this.selectedCategory = 'recommends';

        fetchGetRecentOrders().then((response) => this.recentMenuItems = response);

        fetchGetMenuGroups().then((response) => this.menuGroups = response);

    }

    static get properties() {
        return {
            tabIndex: { type: Number },
            selectedCategory: {type: String},
            recentMenuItems: { type: Array },
            menuGroups: { type: Array },
            cartItems: {type: Array},
        }
    }

    onChangeTab(index) {
        this.tabIndex = index;
    }

    onChangeCategory(category){
        this.selectedCategory = category;

        const y = document.querySelector(`[data-scroll-id=${category}]`).getBoundingClientRect().top;

        window.scrollBy({
            top: y - 140,
            left: 0,
            behavior: 'smooth',
        });
    }

    redirectDetailPage(id){
        history.pushState(null,null, `/detail/${id}`)
        this.dispatchEvent(new PopStateEvent('popstate'))
    }

    render() {

    const categories = this.menuGroups.map(({category,categoryName })=> ({category, 
    categoryName,
    }));



        return html `
    <div class="order-info-area">
    <div class="common-inner">
        <class="info-main">
            <div class="info-main-title">
                <div class="title">
                    <svg viewBox="0 0 18 18" class="ico-n-logo">
                        <path fill-rule="evenodd" fill="currentColor"
                            d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
                        </path>
                    </svg>
                    주문
                </div>
            </div>

            

            <div class="info-main-notice">
            ${ORDER_TYPE_MESSAGE[this.tabIndex]}
            </div>

        <!-- 주문분류 -->
        <tab-list
        .tabIndex=${this.tabIndex}
        .onChangeTab=${this.onChangeTab.bind(this)}
        >
        </tab-list>
        
        <!-- 최근 주문 내역 -->
        <recent-menu-list
        .recentMenuItems=${this.recentMenuItems}
        .redirectDetailPage=${this.redirectDetailPage.bind(this)}
        ></recent-menu-list>
        </div>
    </div>
</div>
<!-- 메뉴카테고리영역 -->
<div class="menu-category-area">
    <div class="common-inner">
        <ul class="category-list scroll-x">
        ${categories.map(({category, categoryName}) =>
            html `
            <li class="category-item">
            <a 
            @click = ${()=>this.onChangeCategory(category)}
            class="category-tab ${category === this.selectedCategory ? 'is-active' : ''}">${categoryName}</a>
            </li>`,
            )}
        </ul>
    </div>
</div>
<!-- //메뉴카테고리영역 -->

<!-- 메뉴리스트영역 -->
<!-- MenuList에서 랜더링된 내용이 아래로 들어와. -->
${this.menuGroups.map(
    (menuGroup) =>
    html`<menu-list .menuGroup = ${menuGroup}></menu-list>`,
)}

<!-- //메뉴리스트영역 -->

<!-- 담은메뉴영역 -->
${this.cartItems.length > 0 ? 
html`
<div class="order-box-area">
    <div class="common-inner">
        <div>
            <p class="menu-name">0</p>
            <p class="menu-price">0원</p>
        </div>
        <a href="./order.html" class="btn-order">
            <span class="txt">주문하기</span>
            <span class="icon">
                <img src="../assets/images/ico-cart-fill.svg" alt="" aria-hidden="true" class="ico-cart">
                <span class="num">1</span>
            </span>
        </a>
    </div>
</div>` : '' }
<!-- //담은메뉴영역 -->

<!-- 맨위로 -->
<div class="go-to-top">
    <a href="#" class="link">Top<i class="ico-up"></i></a>
    </div>
    <!-- // 맨위로 -->
</div>

<div class="dimmed-layer hidden"></div>
<div class="order-type-popup hidden">
    <p class="title">어디서 드시나요?</p>
    <order-type-list></order-type-list>
</div>
    `
    }
}
