const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const moment = require('moment');

require('dotenv').config();


module.exports = {
    async filterResponse(weatherRes){
        return new Promise((resolve,reject) => {
            const filteredForecasts = [];
         
           weatherRes.forEach((forecast) => {
                const dateObj = new Date(forecast.dt * 1000);
                const weekday = moment(dateObj).format('dddd');
                const date = moment(dateObj).format('L');
                if(weekday != 'Saturday' && weekday != 'Sunday')
                {
                    filteredForecasts.push({
                        weekday,
                        date,
                        maxTemp: forecast.temp.max,
                        minTemp: forecast.temp.min
                    })
                }
            });
            return resolve(filteredForecasts);
        })
    },

    async requestWeatherData(lat,lon,tempUnit)
    {
        return new Promise(async (resolve,reject) => {
        const apikey = process.env.API_KEY;
        console.log('ef',apikey);
        const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apikey}&units=${tempUnit}`
        let weatherRes;
        try{ 
            weatherRes = await axios.get(requestUrl);
        }catch(err)
        {
            if(err)
            {
              reject(err);
            }
        }
        if (weatherRes && weatherRes.status == 200 && weatherRes.data && weatherRes.data.daily){
            const forecast =  await this.filterResponse(weatherRes.data.daily);
            forecast.status = 200;
            return resolve(forecast);
        } 
    })
}

   
}
