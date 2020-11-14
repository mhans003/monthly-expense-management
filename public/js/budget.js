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

function outputResults(balance, totalExpense){
  const balanceDiv = document.createElement("div");
  const totalExpenseDiv = document.createElement("div");
  //balanceDiv.classList.add("");

  const balanceSpan = document.createElement("span");
  balanceSpan.classList.add("text-success");
  balanceSpan.innerText = `$${balance.toFixed(2)}`;

  const expenseSpan = document.createElement("span");
  expenseSpan.classList.add("text-danger");
  expenseSpan.innerText = `$${totalExpense.toFixed(2)}`;

  balanceDiv.innerHTML = "Amount left: ";
  balanceDiv.appendChild(balanceSpan);

  totalExpenseDiv.innerHTML = "Amount Spent: ";
  totalExpenseDiv.appendChild(expenseSpan);

  //Append elements to page
  document.getElementById("budgetFields").appendChild(balanceDiv);
  document.getElementById("budgetFields").appendChild(totalExpenseDiv);
}

budgetBtn.addEventListener("click", balance);
