function convertMoney(){

    var moneyA = select.options[select.selectedIndex].value; // Modeda 1
    var moneyB = select2.options[select2.selectedIndex].value; // Modeda 2

    validateInputs(moneyA, moneyB);

    const pResult = document.getElementById('pResult');

    const url = `http://economia.awesomeapi.com.br/json/last/${moneyA}-${moneyB}`;

    var headers = new Headers();

    headers.append('Accept', 'application/json');

    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: headers,
    })
    .then( async res => {
        const result = await res.json();
        const body = result[`${moneyA}${moneyB}`]; // Pega o corpo da conversão

        pResult.innerHTML = 'R$ ' + body.ask.substring(0, 4);

    })
}

function validateInputs(moneyA, moneyB) {
    if(moneyA === '---' || moneyB === '---'){
        const error = new Error('Por favor informe os pares de moedas!')
        alert(error.message);
        return;
    }

    if(moneyA === moneyB || moneyB === moneyA){
        const error = new Error('Por favor informe pares de moedas diferentes!')
        alert(error.message);
        return;
    }
}
