const dobInput = document.getElementById('dob');
const calculateBtn = document.getElementById('calculate');
const result = document.getElementById('result');

calculateBtn.addEventListener('click', () => {
    const dob = new Date(dobInput.value);
    const today = new Date();

    if (isNaN(dob.getTime())) {
        result.textContent = 'Please enter a valid date of birth.';
        return;
    }

    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    result.textContent = `Your age is ${age} years.`;
});