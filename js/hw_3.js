function hw_3() {
	var margin = {top: 40, right: 20, bottom: 50, left: 60},
    width = 640 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;


    var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
	    	return "<strong>Country:</strong> <span style='color:red'>" + d.Country + "</span><br/>"
	    	+"<strong>Mathematics Average Score:</strong> <span style='color:red'>" + d.Math_Average_score + "</span><br/>"
	    	+"<strong>Math' Instructional time:</strong> <span style='color:red'>" + d.Math_Hours_per_year + "h/year</span><br/>"
	  	})
				
	
	var canvas = d3.select("#graph-1").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate("+margin.left+", "+margin.top+")")
	
	canvas.call(tip);

d3.csv('../data/math.csv', function (data) {
	var width_scale = d3.scale.linear()
						.domain([0, 300])
						.range([0, width])


	var height_scale = d3.scale.linear()
						.domain([0, 700])
						.range([height, 0])


	var x_axis = d3.svg.axis()
					.scale(width_scale)
					.orient("bottom")

	var y_axis = d3.svg.axis()
					.scale(height_scale)
					.orient("left")
				  
	

	canvas.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + height+")")
		.call(x_axis)
		.append("text")
			.attr("transform", "translate("+ (width/2 +100)+", 0)")
      		.attr("y", 35)
	      	.style("text-anchor", "end")
	      	.text("Insturction time (Hours per Year)");

	canvas.append("g")
		.attr("class", "y axis")
		.call(y_axis)
		.append("text")
    		.attr("transform", "translate(0, "+ (height/2 -60)+") rotate(-90)")
      		.attr("y", -45)
	      	.style("text-anchor", "end")
	      	.text("Average Score");


	// var data = [24, 34, 44, 60]
	canvas.append("g")
		.append("line")
		.attr("x1",0)
		.attr("y1",height)
		.attr("x2",width_scale(162*1.4))
		.attr("y2",height_scale(500*1.4))
		.attr("stroke","red")
		.attr("stroke-width",1);	

	canvas.selectAll(".data-point")
    	.data(data)
    	.enter().append("circle")
	      	.attr("class", "data-point")
	      	.attr("cx", function(d) { return width_scale(d.Math_Hours_per_year); })
	   	   	// .attr("width", x.rangeBand())
		    .attr("cy", function(d) { return height_scale(d.Math_Average_score); })
	      	// .attr("height", function(d) { return height - y(d); })
	      	.attr("r", 5)
	      	.on('mouseover', tip.show)
      		.on('mouseout', tip.hide)
	}
);
}
