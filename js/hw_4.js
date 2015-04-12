function hw_4() {

	var margin = {top: 40, right: 20, bottom: 50, left: 60},
    width = 640 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom

    // color
    var color = d3.scale.category20c()

    // canvas, svg
	var canvas = d3.select("#graph-4").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate("+margin.left+", "+margin.top+")")
	

// d3.csv('https://hivelab.org/static/coffee.csv', function (error, data) {
d3.csv('../data/coffee.csv', function (error, data) {
	data = cut_data(data)
	var nest=d3.nest()
        .key(function(d){return d.region})
        .key(function(d){return d.state})
        .entries(data)

    var q = {}
    q.key = "root"
    q.values = nest


    //treemap
	var treemap = d3.layout.treemap()
					.size([width, height])
					.sticky(true)
					.children(function(d){return d.values})
        			.value(function(d) { return d.sales})
					.nodes(q)
	


	var cells = canvas.selectAll(".cell")
					  .data(treemap)
					  .enter()
					  .append("g")
					  .attr("class", "cell")

	var rects = cells.append("rect")
					 .attr("x", function(d) {return d.x})					  
					 .attr("y", function(d) {return d.y})
					 .attr("width", function(d) {return d.dx})
					 .attr("height", function(d) {return d.dy})
					 .attr("fill", function(d) {return d.children ? null : color(d.state)})

	var texts = cells.append("text")
					 .attr("x", function(d) {return (2*d.x + d.dx)/2})					  
					 .attr("y", function(d) {return (2*d.y + d.dy)/2})
					 .attr("dy", ".35em")
				     .attr("size", 2)
				     .attr("text-anchor", "middle")
				     .text(function(d) {return d.children ? null : d.state})

	var texts2 = cells.append("text")
					 .attr("x", function(d) {return (2*d.x + d.dx)/2})					  
					 .attr("y", function(d) {return (2*d.y + d.dy + 30)/2})
					 .attr("dy", ".35em")
				     .attr("size", 2)
				     .attr("text-anchor", "middle")
				     .text(function(d) {return d.children ? null : "S:"+d.sales})				     

	d3.selectAll("#RS").on("change", function change() {
	    var choice = this.value == "Region" ? 1 : 0
	    rects.transition().duration(1500)
	    	.attr("fill", function(d) {return d.children ? null : choice==1 ? color(d.region) : color(d.state)})
	})

	d3.selectAll("#SP").on("change", function change() {
	    var SP = this.value == "Sales" ? 1 : 0
	    treemap = d3.layout.treemap()
					.size([width, height])
					.sticky(true)
					.children(function(d){return d.values})
        			.value(function(d) { return SP == 1 ? d.sales : d.profit})
					.nodes(q)

	    rects.transition().duration(1500)
	                 .attr("x", function(d) {return d.x})					  
					 .attr("y", function(d) {return d.y})
					 .attr("width", function(d) {return d.dx})
					 .attr("height", function(d) {return d.dy})

	    texts.transition().duration(1500)
					 .attr("x", function(d) {return (2*d.x + d.dx)/2})					  
					 .attr("y", function(d) {return (2*d.y + d.dy)/2})
					 .attr("dy", ".35em")
				     .attr("size", 2)
				     .attr("text-anchor", "middle")
				     .text(function(d) {return d.children ? null : d.state})

		texts2.transition().duration(1500)
					 .attr("x", function(d) {return (2*d.x + d.dx)/2})					  
					 .attr("y", function(d) {return (2*d.y + d.dy + 30)/2})
					 .attr("dy", ".35em")
				     .attr("size", 2)
				     .attr("text-anchor", "middle")
				     .text(function(d) {return d.children ? null : SP == 1? "S:"+d.sales : "P:"+d.profit})	
	})
})

}


function cut_data(data) {
	var q = []
	// console.log(data)
	for (var i=0; i<data.length; i++) {
		var flag = 0
		for (var j=0; j<q.length; j++) {
			if ( (flag == 0) && (data[i].state == q[j].state)) {
				q[j].sales = q[j].sales + Number(data[i].sales)
				q[j].profit = q[j].profit + Number(data[i].profit)
				flag = 1
			}
		}
		if (flag == 0) {
			var newone = {region: 0, state: 0, sales: 0, profit: 0}
			var no = q.length
			newone.state = data[i].state
			newone.region = data[i].region
			newone.sales = Number(data[i].sales)
			newone.profit = Number(data[i].profit)
			q[no] = newone
		}
	}
	// console.log(q)
	return q
}