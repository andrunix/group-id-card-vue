import mockResults from './mocksearch.js';

const api = {
  subscriberSearch: (params) => {
    return new Promise((resolve, reject) => {
      if (params.ssn === '456885432') {
        reject(new Error('Subscriber not found'));
      } else {
        resolve({ data: mockResults });
      }
    });
  }
};

export default api;
