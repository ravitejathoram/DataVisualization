var val_default = 10;
newInstance(val_default);

function topChange(select){
var val = select.selectedIndex;
var val1 = select.options[val].value;
// console.log("here!!!",val1);
var value = val1;
newInstance(value);
}

function newInstance(value){
var margin = {top:60,right:50,bottom:10,left:150},
  width = 700 - margin.right - margin.left,
  height = 500 - margin.top - margin.bottom;
d31.select("#area1").selectAll("svg").remove();
d31.select("#area2").selectAll("svg").remove();

var svg = d31.select('#area1')
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.right + ")");


var yScale = d31.scale.ordinal()
  .rangeRoundBands([height, 0], 0.2, 0.2);

var xScale = d31.scale.linear()
  .range([0, width]);

var xAxis = d31.svg.axis()
  .scale(xScale)
  .orient("bottom");

var yAxis = d31.svg.axis()
  .scale(yScale)
  .orient("left");


//loading data from csv

d31.csv("top"+value+"_players.csv", function(err, data){
    if(err) console.log("error found!!!");

    data.forEach(function(d){
      d.Player = d.Player;
      d["Total Matches"] = +d["Total Matches"];
      d["Winning Matches"] = +d["Winning Matches"];
      d["Win Percentage"] = +d["Win Percentage"];
    });

    yScale.domain(data.map(function(d){return d.Player;}));
    xScale.domain([0, d31.max(data, function(d){return d["Win Percentage"];})]);


svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr("width", 0)
  .attr("x", 0)
  .transition().duration(3000)
  .delay(function(d,i){return i * 200;})
  .attr('x', 0)
  .attr('y', function(d){return yScale(d.Player)})
  .attr('width', function(d){return xScale(d["Win Percentage"]);})
  .attr('height', yScale.rangeBand())
  .style("fill", function(d,i) { return 'rgb(150, 150, ' + ((i * 30) + 50) + ')'});


//oriented by default at top so need to transform it
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .selectAll("text")
  .style("font-size", "12px");


svg.selectAll('rect')
  .on("mouseover", handleMouseOver)
  .on("mouseout", handleMouseOut);
});

function handleMouseOver(d, i) {
            activeRegion = d.Player;
            svg.append("text").attr({
               id: "t" + Math.trunc(d["Win Percentage"]) +  "-" + i,
                x: function() { return xScale(d["Win Percentage"]) + 5; },
                y: function() { return yScale(d.Player)+15; }
            })
            .text(function() {
              return [Math.trunc(d["Win Percentage"])];
            })
            ;
            var t = ".line"+activeRegion.split(" ")[0];
            // console.log(t)
            d31.select(t)
              .attr("class", "pathLight");
          }

function handleMouseOut(d, i) {
            deactive = d.Player;
            deactive = "line" + deactive.split(" ")[0];
            // console.log("out"+deactive);
            d31.select("#t" +  Math.trunc(d["Win Percentage"]) + "-"  + i).remove();  // Remove text location
            d31.select(".pathLight").attr("class", deactive);
          }
if(value==10){
var players1 = ["Roger Federer", "Novak Djokovic", "Rafael Nadal", "Marat Safin", "Andre Agassi",
    "Andy Murray" , "Andy Roddick", "Jo-Wilfried Tsonga", "David Ferrer", "Stanislas Wawrinka"];
}
else if(value == 20){
var players1 = ["Tomas Berdych", "David Nalbandian", "Milos Raonic", "Marin Cilic", "James Blake", "Kei Nishikori",
    "Dominik Hrbaty", "Guillermo Canas", "Fernando Gonzalez", "Marcos Baghdatis"];
  }
else if(value == 30){
var players1 = ["Mario Ancic", "Nikolay Davydenko", "Sebastien Grosjean", "Juan Martin Del Potro", "Lleyton Hewitt",
    "Tommy Robredo", "Philipp Kohlschreiber", "Richard Gasquet", "Gael Monfils", "Gilles Simon"];
}
var color = ["#04a086", "#a4a7ff", "#e04df9", "#f94c4c", "#9ff94b", "#206dfc", "#d3fc20", "#967558", "#99ffeb", "#a31111"];

var valueLine = new Array(10);

var margin = {top:60,right:50,bottom:10,left:150},
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

var x = d32.scaleTime().range([0, width]);
var y = d32.scaleLinear().range([height, 0]);

var i;
for (i = 0; i < 10; i++)
{
  valueLine[i] = d32.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d[players1[i]]); });
}

var svg1 = d32.select('#area2')
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

d32.csv("Error_data"+value+".csv", function(error, data){
  if (error) console.log("Error occurred!!!")

data.forEach(function(d) {
    d.Year = d.Year;
    for (i=0;i<10;i++){
      d[players1[i]] = +d[players1[i]];
    }
});


x.domain(d32.extent(data, function(d) { return d.Year; }));
y.domain([0, d32.max(data, function(d) {
  	  return Math.max(d[players1[0]], d[players1[1]], d[players1[2]], d[players1[3]], d[players1[4]], d[players1[5]], d[players1[6]],
              d[players1[7]], d[players1[8]], d[players1[9]]); })]);

for(i=0;i<10;i++){
svg1.append("path")
      .data([data])
      .attr("class", "line"+players1[i].split(" ")[0])
      .attr("id", "xyz")
      .attr("x", 2004)
      .transition().duration(3000)
      .delay(function(d,i){return i * 200;})
      .style("stroke", color[i])
      .attr("d", valueLine[i]);
}



svg1.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d32.axisBottom(x));

svg1.append("g")
      .call(d32.axisLeft(y));

});


}
