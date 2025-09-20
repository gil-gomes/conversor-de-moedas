const coins = [
  { cod: "---", name: "---" },
  { cod: "BRL", name: "Real" },
  { cod: "USD", name: "Dólar" },
  { cod: "EUR", name: "Euro" },
  { cod: "GBP", name: "Libra Esterlina" },
  { cod: "JPY", name: "Iene" },
  { cod: "ARS", name: "Peso Argentino" },
  { cod: "CAD", name: "Dólar Canadense" },
  { cod: "AUD", name: "Dólar Australiano" },
  { cod: "CHF", name: "Franco Suíço" },
  { cod: "CNY", name: "Yuan Chinês" },
  { cod: "BTC", name: "Bitcoin" },
];

var divSelect = document.querySelector(".select");
var select = document.getElementById("select-money");
var select2 = document.createElement("select");

/**
 * Criar as opções de moedas
 */

function createOptions() {
  coins.forEach((coin) => {
    var option1 = document.createElement("option");
    option1.value = coin.cod;
    option1.text = coin.name;
    option1.classList.add("options");
    select.add(option1);
  });

  select2 = select.cloneNode(true);
  select2.setAttribute("name", "money2");
  select2.setAttribute("id", "select-money-2");
  select2.value = coins[0].cod;
  divSelect.appendChild(select2);

  select.addEventListener("change", handleSelectChange);
  select2.addEventListener("change", handleSelectChange);
  handleSelectChange();
}

function handleSelectChange() {
  // Impede seleção igual
  for (let i = 0; i < select.options.length; i++) {
    select2.options[i].disabled = select.options[i].selected;
  }
  for (let i = 0; i < select2.options.length; i++) {
    select.options[i].disabled = select2.options[i].selected;
  }

  // Habilita/desabilita botões
  const btnConvert = document.querySelector('button[onclick="convertMoney()"]');
  const btnInvert = document.querySelector('button[onclick="invertCoins()"]');
  const valid =
    select.value !== "---" &&
    select2.value !== "---" &&
    select.value !== select2.value;
  btnConvert.disabled = !valid;
  btnInvert.disabled = !valid;
}

createOptions();

/**
 * Inverter moedas selecionadas
 */
function invertCoins() {
  var temp = select.selectedIndex;
  select.selectedIndex = select2.selectedIndex;
  select2.selectedIndex = temp;
}
