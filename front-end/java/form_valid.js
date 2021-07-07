function formValidate() {
  const form = document.querySelector("#userDataForm");

  let firstNameVerif = 0;
  let lastNameVerif = 0;
  let adressVerif = 0;
  let cityVerif = 0;
  let postalCodeVerif = 0;
  let emailVerif = 0;

  form.firstName.addEventListener("input", () => {
    firstNameVerif = validate(form.firstName);
  });
  form.lastName.addEventListener("input", () => {
    lastNameVerif = validate(form.lastName);
  });
  form.address.addEventListener("input", () => {
    adressVerif = validate(form.address);
  });
  form.city.addEventListener("input", () => {
    cityVerif = validate(form.city);
  });
  form.postalCode.addEventListener("change", () => {
    postalCodeVerif = validate(form.postalCode);
  });
  form.email.addEventListener("change", () => {
    emailVerif = validate(form.email);
  });

  document.getElementById("btn-submit").addEventListener("click", (e) => {
    e.preventDefault();

    if (
      firstNameVerif == 1 &&
      lastNameVerif == 1 &&
      adressVerif == 1 &&
      cityVerif == 1 &&
      postalCodeVerif == 1 &&
      emailVerif == 1
    ) {
      const contact = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value,
      };

      console.log(contact);

      let product = JSON.parse(localStorage.getItem("Panier"));
      let products = [];

      for (item of product) {
        products.push(item.id);
      }

      const data = {
        contact: contact,
        products: products,
      };

      postAjax(data)
      
      console.log("yepii");
    } else {
      console.error(
        "error",
        firstNameVerif,
        lastNameVerif,
        adressVerif,
        cityVerif,
        postalCodeVerif,
        emailVerif
      );
      alert("Veuiller vérifier le formulaire avant envoie");
    }
  })
}

function displayCommand() {
  if (localStorage.getItem("orderID") != null) {
    console.log("yep");
    window.location.href = "./commande.html";
  } else {
    console.log("none");
  }
}

function validate(input) {
  const onlyLeterReg = new RegExp("^[A-Za-z-éçàè]+$", "g");
  const onlyNumberReg = new RegExp("^[0-9]{5}$", "g");
  const addressReg = new RegExp("^[A-Za-z0-9-éçàè'. ]+$", "g");
  const emailReg = new RegExp(
    "^[a-zA-Z0-9-_.]+[@]{1}[a-zA-Z0-9-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  const errorSmall = document.querySelectorAll("small");

  switch (input.name) {
    case "firstName": //Test Prénom
      if (onlyLeterReg.test(input.value)) {
        errorSmall[0].innerText = "";
        return 1;
      } else {
        errorSmall[0].innerText = "Format du Prénom incorrect";
        return 0;
      }
      break;

    case "lastName": //Test Nom
      if (onlyLeterReg.test(input.value)) {
        errorSmall[1].innerText = "";
        return 1;
      } else {
        errorSmall[1].innerText = "Format du Nom incorrect";
        return 0;
      }
      break;

    case "address": //Test Adresse
      if (addressReg.test(input.value)) {
        errorSmall[2].innerText = "";
        return 1;
      } else {
        errorSmall[2].innerText = "Format de l'Adresse incorrect";
        return 0;
      }
      break;
    case "city":
      if (onlyLeterReg.test(input.value)) {
        errorSmall[3].innerText = "";
        return 1;
      } else {
        errorSmall[3].innerText = "Format de votre Ville incorrect";
        return 0;
      }
      break;
    case "postalCode":
      if (onlyNumberReg.test(input.value)) {
        errorSmall[4].innerText = "";
        return 1;
      } else {
        errorSmall[4].innerText = "Format du Code postale incorrect";
        return 0;
      }
      break;
    case "email":
      if (emailReg.test(input.value)) {
        errorSmall[5].innerText = "";
        return 1;
      } else {
        errorSmall[5].innerText = "Format de l'e-mail incorrect";
        return 0;
      }
      break;

    default:
      break;
  }
  // console.log(testEmail.test(input.value));
}
