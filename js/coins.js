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

  // clonar select para moeda de destino
  select2 = select.cloneNode(true);
  select2.setAttribute("name", "money2");
  select2.setAttribute("id", "select-money-2");
  select2.value = coins[0].cod;

  // criar wrappers com rótulos para melhorar hierarquia visual
  var originWrapper = document.createElement("div");
  originWrapper.className = "field";
  var originLabel = document.createElement("label");
  originLabel.textContent = "De";
  originLabel.setAttribute("for", "select-money");
  originWrapper.appendChild(originLabel);
  originWrapper.appendChild(select);

  var destWrapper = document.createElement("div");
  destWrapper.className = "field";
  var destLabel = document.createElement("label");
  destLabel.textContent = "Para";
  destLabel.setAttribute("for", "select-money-2");
  destWrapper.appendChild(destLabel);
  destWrapper.appendChild(select2);

  // inserir na grade
  divSelect.appendChild(originWrapper);
  divSelect.appendChild(destWrapper);

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
  
  // Verificar se há valor no input e se já foi feita uma conversão
  const valueEl = document.getElementById("input-value");
  const pResult = document.getElementById("pResult");
  const hasValue = valueEl && valueEl.value && parseFloat(valueEl.value) > 0;
  const hasConversion = pResult && pResult.textContent !== "R$ 0,00" && pResult.textContent !== "";
  
  // Se houver valor e conversão anterior, chamar a função de conversão automaticamente
  if (hasValue && hasConversion) {
    // Pequeno delay para garantir que a interface atualize antes da conversão
    setTimeout(function() {
      convertMoney();
    }, 100);
  }
}
