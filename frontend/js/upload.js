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

function drawBarChart(data) {
  const svg = d3.select("#bar-chart");
  svg.selectAll("*").remove();

  const keys = Object.keys(data[0]);
  const numericKey = keys.find(key => typeof data[0][key] === "number");

  if (!numericKey) return;

  const chartData = data.map(d => ({ label: d[keys[0]], value: +d[numericKey] }));

  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;

  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand().domain(chartData.map(d => d.label)).range([0, width]).padding(0.2);
  const y = d3.scaleLinear().domain([0, d3.max(chartData, d => d.value)]).range([height, 0]);

  g.append("g").call(d3.axisLeft(y));
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-30)")
    .style("text-anchor", "end");

  g.selectAll("rect")
    .data(chartData)
    .enter()
    .append("rect")
    .attr("x", d => x(d.label))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", "steelblue");
}
