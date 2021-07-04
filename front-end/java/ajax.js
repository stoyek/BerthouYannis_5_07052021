// --------- Méthode POST

function postAjax(data){
  return fetch('http://localhost:3000/api/cameras/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
  .then((res) => res.text())
  .then((data) => JSON.parse(data))
  .then((order) => localStorage.setItem('orderID', order.orderId))
  .catch(e => console.error('error', e))
  
}

// --------- Méthode GET

function getProduct() {
  return fetch("http://localhost:3000/api/cameras")
  .then((res) => res.json())
  .then((data) => {
    console.log("getProduct :", data)
    return data
  })
  .catch(e => console.console.error('error', e))
}