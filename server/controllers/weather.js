const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const moment = require('moment');



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
        const apikey = '8b925e142fc04aaf94e123194b9ee7a8';
        const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apikey}&unit=${tempUnit}`
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
