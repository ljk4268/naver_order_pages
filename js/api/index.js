async function fetchGetRecentOrders(){
  const response = await fetch("http://localhost:3000/recent-orders");

  const data = await response.json()

  return data;
}

async function fetchGetMenuGroups(){
  const response = await fetch("http://localhost:3000/menu-Groups");

  const data = await response.json()

  return data;
}

async function fetchGetMenu(menuId){
  const response = await fetch("http://localhost:3000/menu/" + menuId);

  const data = await response.json()

  return data;
}

export { fetchGetRecentOrders, fetchGetMenuGroups, fetchGetMenu };