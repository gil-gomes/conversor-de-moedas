const coins = [
    // { cod: '', name: '' },
    { cod: 'BRL', name: 'Real' },
    { cod: 'USD', name: 'Dolar' },
    { cod: 'EUR', name: 'Euro' },
];

// Elementos globais
var divSelect  = document.querySelector('.select');
var select = document.getElementById('select-money');
var select2 = document.createElement('select');

// Função para criar opções do select
function createOptions(){
    
    for(let i = 0; i < coins.length; i++) {
        var option = document.createElement('option');
        option.value = coins[i].cod;
        option.text = coins[i].name;
        option.classList.add("options");
        select.add(option);
    }

    select2 = select.cloneNode(true);
    select2.setAttribute('name', 'money2');
    select2.setAttribute('id', 'select-money-2');
    select2.value = coins[1].cod;
    divSelect.appendChild(select2);
}

createOptions();