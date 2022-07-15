const coins = [
    { cod: '---', name: '---' },
    { cod: 'BRL', name: 'Real' },
    { cod: 'USD', name: 'Dolar' },
    { cod: 'EUR', name: 'Euro' },
];

var divSelect  = document.querySelector('.select');
var select = document.getElementById('select-money');
var select2 = document.createElement('select');

/**
 * Criar as opções de moedas
 */
function createOptions(){
    coins.map(coin => {
        var option = document.createElement('option');
        option.value = coin.cod;
        option.text = coin.name;
        option.classList.add("options");
        select.add(option);
    });

    select2 = select.cloneNode(true);
    select2.setAttribute('name', 'money2');
    select2.setAttribute('id', 'select-money-2');
    select2.value = coins[0].cod;
    divSelect.appendChild(select2);
} createOptions();