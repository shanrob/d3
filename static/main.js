// Trying out some new stuff
// Shan Robinson
// 8.8.18

// Set up canvas
console.log("testing");

d3.csv("data/emails.csv").then(function(data) {

	var width = 500;
	var height = 500;

	var svg = d3.select("#chart")
		.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("fill", "red");

	console.log(data);

	var node = svg.append("g")
	    .attr("class", "nodes")
	    .selectAll("circle")
	    .data(data)
	    .enter().append("circle")
	      .attr("r", 10)
	      .attr("fill", function(d) { return color(d.metalabel)})
	      .call(d3.drag()
	          .on("start", dragstarted)
	          .on("drag", dragged)
	          .on("end", dragended));

	var simulation = d3.forceSimulation()
		.force("charge", d3.forceManyBody().strength(5))
		.force("center", d3.forceCenter(width/2, height/2))
		.force("collision", d3.forceCollide().radius(11))
		.on("tick", ticked);

	function ticked() {
		var u = d3.select("svg")
		.selectAll("circle")
		.data(data)

		u.enter()
			.append("circle")
			.attr("r", 10)
			.attr("fill", "red")
			.merge(u)
			.attr("cx", function(d) {return d.x})
			.attr("cy", function(d) {return d.y});

		u.exit().remove()
	}

	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d) {
		if (!d3.event.active) {
		simulation.alphaTarget(0);
		}
		d.fx = null;
		d.fy = null;
	};

})