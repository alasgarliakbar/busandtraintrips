document.addEventListener('click', function (event) {
  if (event.target.classList.contains('details-button')) {
    const resultId = event.target.getAttribute('data-id');
    window.location.href = `/purchase.html?id=${resultId}`;
  }
});