// Average monthly rent data for NJ cities (2026 estimates)
const rentData = {
  'newark': {
    name: 'Newark',
    averageRent: 1400,
    description: 'New Jersey\'s largest city with diverse housing options'
  },
  'jersey-city': {
    name: 'Jersey City',
    averageRent: 1800,
    description: 'Waterfront city near NYC with higher rent prices'
  },
  'paramus': {
    name: 'Paramus',
    averageRent: 1650,
    description: 'Northern NJ city in Bergen County'
  },
  'elizabeth': {
    name: 'Elizabeth',
    averageRent: 1350,
    description: 'Industrial city with more affordable housing'
  },
  'hoboken': {
    name: 'Hoboken',
    averageRent: 2100,
    description: 'Upscale waterfront area near NYC'
  },
  'trenton': {
    name: 'Trenton',
    averageRent: 1200,
    description: 'State capital with affordable rental options'
  },
  'atlantic-city': {
    name: 'Atlantic City',
    averageRent: 1300,
    description: 'Shore town with casino and entertainment'
  },
  'new-brunswick': {
    name: 'New Brunswick',
    averageRent: 1400,
    description: 'College town with student-friendly housing'
  }
};

// Affordability rule: rent should not exceed 30% of gross income
const AFFORDABILITY_THRESHOLD = 0.30;

/**
 * Calculate rent affordability based on income and city
 * @param {number} monthlyIncome - Monthly gross income
 * @param {string} cityKey - City key from rentData
 * @returns {object} Affordability calculation results
 */
function calculateAffordability() {
  const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
  const cityKey = document.getElementById('city').value;
  const resultsDiv = document.getElementById('results');
  const resultContent = document.getElementById('resultContent');

  // Validation
  if (!monthlyIncome || monthlyIncome <= 0) {
    showError('Please enter a valid monthly income amount');
    return;
  }

  if (!cityKey) {
    showError('Please select a city');
    return;
  }

  // Get city data
  const cityData = rentData[cityKey];
  const averageRent = cityData.averageRent;
  const maxAffordableRent = monthlyIncome * AFFORDABILITY_THRESHOLD;
  const isAffordable = averageRent <= maxAffordableRent;
  const incomeNeeded = Math.ceil(averageRent / AFFORDABILITY_THRESHOLD);
  const incomeGap = incomeNeeded - monthlyIncome;

  // Build result HTML
  let html = '';

  // City and income info
  html += `
    <div class="result-card">
      <div class="result-label">Selected City</div>
      <div class="result-value">${cityData.name}</div>
      <div class="result-message">${cityData.description}</div>
    </div>
  `;

  // Income info
  html += `
    <div class="result-card">
      <div class="result-label">Your Monthly Income</div>
      <div class="result-value">$${formatNumber(monthlyIncome)}</div>
    </div>
  `;

  // Average rent info
  html += `
    <div class="result-card">
      <div class="result-label">Average Monthly Rent in ${cityData.name}</div>
      <div class="result-value">$${formatNumber(averageRent)}</div>
    </div>
  `;

  // Affordable rent
  html += `
    <div class="result-card">
      <div class="result-label">Your Maximum Affordable Rent (30% Rule)</div>
      <div class="result-value">$${formatNumber(maxAffordableRent)}</div>
      <div class="result-message">Based on the 30% affordability rule, you should spend no more than 30% of your gross income on rent.</div>
    </div>
  `;

  // Affordability result
  if (isAffordable) {
    html += `
      <div class="result-card success">
        <div class="result-label">✅ Affordability Status</div>
        <div class="result-value" style="color: var(--success-color);">AFFORDABLE</div>
        <div class="result-message">Great news! You can comfortably afford rent in ${cityData.name}. Your maximum affordable rent is $${formatNumber(maxAffordableRent)}, and the average rent is only $${formatNumber(averageRent)}.</div>
      </div>
    `;
  } else {
    html += `
      <div class="result-card danger">
        <div class="result-label">❌ Affordability Status</div>
        <div class="result-value" style="color: var(--danger-color);">NOT AFFORDABLE</div>
        <div class="result-message">Your current income is not sufficient for ${cityData.name}. The average rent exceeds 30% of your income.</div>
      </div>

      <div class="result-card warning">
        <div class="result-label">Income Needed to Afford Rent</div>
        <div class="result-value" style="color: var(--warning-color);">$${formatNumber(incomeNeeded)}</div>
        <div class="result-message">
          You would need to earn <strong>$${formatNumber(incomeGap)}</strong> more per month 
          (a ${Math.round((incomeNeeded/monthlyIncome - 1) * 100)}% increase) 
          to comfortably afford rent in ${cityData.name}. This would make the average rent 
          exactly 30% of your income.
        </div>
      </div>
    `;
  }

  // Display results
  resultContent.innerHTML = html;
  resultsDiv.style.display = 'block';
  resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Format number as currency
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  const resultContent = document.getElementById('resultContent');
  const resultsDiv = document.getElementById('results');

  resultContent.innerHTML = `<div class="error-message">${message}</div>`;
  resultsDiv.style.display = 'block';
  resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function () {
  const incomeInput = document.getElementById('monthlyIncome');
  const citySelect = document.getElementById('city');

  if (incomeInput) {
    incomeInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        calculateAffordability();
      }
    });
  }

  if (citySelect) {
    citySelect.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        calculateAffordability();
      }
    });
  }
});
