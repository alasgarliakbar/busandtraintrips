// ...existing code...

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('details-button')) {
    const resultId = event.target.getAttribute('data-id');
    window.location.href = `details.html?id=${resultId}`;
  }
});

// ...existing code...