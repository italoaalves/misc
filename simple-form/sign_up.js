const radios = document.querySelectorAll("input[type='radio']");
const cpfField = document.querySelector("#cpf-group");
const cnpjField = document.querySelector("#cnpj-group");
const birthdayField = document.querySelector("#birthday-group");
const cepField = document.querySelector("#cep-group");
const submitButton = document.querySelector("#submit");

formRules = {
  birthdayField: /^\d+$/,
  cepField: /^\d+$/,
};

function personType() {
  if (radios[0].checked) {
    cnpjField.style.display = "none";
    cnpjField.querySelector("input").value = "";
    cnpjField.setAttribute.disabled = true;

    cpfField.style.display = "block";
    cpfField.setAttribute.disabled = false;

    birthdayField.style.display = "block";
    birthdayField.setAttribute.disabled = false;
  } else {
    cpfField.style.display = "none";
    cpfField.querySelector("input").value = "";
    cpfField.setAttribute.disabled = true;

    birthdayField.style.display = "none";
    birthdayField.querySelector("input").value = "";
    birthdayField.setAttribute.disabled = true;

    cnpjField.style.display = "block";
  }
}

function validateForm() {
  return new Promise((resolve, reject) => {
    let errors = [];

    if (!formRules.cepField.test(cepField.querySelector("input").value)) {
      errors.push("CEP Inválido");
    }
    if (
      !formRules.birthdayField.test(birthdayField.querySelector("input").value)
    ) {
      errors.push("Data de nascimento inválida");
    }

    if (errors.length > 0) {
      reject(errors);
    } else {
      resolve();
    }
  });
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  validateForm()
    .then(() => {
      // POST request
      alert("Sucesso. Formulário enviado à API");
    })
    .catch((errors) => {
      alert(errors);
    });
});

for (let radio of radios) radio.addEventListener("input", personType);

birthdayField.querySelector("input").addEventListener("keypress", (event) => {
  if (!formRules.birthdayField.test(event.key)) {
    event.preventDefault();
    alert("Apenas números são aceitos");
  }
});

cepField.querySelector("input").addEventListener("keypress", (event) => {
  if (!formRules.cepField.test(event.key)) {
    event.preventDefault();
    alert("Apenas números são aceitos");
  }
});

cpfField.style.display = "none";
cpfField.setAttribute.disabled = true;
birthdayField.style.display = "none";
birthdayField.setAttribute.disabled = true;
cnpjField.style.display = "none";
cnpjField.querySelector("input").value = "";
cnpjField.setAttribute.disabled = true;
