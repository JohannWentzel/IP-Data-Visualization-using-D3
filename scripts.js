var listToDisplay = [];
var map;
var MS_PER_DAY = 86400000;
var MS_PER_MONTH = 2592000000;
var isCustom = false;

function temmie(){
	alert("HoI im TEMMIE!");
}

function createList(time){

	error = document.getElementById("errorMessage");
	error.style.visibility = "visible";
// Hi there! You're probably wondering why time buttons don't work. Because the file I've been given
// to work with was over 7 million lines and only covered a week in February, it wouldn't make sense
// for the in-class demo to actually have filters for time. If you've got live data, this logic should work just fine!


	// UNCOMMENT TO USE TIME-DISPLAY LOGIC
	// var comparisonDate = new Date();
	// switch(time){
	// 	case '6mo':
	// 		comparisonDate -= (MS_PER_MONTH * 6);
	// 		break;
	// 	case '3mo':
	// 		comparisonDate -= (MS_PER_MONTH * 3);
	// 		break;
	// 	case '1mo':
	// 		comparisonDate -= (MS_PER_MONTH);
	// 		break;
	// 	case '1w':
	// 		comparisonDate -= (MS_PER_DAY * 7);
	// 		break;
	// 	case '1d':
	// 		comparisonDate -= (MS_PER_DAY);
	// 		break;
	// 	default:
	// 		alert("what?");
	// }
	// listToDisplay = [];
	// for (var i = 0; i < data.length; i++) {
	// 	var tempDateArray = data[i].date.split('-');
	// 	var tempDate = new Date(tempDateArray[0],tempDateArray[1] - 1,tempDateArray[2],0,0,0,0);
	// 	// console.log("Comparing " + tempDate + " to " + (new Date(comparisonDate)).toString());
	// 	if (tempDate > comparisonDate)
	// 	{
	// 		listToDisplay.push(data[i]);
	// 	}
	// };
	// // console.log(listToDisplay);

	// drawBubbles();
}

function filterProjects(project){
	listToDisplay = [];
	isCustom = true;
	switch(project){
		case 'ag0':
			listToDisplay = ag0data;
			break;
		case 'themisASI':
			listToDisplay = themisASIdata;
			break;
		case 'auroramax':
			listToDisplay = auroramaxdata;
			break;
		case 'magneto':
			listToDisplay = magnetoData;
			break;
		default:
			console.log('what?');

	}
	// for (var i = data.length - 1; i >= 0; i--) {
	// 	if (data[i]["fillKey"] == String(project)){
	// 		// console.log(data[i]["City"]); 
	// 		listToDisplay.push(data[i]);
	// 	};
			
	// };
	// console.log(listToDisplay);
	drawBubbles();
}

function displayag0(){
	listToDisplay = ag0data;
	drawBubbles();
}

function createMap(){

	map = new Datamap({
	    	element: document.getElementById('mapImage'),
	    	projection: 'mercator',
	    	fills: {
	    		'themisASI':'rgba(200,0,0,0.5)',
	    		'ag0':'rgba(0,200,0,0.5)',
	    		'auroramax':'rgba(0,0,200,0.5)',
	    		'magneto':'rgba(200,200,0,0.5)',
	    		defaultFill: 'rgba(154,154,154,0.5)'
	    	},
	    	responsive: true,
	    	done: function(datamap) {
	            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
	                // alert(geography.properties.name);
	            });
	            datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));

           		function redraw() {
                	datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
          			// console.log(d3.event.scale);
          			map.svg
          				.selectAll('.datamaps-bubble')
          				// .style('fill',function(){
          				// 	console.log(this);
          				// 	return 'rgb(0,0,0)';
          				// });
          		}
	        }
	    });

	         
	//draw bubbles for data
	map.bubbles(data, {
	    popupTemplate: function (geo, data) {
	            return ['<div class="hoverinfo">' +  data["City"],
	            '<br/>Total requests: ' +  data["Number of requests"] + '',
	            '<br/>Themis ASI requests: ' +  data["numThemis"] + '',
	            '<br/>AG0 requests: ' +  data["numag0"] + '',
	            '<br/>Auroramax requests: ' +  data["numAuroramax"] + '',
	            '<br/>Magnetometer requests: ' +  data["numMagneto"] + '',
	            '</div>'].join('');
	    }
	});

	    // resize?
	    d3.select(window).on('resize', function() {
	        map.resize();
	    });
}

function resetBubbles(){
	isCustom = false;
	map.bubbles(data, {
	    popupTemplate: function (geo, data) {
	            return ['<div class="hoverinfo">' +  data["City"],
	            '<br/>Total requests: ' +  data["Number of requests"] + '',
	            '<br/>Themis ASI requests: ' +  data["numThemis"] + '',
	            '<br/>AG0 requests: ' +  data["numag0"] + '',
	            '<br/>Auroramax requests: ' +  data["numAuroramax"] + '',
	            '<br/>Magnetometer requests: ' +  data["numMagneto"] + '',
	            '</div>'].join('');
	    }
	});
}

function drawBubbles(){
	if (!isCustom){
		map.bubbles(listToDisplay, {
	    popupTemplate: function (geo, data) {
	            return ['<div class="hoverinfo">' +  data["City"],
	            '<br/>Total requests: ' +  data["Number of requests"] + '',
	            '<br/>Themis ASI requests: ' +  data["numThemis"] + '',
	            '<br/>AG0 requests: ' +  data["numag0"] + '',
	            '<br/>Auroramax requests: ' +  data["numAuroramax"] + '',
	            '<br/>Magnetometer requests: ' +  data["numMagneto"] + '',
	            '</div>'].join('');
	    	}
		});
	}
	else{
		map.bubbles(listToDisplay, {
		    popupTemplate: function (geo, data) {
		            return ['<div class="hoverinfo">' +  data["City"],
		            '<br/>File requests: ' +  data["NumRequests"] + '',
		          
		            '</div>'].join('');
		    }
		});
	}
	
}

function zoomButton(){
	d3.event.scale = 1;
}



/*

- COLOR: most requests from that project
- AREA: number of requests from that place.
*/