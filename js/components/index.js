import Header from './Header';
// 메뉴페이지에 132번쨰 줄에서 menu-list 가 불려져 
import MenuList from './MenuList';
// 메뉴페이지에 167번쨰 줄에서 order-type-list가 불려져 
import OrderTypeList from './OrderTypeList';
// 메뉴페이지에 96번쨰 줄에서 tab-list가 불려져 
import TabList from './TabList';
// 메뉴페이지에 104번쨰 줄에서 recent-menu-list가 불려져 
import RecentMenuItems from './RecentMenuList';



customElements.define('order-header', Header);
customElements.define('menu-list', MenuList);
customElements.define('order-type-list', OrderTypeList);
customElements.define('tab-list', TabList);
customElements.define('recent-menu-list', RecentMenuItems);




