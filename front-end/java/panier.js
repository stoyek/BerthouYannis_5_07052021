main();

function main() {
  let itemOfPanier = JSON.parse(localStorage.getItem("Panier"));

  displayProduct(itemOfPanier);
  btnToChangePrice(itemOfPanier);
  commande();
}

function displayProduct(data) {
  for (i = 0; i < data.length; i++) {
    const template = document.getElementById("template");
    const clone = document.importNode(template.content, true);

    clone.getElementById("img").src = data[i].imageUrl;
    clone.getElementById("title").textContent = data[i].name;
    clone.getElementById("lense").textContent = data[i].lense;
    clone.getElementById("price").textContent = data[i].price + " €";
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

      if (e.classList[0] === "more") {
        inCart[e.id].inCart++;
      } else {
        if (inCart[e.id].inCart > 1) {
          inCart[e.id].inCart--;
        } else {
          e.style.display = null;
        }
      }
      localStorage.setItem("Panier", JSON.stringify(inCart));
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      displayProduct(inCart);
      btnToChangePrice(inCart);
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


