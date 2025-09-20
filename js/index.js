function convertMoney() {
  try {
    var moneyA = select.options[select.selectedIndex].value; // Modeda 1
    var moneyB = select2.options[select2.selectedIndex].value; // Modeda 2

    if (!validateInputs(moneyA, moneyB)) {
      return;
    }

    const pResult = document.getElementById("pResult");

    const apiKey = window.EXCHANGE_API_KEY || "";

    let value = document.getElementById("input-value").value || 1;

    const url = `https://api.exchangerate.host/convert?from=${moneyA}&to=${moneyB}&amount=${value}&access_key=${apiKey}`;

    var headers = new Headers();
    headers.append("Accept", "application/json");

    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: headers,
    })
      .then(async (res) => {
        const response = await res.json();
        pResult.innerHTML = "R$ " + response.result.toString().substring(0, 4);
      })
      .catch((error) => {
        showAlertError("Erro ao buscar cotação: " + error.message);
      });
  } catch (error) {
    showAlertError("Erro inesperado: " + error.message);
  }
}

function validateInputs(moneyA, moneyB) {
  if (moneyA === "---" || moneyB === "---") {
    const error = new Error("Por favor informe os pares de moedas!");
    showAlertError(error.message);
    return false;
  }

  if (moneyA === moneyB || moneyB === moneyA) {
    const error = new Error("Por favor informe pares de moedas diferentes!");
    showAlertError(error.message);
    return false;
  }

  return true;
}

function showAlertError(message) {
  Swal.fire({
    title: "Ops",
    text: message,
    icon: "error",
    confirmButtonText: "Ok",
  });
}
