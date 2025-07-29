function calculateChanda() {
    var monthlyIncome = parseFloat(document.getElementById('MonthlyNetIncome').value);
    console.log(monthlyIncome);
    if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
        alert("Please enter a valid monthly net income greater than zero.");
        return;
    }

    var chandaMajlis = Math.max(0.01 * monthlyIncome, 24);
    var chandaIjtema = Math.max(0.005 * monthlyIncome, 6);

    var resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Chanda Majlis: ₹' + chandaMajlis.toFixed(2) +
    '<br>Chanda Ijtema: ₹' + chandaIjtema.toFixed(2);
}