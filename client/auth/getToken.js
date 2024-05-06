const axios = require('axios');

module.exports = async (username) => {
  try {
    const response = await axios.get(`https://echo-jvjc.onrender.com/auth/tokens/${username}`);
    return response.data;
  }
  catch (error) { console.error(error.response.data); }
};
