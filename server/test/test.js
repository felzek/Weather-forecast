const assert = require('assert');
const weather = require('../weather');
const axios = require('axios');


describe('weather file', function() {
  describe('weather res'), function() {
      it('should gather the correct weather response', async function() {
       const res = await weather.requestWeatherData(12,12,'standard');
        assert(res,res);
      })
  }
  describe('weather res'), function() {
    it('should gather the correct weather response', async function() {
     const res = await weather.requestWeatherData(12,12,'standard');
      assert(res,res);
    })
}
});