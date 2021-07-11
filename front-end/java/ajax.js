// --------- Méthode POST

function postAjax(data){
  fetch('http://localhost:3000/api/cameras/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => res.text())
  .then((data) => JSON.parse(data))
  .then((order) => {
    localStorage.setItem('orderID', order.orderId)
    displayCommand();
  })
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
  .catch(e => console.error('error', e))
}