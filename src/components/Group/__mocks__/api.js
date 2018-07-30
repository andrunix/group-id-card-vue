import mockResults from './mocksearch.js';

const api = {
  subscriberSearch: () => new Promise(resolve => {
    resolve(mockResults);
  })
};

export default api;
