
	function temperature() {

	console.log("in");

		var margin = {top: 50, right: 50, bottom: 120, left: 150},
			width = 1024 - margin.left - margin.right,
			height = 768 - margin.top - margin.bottom;

		var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
		var x = d3.time.scale().range([0, width]);
		var y = d3.scale.linear().range([height, 0]);


		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(4);

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(7);
			


		var line = d3.svg.line()
			.interpolate("basis")
			.x(function(d) { return x(d.Date); })
			.y(function(d) { return y(d.DS0); });
			
			
		function datefin(dat, lim) {
			return dat.filter(function(d) { return d.Date < lim; });
		}

			
			
	
			

		var svg = d3.selectAll(".temp").append("svg")
			.attr("class", "cgraph")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


		d3.tsv("js/DS0b.tsv", function(error, data) {
		  data.forEach(function(d) {
			//console.log(d.Date+" "+d.DS0+" "+d.Run);
			d.Date = parseDate(d.Date);
			d.DS0 = +d.DS0;
			d.Run = +d.Run;
		  });

		  //x.domain(d3.extent(data, function(d) { return d.Date; }));
		  //y.domain(d3.extent(data, function(d) { return d.DS0; }));
		  
		  
		  
		  
		  datelim=parseDate("2011-05-22 01:00:00");
		  
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
			  .attr("dy", "2em")
			  .text("Energy (GeV)");			  

		  svg.append("g")
			  .attr("class", "y axis")
			  .call(yAxis)
			.append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", -40)
			  .attr("dy", "-1em")
			  .style("text-anchor", "end")
			  .text("Temperature (deg C)");
			  
			
			var test=0;
			
			d3.select("#temp1")
				.on("click", function() {
					console.log(test);
					if (test==0)	datelim=parseDate("2011-09-17 00:00:00");
					if (test==1)  datelim=parseDate("2013-09-17 00:00:00");
					test++;
					
					
					
					
		  		data3 = datefin(data, datelim );
		  		x.domain( d3.extent(data3, function(d) { return d.Date; }) );
		  		y.domain(d3.extent(data3,  function(d) { return d.DS0; }));

		  		
					 svg.selectAll(".x.axis")
						.transition()
						.duration(1000)
						.call(xAxis);

						svg.selectAll(".y.axis")
						.transition()
						.duration(1000)
						.call(yAxis);

						svg.select("path")
						.datum(data)
						.transition()
						.duration(1000)
									  .attr("class", "line")
			  .attr("d", line);
						;
					

					
									
			});
	


			  
		});
		
				  

};
