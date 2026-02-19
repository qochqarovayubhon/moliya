// LOGIN ma'lumotlari
const USERNAME = "axn";
const PASSWORD = "999";

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === USERNAME && pass === PASSWORD) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("appBox").style.display = "block";
        showTransactions();
    } else {
        alert("Login yoki parol xato!");
    }
}

function logout() {
    location.reload();
}

function addTransaction() {
    const amountInput = document.getElementById("amount");
    const reasonInput = document.getElementById("reason");
    const typeInput = document.getElementById("type");

    const amount = parseFloat(amountInput.value);
    const reason = reasonInput.value.trim();
    const type = typeInput.value;
    const date = new Date().toLocaleDateString();

    if (isNaN(amount) || reason === "") {
        alert("Ma'lumotlarni to'ldiring!");
        return;
    }

    const transaction = {
        id: Date.now(),
        amount,
        reason,
        type,
        date
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    amountInput.value = "";
    reasonInput.value = "";

    showTransactions();
}

function showTransactions() {
    const history = document.getElementById("history");
    history.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
        const li = document.createElement("li");

        if (t.type === "income") {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
        }

        li.innerHTML = `
            ${t.date} | ${t.reason} | ${t.type === "income" ? "+" : "-"}${t.amount}
            <button onclick="deleteTransaction(${t.id})">❌</button>
        `;

        history.appendChild(li);
    });

    const balance = totalIncome - totalExpense;

    document.getElementById("totalIncome").textContent = "Jami Daromad: " + totalIncome;
    document.getElementById("totalExpense").textContent = "Jami Xarajat: " + totalExpense;
    document.getElementById("balance").textContent = "Balans: " + balance;
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    showTransactions();
}

function clearAll() {
    localStorage.removeItem("transactions");
    transactions = [];
    showTransactions();
}
