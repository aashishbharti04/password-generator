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

  // Optionally drop characters that are easy to confuse
  if (document.getElementById("noAmbiguous").checked) {
    pool = pool.replace(/[l1IO0]/g, "");
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
  showStrength(length, pool.length);
}

function showStrength(length, poolSize) {
  // Rough strength based on total entropy in bits
  const bits = length * Math.log2(poolSize);
  const el = document.getElementById("strength");
  let label = "Weak";
  if (bits >= 60) label = "Fair";
  if (bits >= 80) label = "Strong";
  if (bits >= 100) label = "Very strong";
  el.textContent = `Strength: ${label} (~${Math.round(bits)} bits)`;
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
