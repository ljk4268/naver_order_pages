import { html } from 'lit';
import View from '../view';

export default class MenuPage extends View {
  constructor(){
    super();
  }

  render(){
    return html `
    <div class="order-info-area">
    <div class="common-inner">
        < class="info-main">
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
                <a 
                href="#" 
                class="tab-switch is-active" 
                role="tab"
                >
                <img
                  class="ico-check"
                  />
                </a>
                </div>
                
            <div class="info-main-notice">
            </div>

          
            <!-- 최근 주문 내역 -->
            <div class="recent-order-area">
                <div class="recent-title">
                    <img src="../assets/images/ico-clock.svg" alt="" class="ico-clock">최근<br>주문
                </div>
                <div class="recent-menu-area scroll-x">
                    <ul class="recent-menu-list">
                        <li class="recent-menu-item is-ordered">
                            <a href="./detail.html">
                                <div class="menu-img-area">
                                    <img class="menu-img" src="https://via.placeholder.com/80" alt="메뉴사진">
                                </div>
                                <p class="menu-name">칠리베이컨 웜볼</p>
                                <p class="menu-price">6,100원</p>
                            </a>
                            <a href="#" class="badge-cart">
                                <img src="../assets/images/ico-cart.svg" alt="주문하기" class="ico-cart">
                            </a>
                        </li>

                        <li class="recent-menu-item">
                            <a href="./detail.html">
                                <div class="menu-img-area">
                                    <span class="badge-popular">인기</span>
                                    <img class="menu-img" src="https://via.placeholder.com/80" alt="메뉴사진">
                                </div>
                                <p class="menu-name">칠리베이컨 웜볼</p>
                                <p class="menu-price">6,100원</p>
                            </a>
                            <a href="#" class="badge-cart">
                                <img src="../assets/images/ico-cart.svg" alt="주문하기" class="ico-cart">
                            </a>
                        </li>

                        <li class="recent-menu-item">
                            <a href="./detail.html">
                                <div class="menu-img-area">
                                    <span class="badge-popular">인기</span>
                                    <img class="menu-img" src="https://via.placeholder.com/80" alt="메뉴사진">
                                </div>
                                <p class="menu-name">칠리베이컨 웜볼</p>
                                <p class="menu-price">6,100원</p>
                            </a>
                            <a href="#" class="badge-cart">
                                <img src="../assets/images/ico-cart.svg" alt="주문하기" class="ico-cart">
                            </a>
                        </li>

                        <li class="recent-menu-item">
                            <a href="./detail.html">
                                <div class="menu-img-area">
                                    <span class="badge-popular">인기</span>
                                    <img class="menu-img" src="https://via.placeholder.com/80" alt="메뉴사진">
                                </div>
                                <p class="menu-name">칠리베이컨 웜볼</p>
                                <p class="menu-price">6,100원</p>
                            </a>
                            <a href="#" class="badge-cart">
                                <img src="../assets/images/ico-cart.svg" alt="주문하기" class="ico-cart">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>`
    
  }
}