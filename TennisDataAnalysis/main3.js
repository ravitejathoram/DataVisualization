var margin = {top:110, left:50, right:30, bottom:0},
height = 200 - margin.top - margin.bottom,
width = 190 - margin.left - margin.right;

var radius = Math.min(width, height);
var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "white", "blue", "black"]);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.GDP_percapita; });


var canvas1 = d3.select("#pie2").append("svg")
    .attr("width", 300 + margin.top + margin.bottom)
    .attr("height", 150 + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + (margin.left +50) + "," + (margin.top+50)+")");

d3.csv("highly_declining.csv", function(error, data) {

  data.forEach(function(d) {
    d.GDP_percapita = +d.GDP_percapita;
  });
  console.log(data);
  var g = canvas1.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");
  g.append("path")
      .attr("class", function(d, i){ return "pathArc"+d.data.id;})
      .attr("d", arc)
      .attr("data-legend", function(d) { return d.data.country; })
      .attr("data-legend-pos", function(d, i) { return i; })
      .style("fill", function(d) { return color(d.data.GDP_percapita)
    });
  // g.append("text")
  //         .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  //         .attr("dy", ".20em")
  //         .style("text-anchor", "middle");
  //
  // var padding = 20,
  //       legx = radius + padding,
  //       legend = canvas1.append("g")
  //       .attr("class", "legend")
  //       .attr("transform", "translate(" + legx + ", 0)")
  //       .style("font-size", "12px")
  //       .call(d3.legend);

  var legendG = canvas1.selectAll(".legend")
    .data(pie(data))
    .enter().append("g")
    .attr("transform", function(d,i){
      return "translate(" + (width) + "," + (i * 15 - 40) + ")";
    })
    .attr("class", "legend");

  legendG.append("rect")
    .attr("class", function(d, i){ return "rect"+d.data.id;})
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", function(d, i) {
      return color(d.data.GDP_percapita);
    });

  legendG.append("text")
    .text(function(d){
      return d.data.country + "  " + d.data.GDP_percapita;
    })
    .style("font-size", 12)
    .attr("y", 10)
    .attr("x", 11);
});
