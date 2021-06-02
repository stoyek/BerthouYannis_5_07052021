main()

async function main() {
  const data = await getProduct();
  getProduct();
  displayProduct(data);
  
}

function getProduct() {
  return fetch("http://localhost:3000/api/cameras")
  .then((res) => res.json())
  .then((data) => {
    console.log("getProduct :", data)
    return data
  })
}

function displayProduct(data) {
  for(i = 0; i < data.length; i++){

    const template = document.getElementById('template');
    const clone = document.importNode(template.content, true)
    console.log(clone);

      clone.getElementById("img").src = data[i].imageUrl
      clone.getElementById("title").textContent = data[i].name
      clone.getElementById("description").textContent = data[i].description
      clone.getElementById("price").textContent = data[i].price /100 + ' €'
      clone.getElementById("btn").href = 'productPage.html?' + data[i]._id;

    document.getElementById("cardsContainer").appendChild(clone)

  }
}

