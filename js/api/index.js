async function fetchGetRecentOrders() {
  const response = await fetch("http://localhost:3000/recent-orders");

  const data = await response.json()

  return data;
}

export { fetchGetRecentOrders }

async function fetchGetMenuGroups() {
  const response = await fetch("http://localhost:3000/menu-groups");

  const data = await response.json()

  return data;
}

export { fetchGetMenuGroups }