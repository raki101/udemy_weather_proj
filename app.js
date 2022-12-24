const express = require("express");
const app = express();
const https = require("https");
const bodyparser = require("body-parser");
const { urlencoded } = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const query = req.body.city;
    const id = "363627e31ff984daa7a536bf1d3220b2";
    const units = "metric";
 const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+id+"&units="+units+"";   
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            //console.log(temp);
            //console.log(description);
            const icon = weatherData.weather[0].icon
            const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The temperature in "+query+"is "+temp+"°C"+"</p>");
            
            res.write("<p>The weather is currently "+description+"</p>");
            res.write("<img src="+ imgurl +">");
            res.send()
        })
    })
    //res.send("server is set up");
})













app.listen(3000,function(){
    console.log("server running at prot 3000");
})