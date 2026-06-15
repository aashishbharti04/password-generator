const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}",
};

const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const lengthLabel = document.getElementById("lengthLabel");

function generate() {
  const length = Number(lengthEl.value);
  let pool = "";
  for (const key of Object.keys(SETS)) {
    if (document.getElementById(key).checked) pool += SETS[key];
  }

  if (!pool) {
    passwordEl.value = "Select at least one option";
    return;
  }

  let result = "";
  const random = new Uint32Array(length);
  crypto.getRandomValues(random);
  for (let i = 0; i < length; i++) {
    result += pool[random[i] % pool.length];
  }
  passwordEl.value = result;
}

function copy() {
  if (!passwordEl.value) return;
  navigator.clipboard.writeText(passwordEl.value);
}

lengthEl.addEventListener("input", () => {
  lengthLabel.textContent = lengthEl.value;
});
document.getElementById("generate").addEventListener("click", generate);
document.getElementById("copy").addEventListener("click", copy);

generate();
