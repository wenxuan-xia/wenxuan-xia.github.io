function exam_1_graph_1() {
	var margin = {top: 40, right: 150, bottom: 50, left: 60},
	    width = 800 - margin.left - margin.right,
	    height = 480 - margin.top - margin.bottom

    var title = d3.select("#graph-1").append("h2")
    				.text("Number of Senior IE Students for Five Universities")

	var canvas = d3.select("#graph-1").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate("+margin.left+", "+margin.top+")")


	var bias = height / 2 - 50
	canvas.append("rect")
		.attr("x", width)
	    .attr("y", 22+bias)
	    .attr("width", 150)
	    .attr("height", 50)
	    .style("fill", "#aaaaaa")

	canvas.append("rect")
		.style("fill", "orange")
		.attr("x", width+10)
		.attr("y", 32-5 + bias)
		.attr("width", 10)
		.attr("height" , 10)


    canvas.append("text")
		.attr("x", width+30)
	    .attr("y", 37 + bias)
	    .text("Number of senior")

	
	canvas.append("text")
		.attr("x", width+30)
	    .attr("y", 57 + bias)
	    .text("IE students in Univ.")

	d3.json('../data/exam1.json', function (data) {
		var width_scale = d3.scale.ordinal()
							.rangeRoundBands([0, width], .1)


		var height_scale = d3.scale.linear()
							.domain([0, 100])
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
				.attr("transform", "translate("+ (width/2 +20)+", 0)")
	      		.attr("y", 35)
		      	.style("text-anchor", "end")
		      	.text("Universitys")

		canvas.append("g")
			.attr("class", "y axis")
			.call(y_axis)
			.append("text")
	    		.attr("transform", "translate(0, "+ (height/2 -60)+") rotate(-90)")
	      		.attr("y", -45)
		      	.style("text-anchor", "end")
		      	.text("Student Number")

		var new_data = []
		var i = 0
		for (item in data[3]) {
			if (item != "Year") {
				var q = {univ: "", num: "", seq: ""}
				q.univ = item
				q.num = data[3][item]
				q.seq = i
				new_data[i] = q
				i = i + 1
			}
		}
		// console.log(new_data)

		canvas.selectAll(".data-point")
	    	.data(new_data)
	    	.enter().append("rect")
		      	.attr("class", "data-point")
		      	.attr("x", function(d) { return d.seq*(60+40) + 40 })
		      	.attr("width", 60)
			    .attr("y", function(d) { return height - height_scale(100 - d.num)})
			    .attr("height", function(d) { return height_scale(100 - d.num)})
	
		canvas.selectAll(".text_mark")
			.data(new_data)
			.enter().append("text")
				.attr("class", "text_mark")
		      	.attr("x", function(d) { return d.seq*(60+40) + 40 })
		      	.attr("y", function(d) { return height +15})
		      	.text(function(d) {return d.univ})
		      	
		canvas.selectAll(".num_mark")
			.data(new_data)
			.enter().append("text")
				.attr("class", "num_mark")
		      	.attr("x", function(d) { return d.seq*(60+40) + 60 })
		      	.attr("y", function(d) { return height - 5 -  height_scale(100 - d.num)})
		      	.text(function(d) {return d.num})

	}
	)

}


