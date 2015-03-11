function exam_1_graph_2() {
	var margin = {top: 40, right: 150, bottom: 50, left: 60},
	    width = 800 - margin.left - margin.right,
	    height = 480 - margin.top - margin.bottom


	var tip_fre = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
	    	return "<strong>Univ:</strong> <span style='color:red'>" + d.univ + "</span><br/>"
	    	+"<strong>Freshman Number : </strong> <span style='color:red'>" + d.fre_num + "</span><br/>"
	  	})

	var tip_sop = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
	    	return "<strong>Univ:</strong> <span style='color:red'>" + d.univ + "</span><br/>"
	    	+"<strong>Sophomore Number : </strong> <span style='color:red'>" + d.sop_num + "</span><br/>"
	  	})

	var tip_jun = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
	    	return "<strong>Univ:</strong> <span style='color:red'>" + d.univ + "</span><br/>"
	    	+"<strong>Junior Number : </strong> <span style='color:red'>" + d.jun_num + "</span><br/>"
	  	})

	var tip_sen = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
	    	return "<strong>Univ:</strong> <span style='color:red'>" + d.univ + "</span><br/>"
	    	+"<strong>Senior Number : </strong> <span style='color:red'>" + d.sen_num + "</span><br/>"
	  	})
	
    var title = d3.select("#graph-2").append("h2")
    				.text("Total Numbers of IE Students in Five Universities")

	var canvas = d3.select("#graph-2").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate("+margin.left+", "+margin.top+")")

	canvas.call(tip_fre);
	canvas.call(tip_sop);
	canvas.call(tip_jun);
	canvas.call(tip_sen);

	var bias = height / 2 - 60
/*legen*/
	canvas.append("rect")
		.attr("x", width)
	    .attr("y", 18+bias)
	    .attr("width", 150)
	    .attr("height", 90)
	    .style("fill", "#aaaaaa")

	canvas.append("rect")
		.style("fill", "#6699CC")
		.attr("x", width+10)
		.attr("y", 32-5 + bias)
		.attr("width", 10)
		.attr("height" , 10)


    canvas.append("text")
		.attr("x", width+30)
	    .attr("y", 37 + bias)
	    .text("Freshman")

	canvas.append("rect")
		.style("fill", "#9966CC")
		.attr("x", width+10)
		.attr("y", 32-5 + bias + 20)
		.attr("width", 10)
		.attr("height" , 10)

	canvas.append("text")
		.attr("x", width+30)
	    .attr("y", 37 + bias + 20)
	    .text("Sophomore")

	canvas.append("rect")
		.style("fill", "#FF6699")
		.attr("x", width+10)
		.attr("y", 32-5 + bias + 40)
		.attr("width", 10)
		.attr("height" , 10)

	canvas.append("text")
		.attr("x", width+30)
	    .attr("y", 37 + bias + 40)
	    .text("Sophomore")

	canvas.append("rect")
		.style("fill", "#CC6699")
		.attr("x", width+10)
		.attr("y", 32-5 + bias + 60)
		.attr("width", 10)
		.attr("height" , 10)

	canvas.append("text")
		.attr("x", width+30)
	    .attr("y", 37 + bias + 60)
	    .text("Sophomore")

	url = "https://hivelab.org/static/exam1.json"
	d3.json(url, function (data) {
		var width_scale = d3.scale.ordinal()
							.rangeRoundBands([0, width], .1)


		var height_scale = d3.scale.linear()
							.domain([0, 500])
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

/*construct my data-format*/
		var new_data = []
		var univ_num = 5
		for (var i=0; i<5; i++) {
			var q = {univ: "", fre_num: "", sop_num: "", jun_num: "", sen_num: "", seq: ""}
			new_data[i] = q
			q.seq = i
		}

		var i = 0
		for (item in data[0]) {
			if (item != "Year") {
				new_data[i].univ = item
				i = i + 1
			}
		}

		for (item in data) {
			var obj = ""
			switch(data[item].Year) {
				case "Freshman": 
					obj = "fre_num"
					break
				case "Sophomore": 
					obj = "sop_num"
					break
				case "Junior": 
					obj = "jun_num"
					break
				case "Senior": 
					obj = "sen_num"
					break
			}
			// console.log(data[item])
			new_data[0][obj] = data[item]["University A"]
			new_data[1][obj] = data[item]["University B"]
			new_data[2][obj] = data[item]["University C"]
			new_data[3][obj] = data[item]["University D"]
			new_data[4][obj] = data[item]["University E"]
		}

		console.log(new_data)



		canvas.selectAll(".data-fre")
	    	.data(new_data)
	    	.enter().append("rect")
		      	.attr("class", "data-fre")
		      	.attr("x", function(d) { return d.seq*(60+40) + 40 })
		      	.attr("width", 60)
			    .attr("y", function(d) { return height - height_scale(500 - d.fre_num)})
			    .attr("height", function(d) { return height_scale(500 - d.fre_num)})
				.on('mouseover', tip_fre.show)
      			.on('mouseout', tip_fre.hide)

		canvas.selectAll(".data-sop")
	    	.data(new_data)
	    	.enter().append("rect")
		      	.attr("class", "data-sop")
		      	.attr("x", function(d) { return d.seq*(60+40) + 40 })
		      	.attr("width", 60)
			    .attr("y", function(d) { return height - height_scale(500 - d.fre_num - d.sop_num)})
			    .attr("height", function(d) { return height_scale(500 - d.sop_num)})
				.on('mouseover', tip_sop.show)
      			.on('mouseout', tip_sop.hide)

		canvas.selectAll(".data-jun")
	    	.data(new_data)
	    	.enter().append("rect")
		      	.attr("class", "data-jun")
		      	.attr("x", function(d) { return d.seq*(60+40) + 40 })
		      	.attr("width", 60)
			    .attr("y", function(d) { return height - height_scale(500 - d.jun_num - d.fre_num - d.sop_num)})
			    .attr("height", function(d) { return height_scale(500 - d.jun_num)})
				.on('mouseover', tip_jun.show)
      			.on('mouseout', tip_jun.hide)

		canvas.selectAll(".data-sen")
	    	.data(new_data)
	    	.enter().append("rect")
		      	.attr("class", "data-sen")
		      	.attr("x", function(d) { return d.seq*(60+40) + 40 })
		      	.attr("width", 60)
			    .attr("y", function(d) { return height - height_scale(500 - d.fre_num - d.sop_num - d.jun_num - d.sen_num)})
			    .attr("height", function(d) { return height_scale(500 - d.sen_num)})
				.on('mouseover', tip_sen.show)
      			.on('mouseout', tip_sen.hide)

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
		      	.attr("y", function(d) { return height - 5 -  height_scale(500 - d.fre_num - d.sop_num - d.jun_num - d.sen_num)})
		      	.text(function(d) {return (d.fre_num + d.sop_num + d.jun_num + d.sen_num)})

	}
	)

}


