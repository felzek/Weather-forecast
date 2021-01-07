const axios = require('axios');

const y = async() => {
let x;
try{x=await axios.get('http://localhost:3000/weather?latitude=32&longitude=13&tempunit=standard');
}catch(err)
{
    console.log(err.response.data);
    console.log(err.response.status);
}    
console.log(x);
}
y();