$(document).ready(
	function() {
		// load_stu_score()
		alert(1)
	}
) 

function load_stu_score() {
	url = "../data/students.json"//local
	$.get(
			url,
			{},
			function(o) {
				// document.getElementById('student_json_loader').innerHTML = o
				alert(o)
			},
			"json"
		);
}