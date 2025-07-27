let balance = 10000;
let openTrades = [];
let history = [];

function showTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
  document.getElementById(tab).style.display = 'block';
}

function buy() {
  const lot = parseFloat(document.getElementById("lotSize").value);
  if (!lot || lot <= 0) return alert("Enter valid lot size");

  const trade = {
    id: Date.now(),
    type: 'Buy',
    lot: lot,
    price: 1.0000 + Math.random().toFixed(4),
  };

  openTrades.push(trade);
  renderTrades();
}

function sell() {
  const lot = parseFloat(document.getElementById("lotSize").value);
  if (!lot || lot <= 0) return alert("Enter valid lot size");

  const trade = {
    id: Date.now(),
    type: 'Sell',
    lot: lot,
    price: 1.0000 - Math.random().toFixed(4),
  };

  openTrades.push(trade);
  renderTrades();
}

function closeTrade(id) {
  const index = openTrades.findIndex(t => t.id === id);
  if (index > -1) {
    const closed = openTrades.splice(index, 1)[0];
    history.push(closed);
    renderTrades();
    renderHistory();
  }
}

function renderTrades() {
  const table = document.getElementById("openTrades");
  table.innerHTML = `<tr><th>Type</th><th>Lot</th><th>Price</th><th>Action</th></tr>`;
  openTrades.forEach(trade => {
    table.innerHTML += `<tr>
      <td>${trade.type}</td>
      <td>${trade.lot}</td>
      <td>${trade.price}</td>
      <td><button onclick="closeTrade(${trade.id})">Close</button></td>
    </tr>`;
  });
}

function renderHistory() {
  const table = document.getElementById("historyTable");
  table.innerHTML = `<tr><th>Type</th><th>Lot</th><th>Price</th></tr>`;
  history.forEach(trade => {
    table.innerHTML += `<tr>
      <td>${trade.type}</td>
      <td>${trade.lot}</td>
      <td>${trade.price}</td>
    </tr>`;
  });
}
