// Trying out some new stuff
// Shan Robinson
// 8.8.18

// Set up canvas

var MPG = "data/testing.csv";
var emails = "data/emails.csv";
var iris = "data/iris.csv";

$(document).ready(function() {

	$("#play-btn").click(function(event) {

		d3.selectAll("circle").remove();
		d3.selectAll(".legend").remove();
		draw.init(emails);
		d3.selectAll(".legend").remove();

	})

	$(".dropdown-item").click(function(event){

			var dataSource = $(this).text();
			d3.selectAll("circle").remove();
			d3.selectAll(".legend").remove();

			if(dataSource == "MPG"){

				d3.selectAll("circle").remove();
				d3.selectAll(".legend").remove();
				document.getElementById("src").innerHTML = dataSource;
				draw.init(MPG);
			}
			else if (dataSource == "Iris"){
				d3.selectAll("circle").remove();
				d3.selectAll(".legend").remove();
				draw.init(iris);
			}
			else if (dataSource == "Emails"){
				d3.selectAll("circle").remove();
				d3.selectAll(".legend").remove();
				draw.init(emails);
			}

			d3.selectAll("circle").remove();
			d3.selectAll(".legend").remove();
		})
});






// console.log("testing");

// d3.csv("data/emails.csv").then(function(data) {

// 	var width = 500;
// 	var height = 500;

// 	var svg = d3.select("#chart")
// 		.append("svg")
// 			.attr("width", width)
// 			.attr("height", height)
// 			.attr("transform", "translate(" + 10 + "," + 10 + ")");

// 	console.log(data);

// 	var node = svg.append("g")
// 	    .attr("class", "nodes")
// 	    .selectAll("circle")
// 	    .data(data)
// 	    .enter().append("circle")
// 	      .attr("r", 10)
// 	      .attr("fill", function(d) { return color(d.metalabel)})
// 	      .call(d3.drag()
// 	          .on("start", dragstarted)
// 	          .on("drag", dragged)
// 	          .on("end", dragended));

// 	var simulation = d3.forceSimulation()
// 		.force("charge", d3.forceManyBody().strength(5))
// 		.force("center", d3.forceCenter(width/2, height/2))
// 		.force("collision", d3.forceCollide().radius(11))
// 		.on("tick", ticked);

	// function ticked() {
	// 	var u = d3.select("g")
	// 	.selectAll("circle")
	// 	.data(data)

	// 	u.enter()
	// 		.append("circle")
	// 		.attr("r", 10)
	// 		.attr("fill", "red")
	// 		.merge(u)
	// 		.attr("cx", function(d) {return d.x})
	// 		.attr("cy", function(d) {return d.y});

	// 	u.exit().remove()
	// }

	// function dragstarted(d) {
	// 	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	// 	d.fx = d.x;
	// 	d.fy = d.y;
	// }

	// function dragged(d) {
	// 	d.fx = d3.event.x;
	// 	d.fy = d3.event.y;
	// }

	// function dragended(d) {
	// 	if (!d3.event.active) {
	// 	simulation.alphaTarget(0);
	// 	}
	// 	d.fx = null;
	// 	d.fy = null;
	// };

// })