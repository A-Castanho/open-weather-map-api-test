const express = require("express");
//Body parser allows access to req.body
const bodyParser = require("body-parser");

const app = express();

//From https://nodejs.org/api/https.html
const https = require('https');


//urlencoded is used to get info from a form
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "15b94478d9bfb60353b070c5230fb832";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+apiKey+"&units=metric";
    
    https.get(url, function(htttp_res){
        console.log(htttp_res.statusCode);
        htttp_res.on('data', function(d) {
            const weatherData = JSON.parse(d);
            const imageUrl = 'http://openweathermap.org/img/wn/'+weatherData.weather[0].icon+'@2x.png';
            console.log(weatherData);
            res.write("<p>The current temperature is: "+weatherData.main.temp+" degrees Celsius</p>");
            res.write("<img src="+imageUrl+">");
            res.write("<p>State: "+weatherData.weather[0].description+"</p>");
            res.send();
        });  

    }).on('error', (e) => {
        console.log(e);
    });
})

app.listen(3000, function(){

})