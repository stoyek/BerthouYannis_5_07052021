main()

async function main() {
  const urlOfProductChoose =  'http://localhost:3000/api/cameras/'
    + window.location.search.replace('?', '');
  // 1_ Get product choose by user on server
  const product = ajaxGet(urlOfProductChoose)
  console.log(product)

  product
    .then((product) => {
      displayProduct(product);
      addToShop(product); 
    })

}

// 1_ Get product choose by user on server
function ajaxGet(url) {
  
  const promise = new Promise(function (resolve, reject) {
    
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4 && xhr.status === 200){
        resolve(JSON.parse(xhr.responseText))
        console.log('readyState: ', xhr.readyState);
        console.log('status: ', xhr.status);
      }
      else{
        console.log('readyState: ', xhr.readyState);
        console.log('status: ', xhr.status);
      }
    }
    xhr.send();
  });
  return promise;
}

// 2_ Display the product choosed
function displayProduct(product) {
  let i = 0;
  const mainHTML = document.querySelector("#main")
  mainHTML.insertAdjacentHTML(
    "afterbegin",
    `
        <div id="product" class="align-self-center d-flex flex-row flex-wrap ">
        <img id="img" class="col-12 col-lg-6" src="${product.imageUrl} " alt="" />
        <div class="col-1"></div>
        <div class="lg-border-start col-md-10 col-lg-5 row ">
                <h2 class="">${product.name}</h2>
                <div class="">${product.description}</div>
            <div id="price" class="col">
                <div class="" id="price">${product.price /100} €</div>
            </div>
            <div class="col-12"></div>
            <div class="col-5">
              <select id="select-lenses" class="flex form-select" aria-label="">
              </select>
            </div>
            <button id="btnAddShop" class="col-6 align-self-start btn btn-primary btn-custom">
                Ajouter au panier
            </button>
        </div>`
  )
  for (item of product.lenses) {
    i++;
    document.getElementById("select-lenses").insertAdjacentHTML(
      "beforeend",
      `<option id="lenses-option" value="${item}">${item}</option>`
    )
  }
}

// 3_ Add the product with choosed lenses to localStorage
function addToShop(product) {
  document.getElementById('btnAddShop')
    .addEventListener('click', ()=>{
      let panier = localStorage.getItem('Panier');
      let data ={
        id: product._id,
        lense: document.getElementById("select-lenses").value,
        inCart: 1,
        imageUrl: product.imageUrl,
        name : product.name,
        price: product.price /100
      }
      
      //If key 'Panier' exist, increment inCart or add data to array.
      if(panier){ 
        panier = JSON.parse(panier);
        if(testSameIdShop(data, panier)){
          setLocalItem();
        }
        else{
          panier.push(data)
          setLocalItem();
        }
      }
      else{
        panier = [];
        panier.push(data)
        setLocalItem();
      }
      blurShop(); // Display Popup

      //function qui test si il y a déjà un produit identique dans le panier
      function testSameIdShop(data, panier){
        for(i = 0; i < panier.length; i++){
          if(panier[i].id == data.id && panier[i].lense == data.lense){
            panier[i].inCart ++;
            return 1
          }
        }
        return 0;
      }
      function setLocalItem(){
        localStorage.setItem('Panier', JSON.stringify(panier))
      }
    })
}

// Style for css, when user add to cart.
function blurShop(){
  document.querySelector('#popUpBg').style.display = 'block'
  document.querySelector('#overlay').style.display = 'block'
  document.querySelector('main').style.filter = 'blur(10px)'
}
