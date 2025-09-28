// script.js
document.addEventListener('DOMContentLoaded', () => {
  const yearInput = document.getElementById('year');
  const checkBtn = document.getElementById('checkBtn');
  const clearBtn = document.getElementById('clearBtn');
  const resultDiv = document.getElementById('result');
  const exampleBtns = document.querySelectorAll('.example');

  function evaluateYear(y){
    // Convert to integer
    const year = Number(y);
    if (!Number.isInteger(year) || year <= 0) {
      return { valid:false, message: 'Please enter a positive integer year.' };
    }

    if (year % 4 !== 0) {
      return { valid:true, leap:false, reason: 'Not divisible by 4' };
    }
    if (year % 100 !== 0) {
      return { valid:true, leap:true, reason: 'Divisible by 4 and not by 100' };
    }
    if (year % 400 === 0) {
      return { valid:true, leap:true, reason: 'Divisible by 400' };
    }
    return { valid:true, leap:false, reason: 'Divisible by 100 but not by 400' };
  }

  function showResult(res, year){
    if (!res.valid) {
      resultDiv.className = 'result';
      resultDiv.textContent = res.message;
      return;
    }

    if (res.leap) {
      resultDiv.className = 'result leap';
      resultDiv.innerHTML = `<strong>${year} — Leap year</strong><br/><small>${res.reason}</small>`;
    } else {
      resultDiv.className = 'result not-leap';
      resultDiv.innerHTML = `<strong>${year} — Not a leap year</strong><br/><small>${res.reason}</small>`;
    }
  }

  checkBtn.addEventListener('click', () => {
    const y = yearInput.value.trim();
    const res = evaluateYear(y);
    showResult(res, y);
  });

  clearBtn.addEventListener('click', () => {
    yearInput.value = '';
    resultDiv.className = 'result';
    resultDiv.textContent = '';
  });

  exampleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const y = e.currentTarget.dataset.year;
      yearInput.value = y;
      const res = evaluateYear(y);
      showResult(res, y);
    });
  });

  // Allow Enter key to check
  yearInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkBtn.click();
  });
});
