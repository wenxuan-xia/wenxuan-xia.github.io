$(document).ready(
	function() {
		url = window.location.href
		var re = "#hw_1"
		var hw_no = url.search("[0-9]")
		if (hw_no === -1) {
			hw_no = 1
		} else {
			hw_no = url[hw_no]
		}
		load_homework(hw_no)
	}
)

function load_homework(hw_no) {
	url = "./hw-page/hw_" + hw_no + ".html"
	$.get(
			url,
			{},
			function(o) {
				document.getElementById('homework-loader').innerHTML = o
				if (hw_no===2) {
					load_stu_score()
				}
			},
			"html"
		);
}

