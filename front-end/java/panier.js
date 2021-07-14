main();

function main() {
  let itemOfPanier = JSON.parse(localStorage.getItem("Panier"));
  if (localStorage.getItem("Panier") != null) {
    document.querySelector('#mainProduct').style.display = 'block'
    document.querySelector('#emptyShopCart').style.display = 'none'
    // Affichage des éléments du panier
    displayProduct(itemOfPanier);
    btnToChangePrice(itemOfPanier);
    commande();
  } else {
    document.querySelector('#mainProduct').style.display = 'none'
    document.querySelector('#emptyShopCart').style.display = 'block'
    // console.log(document.querySelector('main'));
  }
}

function displayProduct(data) {
  for (i = 0; i < data.length; i++) {
    const template = document.getElementById("template");
    const clone = document.importNode(template.content, true);

    clone.getElementById("img").src = data[i].imageUrl;
    clone.getElementById("title").textContent = data[i].name;
    clone.getElementById("lense").textContent = data[i].lense;
    clone.getElementById("price").textContent =
      data[i].price * data[i].inCart + " €";
    clone.getElementById("inCart").textContent = data[i].inCart;

    document.getElementById("productContainer").appendChild(clone);
    document.getElementById("more").id = i;
    document.getElementById("remove").id = i;
  }
  calculTotal(data);
}

function calculTotal(product) {
  let total = 0;
  for (i = 0; i < product.length; i++) {
    total += product[i].price * product[i].inCart;
  }
  document.getElementById("total").innerText = total + " €";
  return total;
}

function btnToChangePrice(inCart) {
  let btn = [...document.querySelectorAll(".btn-setItem")];
  btn.forEach((e) => {
    e.onclick = () => {
      let element = document.getElementById("productContainer");

      if (e.classList[0] === "suppr") {
        const lense = e.parentNode.parentNode.querySelector("#lense");
        const name = e.parentNode.parentNode.querySelector("#title");
        console.log(name, lense, inCart);
        for (i = 0; i < inCart.length; i++) {
          if (
            lense.textContent === inCart[i].lense &&
            name.textContent === inCart[i].name
          ) {
            inCart.splice(i, 1);
          }
        }
      } else if (e.classList[0] === "more") {
        inCart[e.id].inCart++;
      } else {
        if (inCart[e.id].inCart > 1) {
          inCart[e.id].inCart--;
        }
      }
      localStorage.setItem("Panier", JSON.stringify(inCart));
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      if (inCart.length === 0) {
        localStorage.removeItem("Panier");
        console.log(localStorage.getItem("Panier"));
      }
      main();
    };
  });
}

function commande() {
  document.getElementById("btn-displayForm").addEventListener("click", () => {
    let formContain = document.getElementById("formulaireContainer");

    if (formContain.style.display != "block") {
      formContain.style.display = "block";
      document.getElementById("btn-displayForm").style.display = "none";
    }
    formValidate();
  });
}
