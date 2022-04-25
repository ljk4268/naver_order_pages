import { html } from 'lit';

import { fetchGetRecentOrders, fetchGetMenuGroups }  from '../api/index';
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

const ORDER_TYPE_MESSAGE = [
    "가지고 가실 수 있게 포장해 드립니다.",
    "매장에서 드실 수 있게 준비됩니다.",
    "계신 곳으로 배달됩니다. "
]

export default class MenuPage extends View {
    constructor() {
        super();

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

            <!-- 주문분류 -->
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
                
                </div>

            <div class="info-main-notice">
            ${ORDER_TYPE_MESSAGE[this.tabIndex]}
            </div>

        
        <!-- 최근 주문 내역 -->
        <div class="recent-order-area">
            <div class="recent-title">
                <img src="../assets/images/ico-clock.svg" alt="" class="ico-clock">최근<br>주문
            </div>
            <div class="recent-menu-area scroll-x">
                <ul class="recent-menu-list">
                ${this.recentMenuItems.map(({id,name,isPopular,imageUrl,price}) => html`
                <li 
                class="recent-menu-item is-ordered"
                @click = ${() => this.redirectDetailPage(id)}
                >
                        <a>
                            <div class="menu-img-area">
                    ${isPopular ? html`<span class="badge-popular">인기</span>` : ""}
                                <img 
                                class="menu-img"
                                src="${imageUrl}" 
                                alt="메뉴사진">
                            </div>
                            <p class="menu-name">${name}</p>
                            <p class="menu-price">${price}</p>
                        </a>
                        <a class="badge-cart">
                            <img 
                            src="../assets/images/ico-cart.svg" alt="주문하기" 
                            class="ico-cart"
                            />
                        </a>
                    </li>
                `)}
                </ul>
            </div>
        </div>
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
<!-- MenuList에서 랜더링된 내용이 아래로 들어와. -->

${this.menuGroups.map(
    (menuGroup) =>
    html`<menu-list .menuGroup = ${menuGroup}></menu-list>`,
)}
`
    }
}
