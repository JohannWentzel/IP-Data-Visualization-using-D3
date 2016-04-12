var listToDisplay = [];
var map;
var MS_PER_DAY = 86400000;
var MS_PER_MONTH = 2592000000;

function temmie(){
	alert("HoI im TEMMIE!");
}

function createList(time){
	var comparisonDate = new Date();
	switch(time){
		case '6mo':
			comparisonDate -= (MS_PER_MONTH * 6);
			break;
		case '3mo':
			comparisonDate -= (MS_PER_MONTH * 3);
			break;
		case '1mo':
			comparisonDate -= (MS_PER_MONTH);
			break;
		case '1w':
			comparisonDate -= (MS_PER_DAY * 7);
			break;
		case '1d':
			comparisonDate -= (MS_PER_DAY);
			break;
		default:
			alert("what?");
	}
	listToDisplay = [];
	for (var i = 0; i < data.length; i++) {
		var tempDateArray = data[i].date.split('-');
		var tempDate = new Date(tempDateArray[0],tempDateArray[1] - 1,tempDateArray[2],0,0,0,0);
		// console.log("Comparing " + tempDate + " to " + (new Date(comparisonDate)).toString());
		if (tempDate > comparisonDate)
		{
			listToDisplay.push(data[i]);
		}
	};
	// console.log(listToDisplay);

	drawBubbles();
}

function createMap(){
	map = new Datamap({
	    	element: document.getElementById('mapImage'),
	    	projection: 'mercator',
	    	fills: {
	    		'themis':'rgba(200,0,0,1)',
	    		'auroramax':'rgba(0,200,0,1)',
	    		'AG0':'rgba(0,0,200,1)',
	    		'magneto':'rgba(200,200,0,1)',
	    		defaultFill: 'rgba(154,154,154,1)'
	    	},
	    	responsive: true,
	    	done: function(datamap) {
	            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
	                alert(geography.properties.name);
	            });
	        }
	    });

	         
	//draw bubbles for data
	map.bubbles(data, {
	    popupTemplate: function (geo, data) {
	            return ['<div class="hoverinfo">' +  data.name,
	            '<br/>Payload: ' +  data.yield + ' kilotons',
	            '<br/>Country: ' +  data.country + '',
	            '<br/>Date: ' +  data.date + '',
	            '</div>'].join('');
	    }
	});

	    // resize?
	    d3.select(window).on('resize', function() {
	        map.resize();
	    });
}

function resetBubbles(){
	map.bubbles(data, {
	    popupTemplate: function (geo, data) {
	            return ['<div class="hoverinfo">' +  data.name,
	            '<br/>Payload: ' +  data.yield + ' kilotons',
	            '<br/>Country: ' +  data.country + '',
	            '<br/>Date: ' +  data.date + '',
	            '</div>'].join('');
	    }
	});
}

function drawBubbles(){
	map.bubbles(listToDisplay, {
	    popupTemplate: function (geo, data) {
	            return ['<div class="hoverinfo">' +  data.name,
	            '<br/>Payload: ' +  data.yield + ' kilotons',
	            '<br/>Country: ' +  data.country + '',
	            '<br/>Date: ' +  data.date + '',
	            '</div>'].join('');
	    }
	});
}

/*

- COLOR: most requests from that project
- AREA: number of requests from that place.
*/