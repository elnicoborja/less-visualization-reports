async function uploadReport() {
  const fileInput = document.getElementById('report-upload');
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://less-visualization-reports.onrender.com/upload/", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (result.status === "success") {
      alert("Upload successful!");
      // TODO: visualize or redirect
    } else {
      alert("Upload failed.");
    }
  } catch (err) {
    console.error("Upload error:", err);
    alert("An error occurred during upload.");
  }
}
