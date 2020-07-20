import axios from 'axios';

const getPublicIp = new Promise((resolve, reject) => {
  axios.get('https://api.ipify.org')
    .then((data) => resolve(data))
    .catch((err) => reject(err));
});

export default { getPublicIp };
