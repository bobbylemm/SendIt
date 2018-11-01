const key = Object.keys(sessionStorage)
const allDeliveries = JSON.parse(sessionStorage.getItem(key[1]));
console.log(allDeliveries)