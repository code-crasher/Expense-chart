fetch("data.json")
  .then((response) => response.json())
  .then((data) => visualizeData(data))
  .catch((error) => console.error("Error fetching data:", error));

function visualizeData(data) {
  console.log(data);
  const svgWidth = 300;
  const svgHeight = 200;
  const margin = {
    top: 20,
    right: 0,
    bottom: 40,
    left: 0,
  };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const svg = d3
    .select(".bars__wrapper")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  const x = d3.scaleBand().range([0, width]).padding(0.1);
  const y = d3.scaleLinear().range([0, height, 0]);
  x.domain(data.map((d) => d.day))
    .range([0, width])
    .padding(0.2);
  y.domain([0, d3.max(data, (d) => d.amount)])
    .nice()
    .range([height, 0]);

  const tooltip = d3.select("#tooltip");
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.day))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(d.amount))
    .attr("height", (d) => height - y(d.amount))
    .attr("rx", 4)
    .attr("ry", 4)

    .on("mouseover", (event, d) => {
      const xPos = event.pageX;
      const yPos = event.pageY;

      tooltip.transition().duration(200).style("opacity", 1);
      tooltip
        .html(`$ ${d.amount}`)
        .style("left", `${xPos - 30}px`)
        .style("top", `${yPos - 60}px`);
    })
    .on("mousemove", (event, d) => {
      const xPos = event.pageX;
      const yPos = event.pageY;
      tooltip.style("left", `${xPos - 30}px`).style("top", `${yPos - 60}px`);
    })
    .on("mouseout", () => {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x));
  xAxis.selectAll("path").style("display", "none");
  xAxis.selectAll("line").style("display", "none");
  const yAxis = svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));
  yAxis.selectAll("path").style("display", "none");
  yAxis.selectAll("line").style("display", "none");
}
