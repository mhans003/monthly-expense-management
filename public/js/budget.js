const budgetBtn = document.getElementById("budgetBtn");

function balance() {
  const budgetInput = Number(document.getElementById("budgetInput").value);
  const totalExpense = Number(
    document.getElementById("totalExpense").innerText
  );
  const balance = budgetInput - totalExpense;
  console.log(balance);
  outputResults(balance, totalExpense);
}

function outputResults(balance, totalExpense) {
  //Clear old results:
  if (
    document.getElementById("balanceDiv") &&
    document.getElementById("totalExpenseDiv")
  ) {
    document
      .getElementById("budgetFields")
      .removeChild(document.getElementById("balanceDiv"));
    document
      .getElementById("budgetFields")
      .removeChild(document.getElementById("totalExpenseDiv"));
  }

  const balanceDiv = document.createElement("div");
  balanceDiv.setAttribute("id", "balanceDiv");
  const totalExpenseDiv = document.createElement("div");
  totalExpenseDiv.setAttribute("id", "totalExpenseDiv");
  //balanceDiv.classList.add("");

  const balanceSpan = document.createElement("span");
  if (balance < 1) {
    balanceSpan.classList.add("text-danger");
  } else {
    balanceSpan.classList.add("text-success");
  }
  balanceSpan.innerText = `$${balance.toFixed(2)}`;

  const expenseSpan = document.createElement("span");
  expenseSpan.classList.add("text-danger");
  expenseSpan.innerText = `$${totalExpense.toFixed(2)}`;

  balanceDiv.innerHTML = "Remaining: ";
  balanceDiv.appendChild(balanceSpan);

  totalExpenseDiv.innerHTML = "Spent: ";
  totalExpenseDiv.appendChild(expenseSpan);

  //Append elements to page
  document.getElementById("budgetFields").appendChild(balanceDiv);
  document.getElementById("budgetFields").appendChild(totalExpenseDiv);
}

budgetBtn.addEventListener("click", balance);
