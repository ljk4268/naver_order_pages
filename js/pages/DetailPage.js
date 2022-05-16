import {html} from 'lit';
import {fetchGetMenu} from '../api/index';
import View from '../view';
import SpinButton from '../components/SpinButton'

const DEFAULT_MENU = {
	"id": 1,
	"name": "음식 이름",
	"reviewPoint": 0.0,
	"description": "불러오는 중",
	"price": 0,
	"imageUrl": "https://ldb-phinf.pstatic.net/20200416_252/1587007251652svUkx_PNG/%C4%A5%B8%AE%BA%A3%C0%CC%C4%C1_%BF%FA%BA%BC.png?type=f220_220_60_sharpen",
	"pictures": [],
	"reviews": [],
}

const DEFAULT_OPTION = {
    id: 1,
    baseOptions: [],
    toppingSelectOptions: [],
    toppingAmountSelectOptions: [],
};


export default class DetailPage extends View {
	constructor(orderTypeIndex) {
		super();

		this.menu = DEFAULT_MENU;
        this.menuAmount = 1;
		this.orderTypeIndex = orderTypeIndex;
		this.orderType = orderTypeIndex === 0 ? '포장' : '매장';
        this.isPopupOpen = false;
        this.option = DEFAULT_OPTION;


		// split로 주소 '/'에 따라 나눠주고 
		// splice로 제거된 배열을 배열로 반환함. 
		// 프로그래밍에서 보통 '-1'은 맨 마지막 index를 의미함.
		// const [menuId]를 콘솔로그 찎으면 배열로 나와. ['1']이렇게. 
		// 배열에 있는 값을 하나씩 쓰고싶어? 
		// 그럼 []을 벗겨. 
		//console.log(menuId) 하면 1 나와. 배열벗겨진 모습 ㅇㅇ 
		const [menuId] = location.pathname.split('/').splice(-1);
		fetchGetMenu(menuId).then((response) => (this.menu = response));

	}

	static get properties() {
		return {
			menu: {
				type: Object
			},
			orderTypeIndex: {
				type: Number
			},
			orderType: {
				type: String
			},
            menuAmount: {
                type: Number 
            },
            isPopupOpen: {
                type: Boolean,
            },
            option: {
                type: Object,
            },

		}
	}

    openOrderPopup(){
        this.isPopupOpen = true;
        console.log(this.isPopupOpen)
    }

    closeOrderPopup(){
        this.isPopupOpen = false;
    }

    onIncreaseAmount(){
        this.menuAmount = this.menuAmount + 1;
    }

    onDecreaseAmount(){
        if(this.menuAmount <= 1 ){
            return
        }

        this.menuAmount = this.menuAmount - 1;
    }

	render() {
		return html `
    <div class="container">
        <order-header></order-header>

        <div class="menu-detail-area">
            <!-- 메뉴이미지영역 -->
            <div 
            class="menu-img"
            style="background-image: url('${this.menu.imageUrl}');">
            </div>

            <!-- 메뉴주문정보영역 -->
            <div class="menu-info-area">
                <div class="common-inner">
                    <!-- 메뉴정보영역 -->
                    <p class="menu-name-group">
                        <span class="menu-name">${this.menu.name}</span>
                        ${
                        this.menu.isPopular ? html `<span class="badge-popular">인기</span>` : ''}
                    </p>

                    <div class="menu-info-group">
                        <span class="menu-price">
                        ${this.menu.price}원</span>
                        <span class="menu-grade"><img 
                        src="../assets/images/ico-star.svg" 
                        alt=""
                        class="ico-star" 
                        />${this.menu.reviewPoint}</span>
                        <span class="menu-number-of-order">주문수<em>${this.menu.orderCount}</em></span>
                    </div>

                    <p class="menu-desc">
                    ${this.menu.description}
                    </p>
                    <!-- // 메뉴정보영역 -->

                    <!-- 메뉴주문영역 -->
    <div class="order-type-area">
        <div class="type-select">
            <div class="title">
                <svg viewBox="0 0 18 18" class="ico-n-logo">
                    <path fill-rule="evenodd" fill="currentColor"
                        d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
                    </path>
                </svg>f
                주문
            </div>
            <div class="tab-switch-box" role="tablist">
                <a
                @click = ${()=>(this.orderType = '포장')}
                class="tab-switch ${
                    this.orderType === '포장' ? 'is-active' : ''
                }" 
                    role="tab"
                    >🛍&nbsp;&nbsp;포장</a
                >
                <a 
                @click = ${()=>(this.orderType = '매장')}
                class="tab-switch ${this.orderType === '매장' ? 'is-active': ''}" 
                role="tab">
                🍽&nbsp;&nbsp;매장
                </a>
            </div>
        </div>
        <div class="type-amount">
            <div class="title">수량</div>
            ${SpinButton({
                count: this.menuAmount,
                onIncrease: this.onIncreaseAmount,
                onDecrease: this.onDecreaseAmount,
                })}
        </div>
        <button class="btn-order" @click=${this.openOrderPopup}>
        ${this.menuAmount}개 담기 
        ${this.menu.price * this.menuAmount}원
        </button>
        <!-- <button class="btn-order" disabled>지금 주문 가능한 시간이 아닙니다.</button> -->
    </div>
                    <!-- // 메뉴주문영역 -->
                </div>
            </div>
        </div>

<!-- 주문자리뷰영역 -->
<div class="menu-review-area">
<!-- 주문자사진 -->
<div class="orderer-img-area">
    <div class="common-inner">
        <div class="title">주문자 사진<span class="num">99</span></div>
        <div class="scroll-x">
            <ul class="orderer-pic-list">
                <li class="orderer-pic-item">
                    <a href="#" class="orderer-pic-link">
                        <img src="https://via.placeholder.com/104/fff/000" alt="">
                    </a>
                </li>
                <li class="orderer-pic-item">
                    <a href="#" class="orderer-pic-link">
                        <img src="https://via.placeholder.com/104/fff/000" alt="">
                    </a>
                </li>
                <li class="orderer-pic-item">
                    <a href="#" class="orderer-pic-link">
                        <img src="https://via.placeholder.com/104/fff/000" alt="">
                    </a>
                </li>
                <li class="orderer-pic-item">
                    <a href="#" class="orderer-pic-link">
                        <img src="https://via.placeholder.com/104/fff/000" alt="">
                    </a>
                </li>
                <li class="orderer-pic-item">
                    <a href="#" class="orderer-pic-link">
                        <img src="https://via.placeholder.com/104/fff/000" alt="">
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
<!-- // 주문자사진 -->

            <!-- 주문자리뷰 -->
            <div class="orderer-review-area">
                <div class="common-inner">
                    <div class="title">주문자 리뷰<span class="num">999</span></div>
                    <ul class="review-list">
                        <li class="review-item">
                            <div class="review-star">
                                <span class="ico-star-group">
                                    <span class="ico-star-group-fill" style="width: 90%;"></span>
                                </span>
                                <span class="point">4.5</span>
                            </div>
                            <p class="review-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                                repellat nihil enim doloremque! Illo fugit excepturi natus quis est error officiis nulla
                                saepe voluptatem accusantium, ab necessitatibus eveniet facilis numquam?</p>
                            <div class="review-info">
                                <span class="review-nickname">zero****</span>
                                <span class="review-date">2021. 10. 7 주문</span>
                            </div>
                        </li>

                        <li class="review-item">
                            <div class="review-star">
                                <span class="ico-star-group">
                                    <span class="ico-star-group-fill" style="width: 80%;"></span>
                                </span>
                                <span class="point">4.0</span>
                            </div>
                            <p class="review-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                                repellat nihil enim doloremque! Illo fugit excepturi natus quis est error officiis nulla
                                saepe voluptatem accusantium, ab necessitatibus eveniet facilis numquam?</p>
                            <div class="review-info">
                                <span class="review-nickname">zero****</span>
                                <span class="review-date">2021. 10. 7 주문</span>
                            </div>
                        </li>

                        <li class="review-item">
                            <div class="review-star">
                                <span class="ico-star-group">
                                    <span class="ico-star-group-fill" style="width: 70%"></span>
                                </span>
                                <span class="point">3.5</span>
                            </div>
                            <p class="review-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                                repellat nihil enim doloremque! Illo fugit excepturi natus quis est error officiis nulla
                                saepe voluptatem accusantium, ab necessitatibus eveniet facilis numquam?</p>
                            <div class="review-info">
                                <span class="review-nickname">zero****</span>
                                <span class="review-date">2021. 10. 7 주문</span>
                            </div>
                        </li>
                    </ul>

                    <button class="btn-more">더보기</button>
                </div>
            </div>
            <!-- //주문자리뷰 -->
        </div>
        <!-- // 주문자리뷰영역 -->

        <!-- 옵션팝업영역 -->
        <option-popup
            .menu=${this.menu}
            menuAmount=${this.menuAmount}
            .onAddCartItem=${this.onAddCartItem}
            .isPopupOpen=${this.isPopupOpen}
            .onPopupClose=${this.closeOrderPopup.bind(this)}
            .onIncreaseAmount=${this.increaseAmount.bind(this)}
            .onDecreaseAmount=${this.decreaseAmount.bind(this)}
        ></option-popup>
        <!-- //옵션팝업영역 -->
    </div>`
	}
}
