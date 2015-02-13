function load_stu_score() {
	url = "http://yijisoo.github.io/ie59000/2015spring/hw2/students.json"//local
	$.get(
			url,
			{},
			function(o) {
				str = ""
				tbody = document.getElementById('student_json_loader')
				for (var i = 0; i<o.length; i++) {
					tr = tbody.insertRow();
					tr.insertCell().innerHTML = o[i].Name;
					tr.insertCell().innerHTML = o[i].GPA;
					tr.insertCell().innerHTML = o[i].GRE_V;
					tr.insertCell().innerHTML = o[i].GRE_Q;
					tr.insertCell().innerHTML = o[i].Essay;
					tr.insertCell().innerHTML = o[i].Recom;
				};

			},
			"json"
		);
}