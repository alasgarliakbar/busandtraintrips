function displaySearchResults(results) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.innerHTML = `
      <p>${result.name} (${result.type === 'bus' ? 'Bus' : 'Train'})</p>
      <button class="details-button" data-id="${result.id}">Details</button>
    `;
    resultsContainer.appendChild(resultItem);
  });
}