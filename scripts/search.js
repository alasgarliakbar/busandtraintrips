function displaySearchResults(results) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('result-item');
    resultElement.innerHTML = `
      <p>${result.name} (${result.type === 'bus' ? 'Bus' : 'Train'})</p>
      <button class="details-button" data-id="${result.id}">Details</button>
    `;
    resultsContainer.appendChild(resultElement);
  });
}