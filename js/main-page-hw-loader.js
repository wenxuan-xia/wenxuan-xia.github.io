$(document).ready(
	function() {
		load_homework(1)
	}
) 

function load_homework(hw_no) {
	url = "./hw-page/hw_" + hw_no + ".html"
	$.get(
			url,
			{},
			function(o) {
				document.getElementById('homework-loader').innerHTML = o
			},
			"html"
		);
}

