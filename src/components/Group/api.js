import axios from 'axios';
import mockResults from './mocksearch.js';

const API_BASE = 'http://localhost:4001';

const api = {
  subscriberSearch: (params) => {
    return new Promise((resolve, reject) => {
      if (params.ssn === '456885432') {
        reject(new Error('Subscriber not found'));
      } else {
        resolve({ data: mockResults });
      }
    });
  },

  getTempCardPdf: function (params) {
    // TODO: 1) pass the params to the service
    //       2) use the proper URL for the service

    return new Promise((resolve, reject) => {
      axios({
        url: `${API_BASE}/idcard/subscriber/100.pdf`,
        method: 'GET',
        responseType: 'blob' // important
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
};

export default api;
