
		var margin = {top: 20, right: 20, bottom: 60, left: 50},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
		var x = d3.time.scale().range([0, width]);
		var y = d3.scale.linear().range([height, 0]);


		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(5);

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(5);
			


		var line = d3.svg.line()
			.interpolate("basis")
			.x(function(d) { return x(d.Date); })
			.y(function(d) { return y(d.DS0); });
			
			
		function datefin(dat, lim) {
			return dat.filter(function(d) { return d.Date < lim; });
		}

			
			
	
			

		var svg = d3.select("#temp").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


		d3.tsv("js/DS0.tsv", function(error, data) {
		  data.forEach(function(d) {
			//console.log(d.Date+" "+d.DS0+" "+d.Run);
			d.Date = parseDate(d.Date);
			d.DS0 = +d.DS0;
			d.Run = +d.Run;
		  });

		  //x.domain(d3.extent(data, function(d) { return d.Date; }));
		  //y.domain(d3.extent(data, function(d) { return d.DS0; }));
		  
		  
		  
		  
		  datelim=parseDate("2011-06-30 00:00:00");
		  
		  var data2 = datefin(data, datelim );
		  
			y.domain(d3.extent(
				data2, 
				function(d) { return d.DS0; }));
			x.domain( 
				d3.extent(data2, function(d) { return d.Date; })
			);


		  svg.append("path")
			  .datum(data)
			  .attr("class", "line")
			  .attr("d", line);

		  svg.append("g")
			  .attr("class", "x axis")
			  .attr("transform", "translate(0," + height + ")")
			  .call(xAxis)
			.append("text")
			  .style("text-anchor", "end")
			  .attr("transform", "translate(" + width + ", 0)")
			  .attr("dy", "2.5em")
			  .text("Energy (GeV)");			  

		  svg.append("g")
			  .attr("class", "y axis")
			  .call(yAxis)
			.append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", -40)
			  .attr("dy", ".71em")
			  .style("text-anchor", "end")
			  .text("Positronic ratio");
			  
	
			d3.selectAll("#trigger")
				.on("click", function() {
					datelim=parseDate("2012-06-30 00:00:00");
		  		data2 = datefin(data, datelim );
		  		x.domain( d3.extent(data2, function(d) { return d.Date; }) );
		  		
		  		
		  		svg.select("path")
						.datum(data)
						.attr("class", "line")
						.attr("d", line);
		  		
		  		
					 svg.selectAll(".x.axis")
						.call(xAxis)
					.append("text")
						.style("text-anchor", "end")
						.attr("transform", "translate(" + width + ", 0)")
						.attr("dy", "2.5em")
						.text("Energy (GeV)");		
						

						
					
									
			});
	
 
			  
		});
		
				  


