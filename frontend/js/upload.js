function uploadReport() {
  const input = document.getElementById('report-upload');
  const file = input.files[0];

  if (!file) {
    alert('Please select a file first.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  fetch('https://less-visualization-reports.onrender.com/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Upload success:', data);
    document.getElementById('dashboard').style.display = 'block';
    // Later: Render D3 visualizations here using `data`
  })
  .catch(err => {
    console.error('Upload failed:', err);
    alert('Upload failed. Please try again.');
  });
}
