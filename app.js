const { Console } = require("console")
const express = require("express")
const bodyParser = require("body-parser")
const { apiKey } = require("./apikey")
const http = require("https")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = 3000

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post('/',(req,res)=>{
    const zipCode = req.body.Pincode
    const countryCode = req.body.countryCode
    const tempUnit = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=${tempUnit}`
    http.get(url,(response)=>{
        // console.log(response.statusCode);
        response.on("data",(data)=>{
            // console.log(data)
            weatherData = JSON.parse(data)
            // console.log(weatherData.name, weatherData.weather[0].icon);
            if (weatherData.cod === 200) {
                res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                
                    <title>Weather app</title>
                </head>
                <body>
                    <nav class="navbar navbar-dark bg-primary">
                        <div class="container-fluid">
                            <img src="https://openweathermap.org/img/wn/10d@2x.png" class="d-inline-block align-text-top">
                            <span class="navbar-brand mb-0 mx-auto h1">Weather Station</span>
                        </div>
                    </nav>
                
                    <div class="card m-auto p-5 my-5 border border-info rounded-4" style="width: 30rem;">
                        <div class="card-img-top"> 
                            <h3>${weatherData.name}</h3>
                            <h4>${weatherData.main.temp}</h4>
                            <h5>${weatherData.weather[0].description}</h5>
                            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" ></img>
                        </div>
                        <hr class="border border-danger">
                        <div class="card-body">
                            <form action="/" method="post" class="card-text mx-5">
                                <label class="mx-auto h5" for="countryCodeInput">Enter Country Code: </label>
                                <input class="mx-auto h6" type="text" name="countryCode" id="countryCodeInput" value="${countryCode}"><br><br>
                                <label class="mx-auto h5" for="pinInput">Enter ZipCode: </label><br>
                                <input class="mx-auto h6" type="text" name="Pincode" id="pinInput" value="${zipCode}"><br><br>
                                <button type="submit" class="btn btn-primary mx-5">Go</button>
                            </form>
                        </div>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                
                
                </body>
                </html>`)
            }else{
                res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                
                    <title>Weather app</title>
                </head>
                <body>
                    <nav class="navbar navbar-dark bg-primary">
                        <div class="container-fluid">
                            <img src="https://openweathermap.org/img/wn/10d@2x.png" class="d-inline-block align-text-top">
                            <span class="navbar-brand mb-0 mx-auto h1">Weather Station</span>
                        </div>
                      </nav>
                
                      <div class="card m-auto my-5 border border-info rounded-4" style="width: 18rem;">
                        <h5 class="px-2 text-danger">Please check the country code/ zipcode you entered </h5>
                        <img src="https://imgs.search.brave.com/WrRzdGQLZluaEf1PZGAYsuBXhou0fwe5_DylZRlu2Ro/rs:fit:1200:600:1/g:ce/aHR0cHM6Ly93d3cu/aW1wYWN0Ym5kLmNv/bS9odWJmcy80MDQt/ZXJyb3ItcGFnZS1l/eGFtcGxlcy1iZXN0/LmpwZw" class="card-img-top" alt="404 Not Found">
                        <hr>
                        <div class="card-body">
                            <form action="/" method="post" class="card-text mx-auto">
                                <label class="mx-auto h5" for="countryCodeInput">Enter Country Code: </label>
                                <input class="mx-auto h6" type="text" name="countryCode" id="countryCodeInput" value="${countryCode}"><br><br>
                                <label class="mx-auto h5" for="pinInput">Enter ZipCode: </label>
                                <input class="mx-auto h6" type="text" name="Pincode" id="pinInput" value="${zipCode}"><br><br>
                                <button type="submit" class="btn btn-primary mx-5 ">Go</button>
                            </form>
                        </div>
                      </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                
                
                </body>
                </html>`)
                
            }
          })
    })
})
app.listen(port, (err)=>{
    if(err){
        console.log("Something went wrong");
    }else{
        console.log(`Server is running at port ${port}`);
    }
})