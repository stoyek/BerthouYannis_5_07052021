displayCommandNumber();

function displayCommandNumber(){
    document
    .getElementById('numberCommande')
    .innerText = localStorage.getItem('orderID')

    localStorage.removeItem('Panier')
    localStorage.removeItem('orderID')
}