
		var margin = {top: 20, right: 20, bottom: 30, left: 50},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		var x = d3.scale.log()
			.range([1, width]);

		var y = d3.scale.linear()
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(10);;

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");
			


		var line = d3.svg.line()
			.interpolate("basis")
			.x(function(d) { return x(d.E); })
			.y(function(d) { return y(d.F); });
			
			
						

			

		var svg = d3.select("#graph").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.tsv("js/FPaper.tsv", function(error, data) {
		  data.forEach(function(d) {
			console.log(d.E+" "+d.F);
			d.E = +d.E;
			d.F = +d.F;
		  });

		  x.domain(d3.extent(data, function(d) { return d.E; }));
		  y.domain(d3.extent(data, function(d) { return d.F; }));


			svg.selectAll("dot")
			.data(data)
			.enter().append("circle")
			.attr("r", 5)
			.attr("cx", function(d) { return x(d.E); })
			.attr("cy", function(d) { return y(d.F); });

		  svg.append("g")
			  .attr("class", "x axis")
			  .attr("transform", "translate(0," + height + ")")
			  .call(xAxis)
			.append("text")
			  .style("text-anchor", "right")
			  .text("Energy (GeV)");			  

		  svg.append("g")
			  .attr("class", "y axis")
			  .call(yAxis)
			.append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 6)
			  .attr("dy", ".71em")
			  .style("text-anchor", "end")
			  .text("Positronic ratio");

		  svg.append("path")
			  .datum(data)
			  .attr("class", "line")
			  .attr("d", line);
			  
			  
			 var totalLength = path.node().getTotalLength();

path
  .attr("stroke-dasharray", totalLength + " " + totalLength)
  .attr("stroke-dashoffset", totalLength)
  .transition()
    .duration(2000)
    .ease("linear")
    .attr("stroke-dashoffset", 0); 
			  
			  
		});

