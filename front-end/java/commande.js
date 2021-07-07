displayCommandNumber();

function displayCommandNumber(){
    document
    .getElementById('numberCommande')
    .innerText = localStorage.getItem('orderID')

    if(localStorage.getItem('orderID') != null){
        localStorage.removeItem('Panier')
        localStorage.removeItem('orderID')
    }
}