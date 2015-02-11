$(document).ready(
	function() {
		load_homework(1)
	}
) 

function load_homework(hw_no) {
	url = "./hw-page/hw_" + hw_no + ".html"
	$.get(
			"./hw-page/hw_1.html",
			{},
			function(o) {
				document.getElementById('homework-loader').innerHTML = o
			},
			"html"
		);
}

