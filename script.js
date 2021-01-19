var requestCountryData = new XMLHttpRequest();

requestCountryData.open('GET', 'https://restcountries.eu/rest/v2/all', true);

requestCountryData.send();

requestCountryData.onload = function() {

    var countryData = JSON.parse(this.response);

    for (i = 0; i < countryData.length; i++) {
        try {
            var countryName = countryData[i].name;
            var latLong = countryData[i].latlng;
            if (latLong.length === 0)
                throw new Error(" doesn't have Latitude and longitude");
            //send Country name and location to weather data api
            weatherData(countryName, ...latLong);
        } catch (e) {
            console.log('Invalid co-ordinate data for country: ' + countryName + ' ' + e.message);
        }
    }
}

//A function defined which gets the temperature by the latitude and longitude we provide from Restcountry API

var weatherData = function(name, lat, lng) {

    var apiKey = '89c31a3aeb67ada2bc28218245b77f4b';
    var URI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;

    var requestWeatherData = new XMLHttpRequest();

    requestWeatherData.open('GET', URI, true);

    requestWeatherData.send();

    requestWeatherData.onload = function() {

        try {
            var countryWeatherData = JSON.parse(this.response);
            console.log(`${name} : ${countryWeatherData.main.temp}`);
        } catch (e) {
            console.log('Invalid response from API for ' + name);
        }
    }




}