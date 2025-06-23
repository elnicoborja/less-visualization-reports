document.getElementById('upload').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/parse-data', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    console.log('Parsed data:', result);
    // TODO: trigger visualization update
  } catch (err) {
    console.error('Upload failed:', err);
  }
});
