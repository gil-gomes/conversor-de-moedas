function convertMoney() {
  try {
    var moneyA = select.options[select.selectedIndex].value; // Modeda 1
    var moneyB = select2.options[select2.selectedIndex].value; // Modeda 2

    if (!validateInputs(moneyA, moneyB)) {
      return;
    }

    const btnConvert =
      document.getElementById("btn-convert") ||
      document.querySelector('button[onclick="convertMoney()"]');
    const pResult = document.getElementById("pResult");
    const resultBox = document.getElementById("result");
    const apiKey = window.EXCHANGE_API_KEY || "";
    const valueEl = document.getElementById("input-value");
    let value = parseFloat(valueEl.value);

    if (isNaN(value) || value <= 0) {
      valueEl.classList.add("input-error");
      showAlertError("Informe um valor maior que zero.");
      return;
    }

    setLoading(btnConvert, true);

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
        if (!response || typeof response.result !== "number") {
          throw new Error("Resposta inválida da API.");
        }
        const formatter = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: moneyB,
        });
        pResult.textContent = formatter.format(response.result);
        resultBox.classList.add("result--flash");
        setTimeout(() => resultBox.classList.remove("result--flash"), 700);
      })
      .catch((error) => {
        showAlertError("Erro ao buscar cotação: " + error.message);
      })
      .finally(() => {
        setLoading(btnConvert, false);
      });
  } catch (error) {
    const btnConvert =
      document.getElementById("btn-convert") ||
      document.querySelector('button[onclick="convertMoney()"]');
    setLoading(btnConvert, false);
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

function setLoading(button, isLoading) {
  if (!button) return;
  if (isLoading) {
    button.classList.add("is-loading");
    button.setAttribute("aria-busy", "true");
    button.disabled = true;
    const original = button.dataset.originalText || button.textContent;
    button.dataset.originalText = original;
    button.textContent = "Convertendo...";
  } else {
    button.classList.remove("is-loading");
    button.removeAttribute("aria-busy");
    button.disabled = false;
    if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
    }
  }
}

// limpar erro visual ao digitar novamente
const inputValueEl = document.getElementById("input-value");
if (inputValueEl) {
  inputValueEl.addEventListener("input", () => {
    inputValueEl.classList.remove("input-error");
  });
}
