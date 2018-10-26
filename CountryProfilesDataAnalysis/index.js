var val_default = 10;
newInstance(val_default);
newInstance1(val_default);

function topChange(select){
var val = select.selectedIndex;
var val1 = select.options[val].value;
// console.log("here!!!",val1);
var value = val1;
newInstance(value);
newInstance1(value);
}

function newInstance(value){
// console.log(value+" value");
var margin = {top:50, left:50, right:50, bottom:50},
height = 500 - margin.top - margin.bottom,
width = 700 - margin.left - margin.right;
d3.select("#map").selectAll("svg").remove();
// console.log("here");

var canvas = d3.select("#map")
  .append("svg")
  .attr("height", height + margin.top + margin.bottom)
  .attr("width", width + margin.left + margin.right)
  .call(d3.zoom().on("zoom", function () {
    canvas.attr("transform", d3.event.transform)
 }))
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top+")");

var gdp = d3.map();
if (value==10){
d3.queue()
  .defer(d3.json, "world.topojson")
  .defer(d3.csv, "highly_declining.csv", function(d){
    gdp.set(d.id, [+d.prediction_rate, d.country, +d.GDP_percapita, +d.population_growth, +d.GDP_growth, d.current_state]);
  })
  .await(ready)
var color = d3.scaleThreshold()
        .domain([2,3,4,6,8,10,15])
        .range(d3.schemeBlues[7]);
var x = d3.scaleLinear()
        .domain([1, 7])
        .rangeRound([500, 550]);
}
if(value==20){
  d3.queue()
    .defer(d3.json, "world.topojson")
    .defer(d3.csv, "highly_developing.csv", function(d){
      gdp.set(d.id, [+d.prediction_rate, d.country, +d.GDP_percapita, +d.population_growth, +d.GDP_growth, d.current_state]);
    })
    .await(ready)
  var color = d3.scaleThreshold()
          .domain([2,4,5,7,10,12,16,20])
          .range(d3.schemeBlues[8]);
  var x = d3.scaleLinear()
          .domain([1, 8])
          .rangeRound([500, 550]);
}
if(value==30){
  d3.queue()
    .defer(d3.json, "world.topojson")
    .defer(d3.csv, "data_gradually_developing.csv", function(d){
      gdp.set(d.id, [+d.prediction_rate, d.country, +d.GDP_percapita, +d.population_growth, +d.GDP_growth, d.current_state]);
    })
    .await(ready)
  var color = d3.scaleThreshold()
          .domain([2,3,4,6,7,9,12,16])
          .range(d3.schemeBlues[8]);
  var x = d3.scaleLinear()
          .domain([1, 8])
          .rangeRound([500, 550]);
}
var offsetL = document.getElementById('map').offsetLeft+70;
var offsetT = document.getElementById('map').offsetTop+90;



  var g = canvas.append("g")
          .attr("transform", "translate(-10,325)");
      g.selectAll("rect")
          .data(color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              return d;
          }))
          .enter().append("rect")
              .attr("height", 8)
              .attr("x", function(d) { return x(d[0]); })
              .attr("width", function(d) { return x(d[1]) - x(d[0]); })
              .attr("fill", function(d) { return color(d[0]); });
      g.append("text")
          .attr("class", "caption")
          .attr("x", x.range()[0])
          .attr("y", -6)
          .attr("fill", "#000")
          .attr("text-anchor", "end")
          .attr("font-weight", "bold")
          .text("ChangeRate");
      g.call(d3.axisBottom(x)
          .tickSize(13)
          .tickFormat(function(x, i) { return i ? x : x + "%"; })
          .tickValues(color.domain()))
        .select(".domain")
          .remove();
// var tool_tip = d3.tip()
//       .attr("class", "d3-tip")
//       .offset([100, 50])
//       .html("hi I am in");
// canvas.call(tool_tip);
var tooltip = d3.select("#map")
         .append("div")
         .attr("class", "tooltip hidden");
var project = d3.geoMercator()
  .translate([width/2, height/2])
  .scale(100);

var path = d3.geoPath()
  .projection(project);

function ready(error, data, data2){
  // console.log(data);

  var countries = topojson.feature(data, data.objects.countries).features;
  // console.log(gdp);


  // data2.forEach(function(d){
  //   d.Player = d.Player;
  //   d["GDP_growth%"] = +d["GDP_growth%"];
  //   d["GDP_percapita"] = +d["GDP_percapita"];
  //   d["population_growth%"] = +d["population_growth%"];
  //   d["prediction_rate"] = +d["prediction_rate"];
  //   d["standard_deviation"] = +d["standard_deviation"];
  // });
  canvas.selectAll(".countries")
    .data(countries)
    .enter().append("path")
    .attr("fill", function(d){
      // console.log(d);
      // console.log(d.id)
      // console.log(gdp.get(d.id) +" here iam");
      if(gdp.get(d.id)){
      return color(gdp.get(d.id)[0]);
    }
    else {
      return "white";
    }
    })
    .attr("d", path)
    .on("mouseover", toolTipShow)
    .on("mouseout", toolTipHide);
    // .on("mouseover", function(d){
    //   d3.select(this).classed("hovered", true);
    // })
    // .on("mouseout", function(d){
    //   d3.select(this).classed("hovered", false);
    // })
    // .on("click", clicked);


    canvas.selectAll(".text-class")
      .data(countries)
      .enter().append("text")
      .attr("class", "text-class")
      .attr("fill", "black")
      .style("text-anchor", "start")
      .attr("transform", function(d) { return "translate(" + path.centroid(d)+10 + ")"; })
          .text(function(d) {
            if(gdp.get(d.id)){
            //console.log(gdp.get(d.id)[1])
            return gdp.get(d.id)[1];
          }
          else {
            return "";
          }
      })
    //console.log(gdp);
    // console.log(data2);
}

function clicked(d){
  // console.log(d);
}

function toolTipShow(d) {

      var label = "NoInfo";
      var changeRate = "";
      var GDPPercapita = "";
      var populationGrowth = "";
      var GDPGrowth = "";
      var currentState = ""
      if(gdp.get(d.id)){
        changeRate = changeRate + gdp.get(d.id)[0].toString();
        GDPPercapita = GDPPercapita + gdp.get(d.id)[2].toString();
        populationGrowth = populationGrowth + + gdp.get(d.id)[3].toString();
        GDPGrowth = GDPGrowth + gdp.get(d.id)[4].toString();
        currentState = currentState  + gdp.get(d.id)[5];
        label = changeRate + "\n" + GDPPercapita + "\n" + populationGrowth + "\n" + GDPGrowth + "\n" + currentState;
        //console.log(label);
        var mouse = d3.mouse(canvas.node())
          .map( function(d) { return parseInt(d); } );
        tooltip.classed("hidden", false)
          .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
          .html(
            "<strong>Change Rate(%)::</strong> <span style='color:blue'>" + changeRate + "</span><br>"+
            "<strong>GDP percapita($)::</strong> <span style='color:blue'>" + GDPPercapita + "</span><br>"+
            "<strong>Population Growth(%)::</strong> <span style='color:blue'>" + populationGrowth + "</span><br>"+
            "<strong>GDP growth(%)::</strong> <span style='color:blue'>" + GDPGrowth + "</span><br>"+
            "<strong>Current Category::</strong> <span style='color:blue'>" + currentState + "</span><br>"
            );

        var temp = ".pathArc" + d.id;
        //console.log(temp);
        d3.select(temp)
          .attr("class", "activateLight");

          var temp1 = ".rect" + d.id;
          //console.log(temp);
          d3.select(temp1)
            .attr("class", "activateRect");
      }


    }

function toolTipHide(d,i){
  tooltip.classed("hidden", true);
  var deactivate = "pathArc" + d.id;
  var deactivateRect = "rect" + d.id;
  d3.select(".activateLight")
    .attr("class", deactivate);
    d3.select(".activateRect")
      .attr("class", deactivateRect);
}

}
function newInstance1(value){
  // console.log("i am in main2"+value);
var margin = {top:50, left:50, right:30, bottom:50},
height = 200 - margin.top - margin.bottom,
width = 200 - margin.left - margin.right;
d3.select("#pie1").selectAll("svg").remove();
var radius = Math.min(width, height);
var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "white", "blue", "black"]);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.GDP_percapita; });


var canvas1 = d3.select("#pie1").append("svg")
    .attr("width", 300 + margin.top + margin.bottom)
    .attr("height", 150 + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + (margin.left +50) + "," + (margin.top+50)+")");

if (value == 10){
  commit("highly_declining.csv");
}
if (value == 20){
  commit("highly_developing.csv");
}
if(value==30){
  commit("data_gradually_developing.csv");
}





function commit(file){
  d3.csv(file, function(error, data) {

    data.forEach(function(d) {
      d.GDP_percapita = +d.GDP_percapita;
    });
    // console.log(data);
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
}
}
