if (getCookie("balance") == null) {
  setCookie("balance", 1000);
}

// COOKIE SETTER AND GETTER
function setCookie(name, value) {
    let expires = new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

// CHANGE BALANCE
function balance(bet, payout) {
    let balance = parseFloat(getCookie("balance"));
    bet = parseFloat(bet);
    payout = parseFloat(payout);

    setCookie("balance", ((balance - bet) + payout).toFixed(2));

    document.getElementById("balance").innerHTML = "$" + getCookie("balance");
}

function resetBalance(value) {
    value = parseFloat(value).toFixed(2);
    setCookie("balance", value);
    document.getElementById("balance").innerHTML = "$" + value;
}