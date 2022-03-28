
function getMoney(){
    const moneyA = select.options[select.selectedIndex].value; // Modeda 1
    const moenyB = select2.options[select2.selectedIndex].value; // Modeda 2
    const mult = document.getElementById('mult').value;

    const pResult = document.getElementById('pResult');

    const url = `http://economia.awesomeapi.com.br/json/last/${moneyA}-${moenyB}`;

    var headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append('Origin','http://127.0.0.1:5500');

    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: headers,
    })
    .then( async res => {
        const result = await res.json();
        const body = result[`${moneyA}${moenyB}`]; // Pega o corpo da conversão

        pResult.innerHTML = 'R$ ' + body.ask.substring(0, 4);

    })
}
