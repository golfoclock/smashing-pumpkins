const data = [
    { record: 'Gish', amount: 1000000 },
    { record: 'Pieces Iscariot', amount: 1000000},
    { record: 'Siamese Dream', amount: 4000000 },
    { record: 'Mellon Collie ...', amount: 10000000 },
    { record: 'Adore', amount: 1000000 },
    { record: 'MACHINA', amount: 5000000 },
    { record: 'Zeitgeist', amount: 5000000 },
   
  ];

const width = 1200;
const height = 700;
const margin = { top: 50, bottom: 50, left: 50, right: 50};

const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr('viewBox', [0,0, width, height]);

const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, 10000000])
    .range([height - margin.bottom, margin.top]);


svg 
    .append('g')
    .attr('fill', 'turquoise')
    .selectAll('rect')
    .data(data.sort((a, b) => d3.descending(a.amount, b.amount)))
    .join('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', (d) => y(d.amount))
        .attr('height', d => y(0) - y(d.amount))
        .attr("width", x.bandwidth());

function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .attr("font-size", '16px')
    .attr('color', 'deeppink')
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].record))
    .attr("font-size", '16px')
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);

svg.node();
