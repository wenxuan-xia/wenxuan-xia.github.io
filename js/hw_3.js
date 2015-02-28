function hw_3() {
	var margin = {top: 40, right: 20, bottom: 50, left: 60},
    width = 640 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;


	var width_scale = d3.scale.linear()
						.domain([0, 600])
						.range([0, width])


	var height_scale = d3.scale.linear()
						.domain([0, 600])
						.range([height, 0])


	var x_axis = d3.svg.axis()
					.scale(width_scale)
					.orient("bottom")

	var y_axis = d3.svg.axis()
					.scale(height_scale)
					.orient("left")
				  


	var canvas = d3.select("#graph-1").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate("+margin.left+", "+margin.top+")")
					
	canvas.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + height+")")
		.call(x_axis)
		.append("text")
			.attr("transform", "translate("+ (width/2)+", 0)")
      		.attr("y", 35)
	      	.style("text-anchor", "end")
	      	.text("Hours per Year");

	canvas.append("g")
		.attr("class", "y axis")
		.call(y_axis)
		.append("text")
    		.attr("transform", "translate(0, "+ (height/2)+") rotate(-90)")
      		.attr("y", -45)
	      	.style("text-anchor", "end")
	      	.text("y_axis");



	var data = [24, 34, 44, 60]

	canvas.selectAll(".data-point")
    	.data(data)
    	.enter().append("circle")
	      	.attr("class", "data-point")
	      	.attr("cx", function(d) { return width_scale(d); })
	   	   	// .attr("width", x.rangeBand())
		    .attr("cy", function(d) { return height_scale(d); })
	      	// .attr("height", function(d) { return height - y(d); })
	      	.attr("r", 5)
	      	.on('mouseover', tip.show)
	      	.on('mouseout', tip.hide)
	

}
