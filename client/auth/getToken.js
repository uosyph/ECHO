const axios = require('axios');

module.exports = async (username) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8080/auth/tokens/${username}`);
    return response.data;
  }
  catch (error) { console.error(error.response.data); }
};
