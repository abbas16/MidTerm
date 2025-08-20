const networkPrefixes = {
  '0300': 'Jazz',
  '0301': 'Jazz',
  '0302': 'Jazz',
  '0303': 'Jazz',
  '0304': 'Jazz',
  '0305': 'Jazz',
  '0310': 'Zong',
  '0311': 'Zong',
  '0312': 'Zong',
  '0313': 'Zong',
  '0314': 'Zong',
  '0320': 'Warid',  // Warid now merged with Jazz
  '0321': 'Warid',
  '0322': 'Warid',
  '0323': 'Warid',
  '0324': 'Warid',
  '0330': 'Ufone',
  '0331': 'Ufone',
  '0332': 'Ufone',
  '0333': 'Ufone',
  '0334': 'Ufone',
  '0340': 'Telenor',
  '0341': 'Telenor',
  '0342': 'Telenor',
  '0343': 'Telenor',
  '0344': 'Telenor',
  '0345': 'Telenor'
};

function detectNetwork() {
  const input = document.getElementById("phoneNumber").value.trim();
  const prefix = input.slice(0, 4);

  const network = networkPrefixes[prefix];
  const result = document.getElementById("result");

  if (network) {
    result.textContent = `Network: ${network}`;
  } else {
    result.textContent = "Unknown or invalid network prefix!";
  }
}
