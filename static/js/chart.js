var draw = (function() {

    width = 800;
    height = 600;

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
            .append("g")

    var init = function(data) {

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("background-color", "rgb(200, 200, 200)")
            .style("border-radius", "4px")
            .style("padding", "5px")
            .style("opacity", 0)

        var legend = d3.select("g")
                .append("svg")
                .attr("dy", ".25em")
        
        d3.csv(data).then(function(data) {

            var colors = d3.scaleOrdinal()
                .range(d3.schemeDark2)
                .domain(function(d){return d.metalabels.keys();});

            colorDomain = uniqueLabels(data);
            xCenter = {};
            for(var i = 0; i<colorDomain.length; i++){
                xCenter[colorDomain[i]] = i;
            }
            colorDomain.forEach(function(item, i){

                legend.attr("width", 200)
                    .attr("height", 300)

                var legendRow = legend.append("g")
                    .attr("transform", "translate(0," + ((i*20)+6) + ")")

                legendRow.append("rect")
                    .attr("width", 10)
                    .attr("height", 10)
                    .attr("fill", function(d){return colors(item)})

                legendRow.append("text")
                    .data(data)
                    .attr("x", 20)
                    .attr("y", 8)
                    .attr("text-anchor", "start")
                    .style("text-transform", "capitalize")
                    .text(item)
            })

            var simulation = d3.forceSimulation(data)
                .force("charge", d3.forceManyBody().strength(5))
                .force("center", d3.forceCenter(width/2, height/3))
                .force("collision", d3.forceCollide().radius(11))
                .on("tick", ticked)

            names = uniqueLabels(data);
            var positions = createNodes(150, names);

            function ticked() {

                 var u = d3.select("g")
                 .selectAll("circle")
                 .data(data)
                 .on("mouseover", function(d){
                    d3.select(this).style("stroke", "black")

                    div.transition()
                        .duration(200)
                        .style("opacity", 1)
                    div.style("top", (d3.event.pageY - 45) + "px")
                        .style("left", (d3.event.pageX + 10) + "px")
                        .html("label: " + d.metalabel + "<br>" + "weight: " + getRand(1,60))
                    })
                 .on("mouseout", function(d){
                    d3.select(this).style("stroke", "none")

                    div.transition().duration(200)
                        .style("opacity", 0)

                 })
                 

                 u.enter()
                     .append("circle")
                     .attr("r", 10)
                     .attr("fill", "rgb(200, 200,200)")
                     .merge(u) 
                     .attr("cx", function(d) {return d.x})
                     .attr("cy", function(d) {return d.y})
                     .transition()
                        .delay(function(d,i){return(i*50)})
                        .on("start", function() {
                            d3.active(this)
                                .attr("fill", function(d){return colors(d.metalabel)})
                                .attr("cx", function(d){
                                    var xys = positions[d.metalabel];
                                    return (getRand(250,365) + xys.x)-50;
                                })
                                .attr("cy", function(d,i){
                                    var xys = positions[d.metalabel];
                                    return (getRand(250,365) + xys.y)+80;
                                })

                            })

                 u.exit().remove()
            };

            function updateCount(data){
                
            }


            function createNodes(radius, labels) {

                var pos = {};
                width = (radius * 2) + 50;
                var height = (radius * 2) + 50;
                var angle = 0;

                for (i=0; i<names.length; i++) {
                    angle = (i / (names.length/2)) * Math.PI; // Calculate the angle at which the element will be placed.
                                                // For a semicircle, we would use (i / numNodes) * Math.PI.
                    x = Math.floor((radius * Math.cos(angle)) + ((width/2) - 50)); // Calculate the x position of the element.
                    y = Math.floor((radius * Math.sin(angle)) + ((width/2) - 250)); // Calculate the y position of the element.
                    pos[labels[i]] = {"x":x, "y":y};
    
                }
                return pos;
             }

            function uniqueLabels(data){
                var cats = [];
                var names = [];
                var k = 0;
                data.forEach(function(d,i){
                    if(($.inArray(d.metalabel, names)) == -1) {
                        names.push(d.metalabel);
                        cats.push(k);
                        k++;
                    }
                });
                return names;
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
            }

            function getRand(min, max) {
                return Math.random() * (max - min) + min;
            }
            
        });
    };

////////////return the functions//////////////
    return {
        init: init,
    }

})();

