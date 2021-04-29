const express = require("express");
const app = express();
const port = 3000;
const https = require("https");
const bodyparser = require("body-parser");
require('dotenv').config();
const apikey = process.env.API_KEY;
// "f0b243c58aed3160800ce25e294396d0";
const units = "metric";
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
 
	 res.render("index",{description :"Search for your city",temp:" ",pic:" "});  
});

app.get("/about",function(req,res){
    res.render("about");
});

app.get("/contact",function(req,res){
   res.render("contact");
});

app.post("/",function(req,res){
  const cityname = req.body.cityname;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + apikey +"&units=" + units;
    
    https.get(url,function(resp){

      resp.on("data",function(data){
              const weatherdata = JSON.parse(data);
              if(weatherdata.cod === 200)
              {
                // console.log(weatherdata);
                const feelslike = weatherdata.main.feels_like;
                const temp1 = "The temperature in " +cityname.charAt(0).toUpperCase()+ cityname.slice(1)+" is " +
                weatherdata.main.temp+" degree celcius feels like "+ feelslike+" degree celcius.";
                const description ="The weather is currently "+ weatherdata.weather[0].description;
                const icon = weatherdata.weather[0].icon;
                const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png"
                res.render("index",{description : description,temp:temp1,pic:imageURL});
              }
               
               else{
                res.render("index",{description :"city not found",temp:"",pic:" "});
                
               }
                
              
      });

    });
});

app.listen(port,()=>{
	console.log("Server running on port 3000");
});

