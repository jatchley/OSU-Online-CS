// On page load, setup the submit button actions
document.addEventListener('DOMContentLoaded', bindButtons);
function bindButtons(){
	// Weather search
	document.getElementById('weatherSubmit').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		var weatherParam = getWeatherSearchParam();
		var urlParams = constructWeatherSearchPayload(weatherParam) + "&units=imperial";
		var url = "http://api.openweathermap.org/data/2.5/weather?" + urlParams + "&appid=fa7d80c48643dfadde2cced1b1be6ca1";
		req.open('GET', url, true);
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400){
				var response = JSON.parse(req.responseText);
				document.getElementById('weatherDisplayCity').textContent = response.name;
				document.getElementById('weatherDisplayTemp').textContent = response.main.temp;
				document.getElementById('weatherDisplayHumidity').textContent = response.main.humidity;
			} 
			else {
				console.log("Error in network request: " + req.statusText);
			  }
		  });	
		req.send();
		event.preventDefault();
	})
	
	// POST form
	document.getElementById('testSubmit').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		var payload = {'testInput' : null}; 
		payload.testInput = document.getElementById('testInput').value;
		var url = "http://httpbin.org/post";
		
		req.open('POST', url, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400){
				document.getElementById('testResult').textContent = req.responseText;
			} 
			else {
				console.log("Error in network request: " + req.statusText);
			  }
		  });	
		req.send(JSON.stringify(payload));
		event.preventDefault();
	})
}

// Get the search value type for weather data
function constructWeatherSearchPayload(param) {	
	var payload;
	var val;
	if (param == "city") {
		val = document.getElementById('weatherCity').value;
		payload = "q=" + val;
	}
	else if (param == "zip") {
		val = document.getElementById('weatherZip').value;
		payload = "zip=" + val;
	}
	return payload;
}

// Get the proper param for weather data
function getWeatherSearchParam() {
	var city = document.getElementById('weatherCity').value;
	var zip = document.getElementById('weatherZip').value;
	if (city.length > 0) {
		return "city";
	}
	else if (zip.length > 0){
		return "zip";
	}
}