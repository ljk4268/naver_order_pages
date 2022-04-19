import {
  html
} from 'lit';
import View from '../view.js';

const TABS = [{
    text: html `🛍&nbsp;&nbsp;포장`,
    imageUrl: `/assets/images/ico-check.svg`,
  },
  {
    text: html `🍽&nbsp;&nbsp;매장`,
    imageUrl: `/assets/images/ico-check.svg`,
  },
  {
    text: html `🛵&nbsp;&nbsp;배달`,
    imageUrl: `/assets/images/ico-check.svg`,
  }
]

const ORDER_TYPE_MESSAGE = [
  "가지고 가실 수 있게 포장해 드립니다. ",
  "매장에서 드실 수 있게 준비됩니다.",
  "계신 곳으로 배달됩니다.",
]


export default class MenuPage extends View {
  constructor() {
    super()

    this.tabIndex = 0
    
  }

  static get properties(){
    return {
      tabIndex: {type: Number},
      
    }
  }

  onChangeTab(index) {
    this.tabIndex = index;
  }

  

  createRenderRoot() {
    return this;
  }

  render() {
    return html `<div class="container">
    <!-- 고정헤더영역 -->
    <naver-order-header></naver-order-header>
    <!-- // 고정헤더영역 -->

    <!-- 주문정보영역 -->
    <div class="order-info-area">
      <div class="common-inner">
        <div class="info-main">
          <div class="info-main-title">
            <div class="title">
              <svg viewBox="0 0 18 18" class="ico-n-logo">
                <path
                  fill-rule="evenodd"
                  fill="currentColor"
                  d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z"
                ></path>
              </svg>
              주문
            </div>
          </div>

          <!-- 주문분류 -->
          <div class="tab-switch-box" role="tablist">
          ${TABS.map(
            (tab, index)=>
          html ` <a href="#" class="tab-switch ${index === this.tabIndex ? 'is-active' : ''}" role="tab" @click=${()=> this.onChangeTab(index)}>
              ${tab.text}
              <img 
              src="${tab.imageUrl}"
              alt="${tab.text}"
              class="ico-check"
              aria-hidden= "${index === this.tabIndex}"
              />
            </a> `,
          )}
          
          </div>

        <div class="info-main-notice">
            ${ORDER_TYPE_MESSAGE[this.tabIndex]}
        </div>

          <!-- 최근 주문 내역 -->
          <div class="recent-order-area">
            <div class="recent-title">
              <img
                src="/assets/images/ico-clock.svg"
                alt=""
                class="ico-clock"
              />최근<br />주문
            </div>
            <div class="recent-menu-area scroll-x">
              <recent-menu-list
                .items=
                .onItemClick=
              ></recent-menu-list>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- // 주문정보영역 -->


    <!-- 맨위로 -->
    <div class="go-to-top">
      <a href="#" class="link">Top<i class="ico-up"></i></a>
    </div>
    <!-- // 맨위로 -->
  </div>

  <div class="dimmed-layer hidden"></div>
  <div class="order-type-popup hidden">
    <p class="title">어디서 드시나요?</p>
    <div class="type-list">
      <order-type-list></order-type-list>
    </div>
  </div>`;
  }
}