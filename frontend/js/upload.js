async function uploadReport() {
  const input = document.getElementById("report-upload");
  const file = input.files[0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://less-visualization-reports.onrender.com/upload/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert("Upload successful!");

    const previewDiv = document.getElementById("preview");
    previewDiv.innerHTML = "<pre>" + JSON.stringify(data.preview, null, 2) + "</pre>";
    document.getElementById("dashboard").style.display = "block";

    drawBarChart(data.preview);
  } catch (error) {
    alert("Upload failed.");
    console.error(error);
  }
}
