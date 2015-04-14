$(document).ready(
	function() {
		url = window.location.href
		if (url[7] == "l") {
			mylen = 21
		} else {
			mylen = 33
		}
		var hw_no = url.search("[0-9]")
		if (hw_no == mylen || hw_no == -1) { // local	
			if (hw_no === -1) {
				hw_no = 4
			} else {
				hw_no = url[hw_no]
			}
			if (hw_no == 0) {
				load_ref()
			} else {
				load_homework(hw_no)
			}
		} else if (hw_no == mylen+2) {
			hw_no = url[hw_no]
			load_exam(hw_no)
		}
	}
)

function load_homework(hw_no) {
	url = "./hw-page/hw_" + hw_no + ".html"
	$.get(
			url,
			{},
			function(o) {
				document.getElementById('homework-loader').innerHTML = o
				if (hw_no==2) {
					load_stu_score()
				}
				if (hw_no==3) {
					hw_3()
				}
				if (hw_no==4) {
					hw_4()
				}
			},
			"html"
		);
}

function load_exam(exam_no) {
	url = "./hw-page/exam_" + exam_no + ".html"
	$.get(
			url,
			{},
			function(o) {
				document.getElementById('homework-loader').innerHTML = o
				if (exam_no == 1) {
					exam_1_graph_1()
				} else if (exam_no == 2) {
					exam_1_graph_2()
				} else if (exam_no == 3) {
					exam_1_graph_3()
				}
			},
			"html"
		);
}

function load_ref() {
	url = "./ref.html"
	$.get(
			url,
			{},
			function(o) {
				document.getElementById('homework-loader').innerHTML = o
			},
			"html"
		);
}
