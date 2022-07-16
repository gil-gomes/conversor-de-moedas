function convertMoney(){
    var moneyA = select.options[select.selectedIndex].value; // Modeda 1
    var moneyB = select2.options[select2.selectedIndex].value; // Modeda 2

    if(!validateInputs(moneyA, moneyB)){
        return
    }

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
    }).catch(error => console.log(error.message));
}

function validateInputs(moneyA, moneyB) {
    if(moneyA === '---' || moneyB === '---'){
        const error = new Error('Por favor informe os pares de moedas!')
        showAlertError(error.message);
        return false;
    }

    if(moneyA === moneyB || moneyB === moneyA){
        const error = new Error('Por favor informe pares de moedas diferentes!')
        showAlertError(error.message);
        return false;
    }

    return true;
}

function showAlertError(message) {
    Swal.fire({
        title: 'Ops',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}
