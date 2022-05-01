// index.js 자체가 모든 js들의 부모. ( = root)
// 맨처음으로 클래스 App을 가져와
// App에는 헤더랑 메뉴페이지가 있어. 그걸 가져와. 

import App from './App.js';
// 아래 코드들이 다른 index.js들을 가지고 오니까 App에 헤더랑 메뉴페이지들 가져올 수 있어. 
// import './pages/index'가 MenuPage.js에 있는 내용을 다 가지고와.
import './pages/index';
//import './components/index'가 components 요소 내용들을 다 가지고와. 
import './components/index';

// 위 3가지 코드들이 이 화면에 html처럼 그려지고 필요한 태그위치에 가서 랜더링대.


// index.html에서 index.js를 실행해.
// html에 있는 태그 naver-order-app에 이 파일안에 있는 모든 내용들이 들어가. 
customElements.define('naver-order-app', App);