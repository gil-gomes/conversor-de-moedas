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

    // Limpar mensagem de erro anterior
    hideError();

    if (isNaN(value) || value <= 0) {
      valueEl.classList.add("input-error");
      showError("Informe um valor maior que zero.");
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
        // Limpar erro em caso de sucesso
        hideError();
      })
      .catch((error) => {
        showError("Não foi possível realizar a conversão. Tente novamente.");
      })
      .finally(() => {
        setLoading(btnConvert, false);
      });
  } catch (error) {
    const btnConvert =
      document.getElementById("btn-convert") ||
      document.querySelector('button[onclick="convertMoney()"]');
    setLoading(btnConvert, false);
    showError("Não foi possível realizar a conversão. Tente novamente.");
  }
}

function validateInputs(moneyA, moneyB) {
  if (moneyA === "---" || moneyB === "---") {
    showError("Por favor informe os pares de moedas!");
    return false;
  }

  if (moneyA === moneyB || moneyB === moneyA) {
    showError("Por favor informe pares de moedas diferentes!");
    return false;
  }

  return true;
}

function showError(message) {
  const errorElement = document.getElementById("error-message");
  const valueEl = document.getElementById("input-value");

  errorElement.textContent = message;
  errorElement.classList.add("show");
  valueEl.classList.add("input-error");
}

function hideError() {
  const errorElement = document.getElementById("error-message");
  const valueEl = document.getElementById("input-value");

  errorElement.textContent = "";
  errorElement.classList.remove("show");
  valueEl.classList.remove("input-error");
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
    hideError();
  });
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  const next = isDark ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
}

function applyTheme(theme) {
  var root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  var btn = document.getElementById("btn-theme");
  if (btn) {
    var isDark = theme === "dark";
    btn.setAttribute("aria-checked", String(isDark));
  }
}

(function initTheme() {
  var stored = localStorage.getItem("theme");
  var theme = stored === "dark" ? "dark" : "light";
  applyTheme(theme);
})();
